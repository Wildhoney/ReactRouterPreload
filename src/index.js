
import { PureComponent } from 'react';
import { matchRoutes } from 'react-router-config';
import { createBrowserHistory as createHistory } from 'history';

/**
 * @constant key
 * @type {String}
 */
const key = '@@react-router-component-will-fetch';

/**
 * @constant handler
 * @type {Symbol}
 */
export const handler = Symbol('react-router/fetch-data');

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    createCancelToken: () => Symbol('cancelToken'),
    cancelOnEscape: true,
    routeTree: [],
    onEnter: () => console.log('Entering'),
    onLoaded: location => console.log('Entered'),
    onCancel: () => console.log('Cancelled')
};

/**
 * @method withPreload
 * @param {React.Component} WrappedComponent
 * @param {Promise} fetchData
 * @return {React.Component}
 */
export function withPreload(WrappedComponent, fetchData) {

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

/**
 * @method createBrowserHistoryWithRouter
 * @param {Object} [instanceOptions = defaultOptions]
 * @return {Object}
 */
export function createBrowserHistory(instanceOptions = defaultOptions) {

    const options = { ...defaultOptions, ...instanceOptions };

    /**
     * @param {Object} [browserHistoryOptions = {}]
     * @return {Object}
     */
    return (browserHistoryOptions = {}) => {

        /**
         * @constant transitions
         * @type {Set}
         */
        const transitions = new Set();
        
        /**
         * @method cancelAll
         * @return {void}
         */
        function cancelAll() {
            transitions.size > 0 && options.onCancel(transitions.size);
            transitions.forEach(callback => callback(false));
            transitions.clear();
        }
    
        /**
         * @method handle
         * @param {Object} location
         * @param {Function} callback
         * @return {void}
         */
        async function handle(location, callback) {
            
            cancelAll();
            options.onEnter(location);
            transitions.add(callback);
            
            const branches = matchRoutes(options.routeTree, location.pathname);
            const cancelToken = options.createCancelToken();
    
            await Promise.all(branches.filter(branch => branch.route.component).map(branch => {
                const params = { match: branch.match, cancelToken };
                return fetchPreload(branch.route.component, params);
            }));

            if (transitions.has(callback)) {
                callback(true);
                transitions.clear();
                options.onLoaded(location);
            }
    
        }
        
        // Handle the event where the user hits the escape key during the transitioning phase.
        options.cancelOnEscape && window.addEventListener('keydown', event => event.key === 'Escape' && cancelAll());
    
        const history = createHistory({
            ...browserHistoryOptions,
    
            /**
             * @method getUserConfirmation
             * @param {String} message
             * @param {Function} callback
             * @return {Promise|void}
             */
            getUserConfirmation: (message, callback) => {

                switch (message) {
    
                    case key: {
                        return handle(history.location, callback);
                    }
                    
                    default: {
                        const create = options.createUserConfirmation || (message => callback(window.confirm.message(message)));
                        return create(message, callback);
                    }
    
                }
    
            }
        });
    
        history.block(key);
        return history;

    };

}
