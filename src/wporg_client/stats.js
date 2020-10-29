/**  Internal dependencies */
import { fetchStats } from '../wporg_server/';

/** Utilities */
import { STATS_API } from '../utils/apis';
import { STATS_API_TYPES } from '../utils/api_types';
import { API_VERSIONS, DEFAULT_API_VERSIONS } from '../utils/versions';

/**
 * Get stats
 *
 * @param {String} type* - 'wordpress' | 'php' |  'mysql'
 * @param {String} api_version
 */
const getStats = (type, api_version) => {
    if (!type) {
        throw new Error(`type is required`);
    }

    if (STATS_API_TYPES.indexOf(type) === -1) {
        throw new Error(`type ${type} is incorrect, available types are ${STATS_API_TYPES}`);
    }

    if (!isValidVersion(api_version, API_VERSIONS['stats_api'])) {
        api_version = DEFAULT_API_VERSIONS['stats'];
    }

    const url = `${STATS_API}/${type}/${api_version}`;

    return fetchStats(url);
};

export { getStats };
