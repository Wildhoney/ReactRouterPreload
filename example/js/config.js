import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import User from './containers/user/index';

/**
 * @method createStore
 * @param {Object} [data]
 * @return {Object} 
 */
export const createStore = data => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createReduxStore);
    return createStoreWithMiddleware(reducers, data);
};

/**
 * @constant tree
 * @type {Array}
 */
export const tree = [{
    routes: [{
        path: '/',
        exact: true,
        component: User
    },{
        path: '/user/:username.html',
        component: User
    }]
}];
