import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './layout';
import { BrowserRouter } from '../../src/index';
import { tree, createStore } from './config';

document.addEventListener('DOMContentLoaded', () => {

    const store = createStore();
    const mountNode = document.querySelector('section.app');

    render((
        <Provider store={store}>
            <BrowserRouter tree={tree}>
                <Layout />
            </BrowserRouter>
        </Provider>
    ), mountNode);

});
