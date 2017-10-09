
import { createBrowserHistory } from 'history';
import { matchRoutes } from 'react-router-config';

/**
 * @constant key
 * @type {String}
 */
const key = '@@react-router-component-will-fetch';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    createCancelToken: () => Symbol('cancelToken'),
    handleFunction: 'componentWillFetch',
    cancelOnEscape: true,
    onEntering: () => console.log('Entering'),
    onEntered: location => console.log('Entered'),
    onCancel: () => console.log('Cancelled')
};

/**
 * @method withAsync
 * @param {Object} [options = defaultOptions]
 * @return {Object}
 */
export default function withAsync(instanceOptions = defaultOptions) {

    const options = { ...defaultOptions, ...instanceOptions };

    /**
     * @param {Object} [browserHistoryOptions = {}]
     * @return {Object}
     */
    return (browserHistoryOptions = {}) => {

        /**
         * @constant navigation
         * @type {Set}
         */
        const navigations = new Set();
        
        /**
         * @method cancelAll
         * @return {void}
         */
        function cancelAll() {
            navigations.size > 0 && options.onCancel(navigations.size);
            navigations.forEach(callback => callback(false));
            navigations.clear();
        }
    
        /**
         * @method handle
         * @param {Object} location
         * @param {Function} callback
         * @return {void}
         */
        async function handle(location, callback) {
            
            cancelAll();
            options.onEntering(location);
            navigations.add(callback);
            
            const branches = matchRoutes(options.routeTree, location.pathname);
            const cancelToken = options.createCancelToken();
    
            await Promise.all(branches.map(branch => {
                const componentWillFetch = branch.route.component[options.handleFunction] || (() => {});
                return componentWillFetch({ match: branch.match, cancelToken });
            }));
    
            if (navigations.has(callback)) {
                callback(true);
                navigations.clear();
                options.onEntered(location);
            }
    
        }
        
        // Handle the event where the user hits the escape key during the transitioning phase.
        options.cancelOnEscape && window.addEventListener('keydown', event => event.key === 'Escape' && cancelAll());
    
        const history = createBrowserHistory({
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
