import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Prompt } from 'react-router';
import User from './containers/user/index';

/**
 * @class Layout
 * @extends {PureComponent}
 */
export class Layout extends PureComponent {

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="container">
                <Switch>
                    <Route path="/" exact component={User} />
                    <Route path="/user/:username" component={User} />
                </Switch>
            </section>
        );

    }

}

export default withRouter(Layout);
