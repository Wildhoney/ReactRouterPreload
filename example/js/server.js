import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Layout from './layout';
import { StaticRouter, populateStore } from '../../src/index';
import { tree, createStore } from './config';

/**
 * @param {String} location
 * @return {Promise<string>}
 */
export default async location => {

    const store = createStore();
    await populateStore(tree, location, store.dispatch);

    const layout = renderToString(
        <Provider store={store}>
            <StaticRouter context={{}} location={location}>
                <Layout />
            </StaticRouter>
        </Provider>
    );

    return { layout, state: store.getState() }

};
