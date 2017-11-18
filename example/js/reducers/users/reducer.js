import * as type from './types';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    user: null,
    friends: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case type.FETCH_USER:
            return { ...state, user: action.result };

        case type.FETCH_FRIENDS:
            return { ...state, friends: action.result };

    }

    return state;

};
