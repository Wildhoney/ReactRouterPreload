
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CancelToken } from 'axios';
import { matchRoutes } from 'react-router-config';
import { StaticRouter as ReactStaticRouter } from 'react-router';
import { BrowserRouter as ReactBrowserRouter } from 'react-router-dom';

/**
 * @constant handler
 * @type {Symbol}
 */
const handler = Symbol('react-router/fetch-data');

/**
 * @constant prefix
 * @type {String}
 */
const prefix = '::';

/**
 * @class ApplyRouteBlock
 * @extends {Component}
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
 * @class BrowserRouter
 * @extends {Component}
 */
export class BrowserRouter extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        children: PropTypes.node.isRequired,
        tree: PropTypes.array.isRequired,
        onEnter: PropTypes.func,
        onCancel: PropTypes.func,
        onLoaded: PropTypes.func,
        getUserConfirmation: PropTypes.func,
        createCancelToken: PropTypes.func,
        isEscapeCancellable: PropTypes.bool
    };

    /**
     * @constant contextTypes
     * @type {Object}
     */
    static contextTypes = {
        store: PropTypes.object.isRequired
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
        createCancelToken: () => CancelToken.source()
    };

    /**
     * @constant transitions
     * @type {Set}
     */
    transitions = new Set();

    /**
     * @method load :: string -> function(boolean) -> void
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
     * @method handle :: string -> function(boolean) -> Promise<void>
     * @param {String} location
     * @param {Function} callback
     * @return {Promise<void>}
     */
    async handle(location, callback) {
        
        this.props.onEnter(location);
        
        // Create the cancellation token that will be passed to the `fetchPreloadForComponent` function.
        const { token: cancelToken, cancel } = this.props.createCancelToken();

        // Cancel any outstanding requests, as the latest request takes priority.
        this.cancelOutstanding();
        
        // Also create the record that we'll be storing in the set, which allows for AJAX cancellation, and
        // transition cancellation.
        const record = { callback, cancel };
        this.transitions.add(record);
        
        // If `isEscapeCancellable` is a truthy value, setup the ability to cancel transitions and associated
        // AJAX requests by using the escape key.
        const handleEscape = event => event.key === 'Escape' && this.cancelAll();
        this.props.isEscapeCancellable && window.addEventListener('keydown', handleEscape, {
            once: true
        });

        // Find the components that match the URL that the user attempted to transition to.
        const branches = matchRoutes(this.props.tree, location);

        // Await the requests that were initiated by the matched components. We don't do anything with the data
        // in the promises returned, as it's assumed these will be used to populate the Redux store(s).
        await Promise.all(branches.filter(branch => branch.route.component).map(branch => {
            const params = { match: branch.match, dispatch: this.context.store.dispatch, cancelToken };
            return fetchPreloadForComponent(branch.route.component, params);
        }));

        // If the current request is still valid (nobody invoked `cancelOutstanding` whilst we were `await`ing)
        // then we'll complete the transition.
        this.transitions.has(record) && do {
            callback(true);
            this.transitions.clear();
            this.props.onLoaded(location);
        };

        // Remove the escape event listener if escape cancellation is possible.
        this.props.isEscapeCancellable && window.removeEventListener('keydown', handleEscape);

    }

    /**
     * Cancels any outstanding requests so that only one transition is occurring at any one time.
     * 
     * @method cancelOutstanding :: void
     * @return {void}
     */
    cancelOutstanding(cancel) {
        this.transitions.size > 0 && this.props.onCancel(this.transitions.size);
        this.transitions.forEach(({ cancel }) => cancel('Due to another request taking priority.'));
        this.transitions.clear();
    }

    /**
     * Cancels all requests once the escape key has been depressed.
     * 
     * @method cancelAll :: void
     * @return {void}
     */
    cancelAll() {
        this.transitions.size > 0 && this.props.onCancel(this.transitions.size);
        this.transitions.forEach(({ callback, cancel }) => {
            cancel('Due to escape key being pressed.');
            callback(false);
        });
        this.transitions.clear();
    }

    /**
     * @method render :: XML
     * @return {XML}
     */
    render() {

        return (
            <ReactBrowserRouter getUserConfirmation={this.load.bind(this)}>
                <ApplyRouteBlock>{this.props.children}</ApplyRouteBlock>
            </ReactBrowserRouter>
        );

    }

}

/**
 * @class StaticRouter
 * @extends {Component}
 */
export class StaticRouter extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <ReactStaticRouter {...this.props}>
                {this.props.children}
            </ReactStaticRouter>
        );

    }

}

/**
 * Wrap the passed component with the `fetchData` function which is attached as a static property.
 * 
 * @method withPreload :: Promise<function({ dispatch, match, cancelToken? })> -> function(React.Component) -> React.Component
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
 * @method fetchPreloadForComponent :: React.Component -> { dispatch, match, cancelToken? } -> Promise<any>
 * @param {React.Component} Component
 * @param {Object} args
 * @return {Promise<any>}
 */
function fetchPreloadForComponent(Component, args) {
    return handler in Component && Component[handler](args);
}

/**
 * @method populateStore :: array -> string -> function(object) -> Promise<any>
 * @param {Array} tree
 * @param {String} location
 * @param {Function} dispatch
 * @return {Promise<any>}
 */
export function populateStore(tree, location, dispatch) {

    const branches = matchRoutes(tree, location);

    return Promise.all(branches.filter(branch => branch.route.component).map(branch => {
        const params = { match: branch.match, dispatch };
        return fetchPreloadForComponent(branch.route.component, params);
    }));

}
