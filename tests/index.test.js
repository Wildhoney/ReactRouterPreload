import test from 'ava';
import { shallow } from 'enzyme';
import starwars from 'starwars';
import delay from 'delay';
import React, { PureComponent } from 'react';
import { spy } from 'sinon';
import { createBrowserHistory, withPreload, fetchPreload } from '../src/index';
import Example from './components/Example';

test('It should be able to load the data using the `fetchPreload` function;', async t => {
    
    const text = starwars();
    const fetchData = spy(text => Promise.resolve(text));
    const ExampleWithPreload = withPreload(Example, fetchData);
    const data = await fetchPreload(ExampleWithPreload, text);

    t.is(data, text);
    
});

test('It should be able to fetch data asynchronously by modifying the router;', async t => {

    const fetchData = spy(() => Promise.resolve(starwars()));
    const ExampleWithPreload = withPreload(Example, fetchData);

    const routeTree = [{
        routes: [{
            path: '/example',
            component: ExampleWithPreload
        }]
    }];

    const options = { onEnter: spy(), onLoaded: spy(), onCancel: spy(), routeTree };
    const createHistory = createBrowserHistory(options);
    const history = createHistory({ basename: '/' });

    history.push('/example');

    t.is(history.action, 'POP');
    t.true(typeof history.block === 'function');
    t.is(options.onEnter.callCount, 1);
    t.is(fetchData.callCount, 1);

    await delay();
    t.is(options.onLoaded.callCount, 1);

});
