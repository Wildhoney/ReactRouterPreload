import { url, instance } from '../../helpers/request';
import * as type from './types';

/**
 * @method fetchUser
 * @param {String} username
 * @return {Function}
 */
export function fetchUser(username) {

    return async dispatch => {
        return dispatch(({ type: type.FETCH_USER, result }));
    };

}

/**
 * @method fetchFriends
 * @return {Function}
 */
export function fetchFriends(username) {
    
    return async dispatch => {
        return dispatch(({ type: type.FETCH_FRIENDS, result }));
    };

}
