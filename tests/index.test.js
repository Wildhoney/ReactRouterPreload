import test from 'ava';
import React, { PureComponent } from 'react';
import { shallow } from 'enzyme';
import { createBrowserHistory, withPreload, fetchPreload } from '../src/index';

test('It should be able to augment the component with the fetch function;', async t => {

    class Example extends PureComponent {

        render() {
            return this.props.name;
        }

    }

    const handler = (name, country) => Promise.resolve([name, country]);
    const ExampleWithPreload = withPreload(Example, handler);
    const data = await fetchPreload(ExampleWithPreload, 'Adam', 'United Kingdom');

    const wrapper = shallow(<ExampleWithPreload name="Adam" />);

    t.is(wrapper.text(), 'Adam');
    t.deepEqual(data, ['Adam', 'United Kingdom']);

});
