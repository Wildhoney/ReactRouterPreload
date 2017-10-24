import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'ramda';
import * as actions from '../../reducers/users/actions';
import { withPreload } from '../../../../src/index';

/**
 * @method mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
function mapStateToProps(state) {

    return {
        user: state.users.user 
    };

}

/**
 * @class Layout
 * @extends {PureComponent}
 */
export class User extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <main className="user">
                <header>{this.props.match.params.username}</header>
                <NavLink to={`/user/${Math.random()}`}>Goto Next</NavLink>
            </main>
        );

    }

}

const fetchData = () => {
    return Promise.resolve('xx!');
};

const apply = compose(withRouter, connect(mapStateToProps), withPreload(fetchData));
export default apply(User);
