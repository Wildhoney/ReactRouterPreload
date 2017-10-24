import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Layout from './layout';
import User from './containers/user/index';
import { Router } from '../../src/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const routeTree = [{
    routes: [{
        path: '/userx/:username',
        exact: true,
        component: Symbol('Blah')
    },{
        path: '/user/:username',
        component: User
    }]
}];

document.addEventListener('DOMContentLoaded', () => {
    const mountNode = document.querySelector('section.app');
    render(<Router tree={routeTree}><Provider store={store}><Layout /></Provider></Router>, mountNode);
});
