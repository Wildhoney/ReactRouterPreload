import { url, instance } from '../../helpers/request';
import * as type from './types';

/**
 * @method fetchUser
 * @param {String} [username]
 * @return {Function}
 */
export function fetchUser(username, cancelToken) {

    return async dispatch => {
        const { data } = await instance.get('https://randomuser.me/api', { cancelToken });
        return dispatch(({ type: type.FETCH_USER, result: data.results[0] }));
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
