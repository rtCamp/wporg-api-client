/**  Internal dependencies */
import { fetchStats } from '../wporg_server/';

/** Utilities */
import { STATS_API_TYPES } from '../utils/api_types';

/**
 * Get core translations
 *
 * @param {String} type(optional) - 'wordpress' | 'php' |  'mysql' |  'plugin'
 */
const getStats = (type) => {
    if (!type) {
        throw new Error(`type is required`);
    }

    if (STATS_API_TYPES.indexOf(type) === -1) {
        throw new Error(
            `type ${type} is incorrect, available types are ${STATS_API_TYPES}`,
        );
    }

    return fetchStats(type);
};

export { getStats };
