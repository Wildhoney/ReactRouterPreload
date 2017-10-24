import { create } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

/**
 * @constant instance
 * @type {Object}
 */
export const instance = create({
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    transformRequest: [JSON.stringify, decamelizeKeys],
    transformResponse: [JSON.parse, camelizeKeys]
});
