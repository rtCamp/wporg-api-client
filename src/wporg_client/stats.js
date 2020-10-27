/**  Internal dependencies */
import { fetchStats } from '../wporg_server/';

/** Utilities */
import { statsTypes } from '../utils/api_types';

/**
 * Get core translations
 *
 * @param {String} type(optional) - 'wordpress' | 'php' |  'mysql' |  'plugin'
 */
const getStats = async (type) => {
    if (!type) {
        throw new Error(`Type is required`);
    }

    if (statsTypes.indexOf(type) === -1) {
        throw new Error(
            `Type ${type} is incorrect, available types are ${statsTypes}`,
        );
    }

    let response;

    try {
        response = await fetchStats(type);
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export { getStats };
