/**  Internal dependencies */
import { fetchInfo, fetchTranslations, fetchStats, fetchPluginDownloads } from '../wporg_server/';

/** Utilities */
import { INFO_API, TRANSLATIONS_API, STATS_API, PLUGIN_DOWNLOADS_API } from '../utils/apis';
import { pluginsActions } from './utils/actions';
import { INFO_API_TYPES, TRANSLATION_API_TYPES, STATS_API_TYPES_FOR_PLUGIN } from '../utils/api_types';
import { API_VERSIONS, DEFAULT_API_VERSIONS } from '../utils/versions';
import {
    isInfoListParamsValid,
    isFilterInfoListParamsValid,
    createParamsObj,
    concatenateTags,
} from './utils/plugins_themes_common_methods';
import { isValidVersion } from '../utils/generic_functions';

/** These types are maintained in  constants file  */
const infoType = Array.isArray(INFO_API_TYPES) && INFO_API_TYPES[1];

const translationType = Array.isArray(TRANSLATION_API_TYPES) && TRANSLATION_API_TYPES[1];

/**
 * Get list of plugins
 *
 * @param {Object} filters - List of filters, possible values are listed in
 * utils => themes_info => params => query_plugins_params
 * @param {String} api_version
 */
const getPluginsList = async (filters = {}, api_version) => {
    const { isValid, errors } = isInfoListParamsValid(filters, infoType);

    if (!isValid) {
        throw new Error(errors);
    }

    const params = {
        action: pluginsActions['QUERY_PLUGINS'],
        ...createParamsObj(filters),
    };

    /** Concatenate tag param if it's an array */
    let concatenatedTags = '';
    if ('tag' in filters && Array.isArray(filters['tag'])) {
        const tag_array = filters['tag'];
        concatenatedTags = concatenateTags(tag_array);
    }

    /** Use default version if not provided */
    if (!isValidVersion(api_version, API_VERSIONS['info_api'])) {
        if (infoType in DEFAULT_API_VERSIONS) {
            api_version = DEFAULT_API_VERSIONS[infoType];
        } else {
            throw new Error(`type ${infoType} is incorrect, available types are ${INFO_API_TYPES}`);
        }
    }

    const url = `/${infoType}${INFO_API}/${api_version}?${concatenatedTags}`;

    // Await the fetchInfo response
    const response = await fetchInfo(url, params);

    // Return only the plugins array
    return response.plugins || [];
};

/**
 * Get filtered plugins
 *
 * @param {String} filter_key*
 * @param {String} filter_value*
 * @param {Number} page - Page number
 * @param {Number} per_page - Plugins per page
 * @param {String} api_version
 *
 * Use any one value from query_plugin_filter_params object listed in arguments file,
 * e.g: getPluginsBy('browse', 'popular') to get popular plugins listing
 */
const filterPluginsBy = (filter_key, filter_value, page, per_page, api_version) => {
    const { isValid, errors } = isFilterInfoListParamsValid(filter_key, filter_value, page, per_page, infoType);

    if (!isValid) {
        throw new Error(errors);
    }

    let paramsObj = {
        page,
        per_page,
    };

    let concatenatedTags = '';

    if (filter_key === 'tag' && Array.isArray(filter_value)) {
        concatenatedTags = concatenateTags(filter_value);
    } else {
        paramsObj = {
            ...paramsObj,
            [filter_key]: filter_value,
        };
    }

    const params = {
        action: pluginsActions['QUERY_PLUGINS'],
        ...createParamsObj(paramsObj),
    };

    /** Use default version if not provided */
    if (!isValidVersion(api_version, API_VERSIONS['info_api'])) {
        if (infoType in DEFAULT_API_VERSIONS) {
            api_version = DEFAULT_API_VERSIONS[infoType];
        } else {
            throw new Error(`type ${infoType} is incorrect, available types are ${INFO_API_TYPES}`);
        }
    }

    /** Concatenate tag filter in url when tag is an array of strings because
     * 	params object can not have two properties with the same key
     * */
    const url = `/${infoType}${INFO_API}/${api_version}?${concatenatedTags}`;

    return fetchInfo(url, params);
};

/**
 * Get single plugin info
 *
 * @param {String} plugin_slug*
 * @param {String} api_version
 */
const getPluginInfo = (plugin_slug, api_version) => {
    /** @todo add support for fields:- Not accepting currently as associative arrays are not available in JS */
    if (!plugin_slug) {
        throw new Error('plugin slug is required');
    }

    const params = {
        action: pluginsActions['PLUGIN_INFORMATION'],
        'request[slug]': plugin_slug,
    };

    /** Use default version if not provided */
    if (!isValidVersion(api_version, API_VERSIONS['info_api'])) {
        if (infoType in DEFAULT_API_VERSIONS) {
            api_version = DEFAULT_API_VERSIONS[infoType];
        } else {
            throw new Error(`type ${infoType} is incorrect, available types are ${INFO_API_TYPES}`);
        }
    }

    const url = `/${infoType}${INFO_API}/${api_version}`;

    return fetchInfo(url, params);
};

/**
 * Returns a list of the most popular plugin tags
 *
 * @param {String} api_version
 *
 * Note: tags_count is not implemented in the api yet
 */
const getPluginHotTagsList = (api_version) => {
    const params = {
        action: pluginsActions['HOT_TAGS'],
    };

    /** Use default version if not provided */
    if (!isValidVersion(api_version, API_VERSIONS['info_api'])) {
        if (infoType in DEFAULT_API_VERSIONS) {
            api_version = DEFAULT_API_VERSIONS[infoType];
        } else {
            throw new Error(`type ${infoType} is incorrect, available types are ${INFO_API_TYPES}`);
        }
    }

    const url = `/${infoType}${INFO_API}/${api_version}`;

    return fetchInfo(url, params);
};

/**
 * Get plugin translations
 *
 * @param {String} slug* - Plugin slug
 * @param {String} plugin_version - Plugin version, fallbacks to the latest version of not passed
 * @param {String} api_version
 */
const getPluginTranslations = (slug, plugin_version, api_version) => {
    if (!slug) {
        throw new Error('slug is required');
    }

    const params = {
        slug: slug,
        version: plugin_version,
    };

    if (!isValidVersion(api_version, API_VERSIONS['translation_api'])) {
        api_version = DEFAULT_API_VERSIONS['translations'];
    }

    const url = `${TRANSLATIONS_API}/${translationType}/${api_version}`;

    return fetchTranslations(url, params);
};

/**
 * Get plugin downloads count
 *
 * @param {String} plugin_slug*
 * @param {String} limit - downloads in last {limit} days
 * @param {String} api_version
 */
const getPluginDownloads = (plugin_slug, limit, api_version) => {
    if (!plugin_slug) {
        throw new Error('plugin_slug is required');
    }

    if (limit && typeof limit !== 'number') {
        throw new Error('limit should be number');
    }

    const params = {
        slug: plugin_slug,
        limit,
    };

    if (!isValidVersion(api_version, API_VERSIONS['stats_api'])) {
        api_version = DEFAULT_API_VERSIONS['stats'];
    }

    const url = `${STATS_API}/plugin/${api_version}${PLUGIN_DOWNLOADS_API}`;

    return fetchPluginDownloads(url, params);
};

/**
 * Get plugin stats
 *
 * @param {String} plugin_slug* - Plugin slug
 * @param {String} api_version
 */
const getPluginStats = (plugin_slug, api_version) => {
    if (!plugin_slug) {
        throw new Error('plugin slug is required');
    }

    if (!isValidVersion(api_version, API_VERSIONS['stats_api'])) {
        api_version = DEFAULT_API_VERSIONS['stats'];
    }

    const url = `${STATS_API}/${STATS_API_TYPES_FOR_PLUGIN}/${api_version}/${plugin_slug}`;

    return fetchStats(url);
};

export {
    getPluginsList,
    filterPluginsBy,
    getPluginInfo,
    getPluginHotTagsList,
    getPluginTranslations,
    getPluginDownloads,
    getPluginStats,
};
