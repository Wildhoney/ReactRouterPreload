
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { matchRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

/**
 * @constant handler
 * @type {Symbol}
 */
export const handler = Symbol('react-router/fetch-data');

/**
 * @constant prefix
 * @type {String}
 */
const prefix = ':';

/**
 * @class ApplyRouteBlock
 * @extends {PureComponent}
 */
class ApplyRouteBlock extends Component {
    
    /**
     * @constant contextTypes
     * @type {Object}
     */
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {
        this.context.router.history.block(location => `${prefix}${location.pathname}`);
    }
    
    /**
     * @method render
     * @return {XML}
     */
    render() {
        return this.props.children;
    }

}

/**
 * @class Router
 * @extends {PureComponent}
 */
export class Router extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        tree: PropTypes.array.isRequired,
        onEnter: PropTypes.func,
        onCancel: PropTypes.func,
        onLoaded: PropTypes.func,
        getUserConfirmation: PropTypes.func,
        createCancelToken: PropTypes.func,
        isEscapeCancellable: PropTypes.bool
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        isEscapeCancellable: true,
        onEnter: location => console.log(`Preload: Entering   ${location}`),
        onCancel: count => console.warn(`Preload: Cancelled ${count} Request(s)`),
        onLoaded: location => console.info(`Preload: Loaded     ${location}`),
        getUserConfirmation: message => callback(window.confirm.message(message)),
        createCancelToken: () => function MockCancelToken() {}
    };

    /**
     * @constant transitions
     * @type {Set}
     */
    transitions = new Set();

    /**
     * @method load
     * @param {String} message
     * @param {Function} callback
     * @return {void}
     */
    load(message, callback) {

        switch (message.startsWith(prefix)) {
            
            case true:
                const location = message.replace(new RegExp(`^${prefix}`), '');
                return this.handle(location, callback);

            default:
                return this.props.getUserConfirmation(message, callback);

        }

    }

    /**
     * @method handle
     * @param {String} location
     * @param {Function} callback
     * @return {void}
     */
    async handle(location, callback) {
        
        this.cancelOutstanding();
        this.props.onEnter(location);
        this.transitions.add(callback);
        
        this.props.isEscapeCancellable && window.addEventListener('keydown', event => event.key === 'Escape' && this.cancelAll(), {
            once: true
        });

        const branches = matchRoutes(this.props.tree, location);
        const cancelToken = this.props.createCancelToken();

        await Promise.all(branches.filter(branch => branch.route.component).map(branch => {
            const params = { match: branch.match, cancelToken };
            return fetchPreload(branch.route.component, params);
        }));

        if (this.transitions.has(callback)) {
            callback(true);
            this.transitions.clear();
            this.props.onLoaded(location);
        }

    }

    /**
     * @method cancelOutstanding
     * @return {void}
     */
    cancelOutstanding() {
        this.transitions.size > 0 && this.props.onCancel(this.transitions.size);
        this.transitions.clear();
    }

    /**
     * @method cancelAll
     * @return {void}
     */
    cancelAll() {
        this.transitions.size > 0 && this.props.onCancel(this.transitions.size);
        this.transitions.forEach(callback => callback(false));
        this.transitions.clear();
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <BrowserRouter getUserConfirmation={this.load.bind(this)}>
                <ApplyRouteBlock>{this.props.children}</ApplyRouteBlock>
            </BrowserRouter>
        );

    }

}

/**
 * @method withPreload
 * @param {Promise} fetchData
 * @return {Function}
 */
export function withPreload(fetchData) {

    return WrappedComponent => {

        return class extends PureComponent {
            
            /**
             * @constant handler
             * @type {Symbol}
             */
            static [handler] = fetchData;
    
            /**
             * @constant displayName
             * @type {String}
             */
            static displayName = WrappedComponent.displayName || WrappedComponent.name;
    
            /**
             * @method render
             * @return {XML}
             */
            render() {
                return <WrappedComponent {...this.props} />;
            }
    
        }

    };

}

/**
 * @method fetchPreload
 * @param {React.Component} Component
 * @param {Array} params
 * @return {Promise}
 */
export function fetchPreload(Component, ...params) {
    return handler in Component && Component[handler](...params);
}
