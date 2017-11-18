import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { instance } from '../../helpers/request';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'ramda';
import * as actions from '../../reducers/users/actions';
import { withPreload, fetchPreload } from '../../../../src/index';

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
        user: PropTypes.object
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        user: null
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const name = `${this.props.user.name.first} ${this.props.user.name.last}`;

        return (
            <main className="user">
                <header>{name}</header>
                <NavLink to={`/user/${Math.ceil(Math.random() * 10)}.html`}>Goto Next</NavLink>
            </main>
        );

    }

}

/**
 * @constant fetchData
 * @param {Function} dispatch
 * @param {Object} match
 * @return {Promise}
 */
const fetchData = ({ dispatch, match, cancelToken }) => {
    return dispatch(actions.fetchUser(match.params.username, cancelToken));
};

const apply = compose(withRouter, connect(mapStateToProps), withPreload(fetchData));
export default apply(User);
