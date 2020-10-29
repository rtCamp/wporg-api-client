/**  Internal dependencies */
import { fetchInfo, fetchTranslations, fetchStats, fetchPluginDownloads } from '../wporg_server/';

/** Utilities */
import { INFO_API, TRANSLATIONS_API, STATS_API, PLUGIN_DOWNLOADS_API } from '../utils/apis';
import { pluginsActions } from './utils/actions';
import { INFO_API_TYPES, TRANSLATION_API_TYPES } from '../utils/api_types';
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
 * @param {Object} args - An object of arguments for filter, possible values are listed
 * in utils => arguments => query_plugins_params
 * @param {String} api_version
 */
const getPluginsList = (args = {}, api_version) => {
    const { isValid, errors } = isInfoListParamsValid(args, infoType);

    if (!isValid) {
        throw new Error(errors);
    }

    const params = {
        action: pluginsActions['QUERY_PLUGINS'],
        ...createParamsObj(args),
    };

    /** We're concatenating tag param in url when tag is an array of strings because
     * 	params object can not have two properties with the same key
     * */
    const concatenatedTags = concatenateTags(args);

    /** Use default version if not provided */
    if (!isValidVersion(api_version, API_VERSIONS['info_api'])) {
        if (infoType in DEFAULT_API_VERSIONS) {
            api_version = DEFAULT_API_VERSIONS[infoType];
        } else {
            throw new Error(`type ${infoType} is incorrect, available types are ${INFO_API_TYPES}`);
        }
    }

    const url = `/${infoType}${INFO_API}/${api_version}?${concatenatedTags}`;

    return fetchInfo(url, params);
};

/**
 * Get filtered plugins list
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

    const params = {
        action: pluginsActions['QUERY_PLUGINS'],
        [filter_key]: filter_value,
        page,
        per_page,
    };

    /** We're concatenating tag param in url when tag is an array of strings because
     * 	params object can not have two properties with the same key
     * */
    const concatenatedTags = concatenateTags(args);

    /** Use default version if not provided */
    if (!isValidVersion(api_version, API_VERSIONS['info_api'])) {
        if (infoType in DEFAULT_API_VERSIONS) {
            api_version = DEFAULT_API_VERSIONS[infoType];
        } else {
            throw new Error(`type ${infoType} is incorrect, available types are ${INFO_API_TYPES}`);
        }
    }

    const url = `/${infoType}${INFO_API}/${api_version}?${concatenatedTags}`;

    return fetchInfo(url, params);
};

/**
 * Get single plugin info
 *
 * @param {String} plugin_slug(required)
 * @param {Array} fields(optional) -  Not accepting currently as associative arrays are not
 * available in JS
 * @param {String} api_version
 */
const getPluginInfo = (plugin_slug, fields, api_version) => {
    /** @todo add support for fields */
    if (!plugin_slug) {
        throw new Error('plugin slug is required');
    }

    const params = {
        action: pluginsActions['PLUGIN_INFORMATION'],
        slug: plugin_slug,
    };

    const url = `/${infoType}${INFO_API}/${api_version}`;

    return fetchInfo(url, params);
};

/**
 * Get list of most popular plugin tags
 *
 * @param {Number} tags_count(optional) - The number of tags to return
 * @param {String} api_version
 *
 * Note: tags_count is not implemented in the api yet
 */
const getPluginHotTagsList = (tags_count, api_version) => {
    /** If tags count is of incorrect type */
    if (tags_count && typeof tags_count !== 'number') {
        throw new Error(`${tags_count} should be number`);
    }

    const params = {
        action: pluginsActions['HOT_TAGS'],
        number: tags_count,
    };

    const url = `/${infoType}${INFO_API}/${api_version}`;

    return fetchInfo(url, params);
};

/**
 * Get plugin translations
 *
 * @param {String} slug(required) - Plugin slug
 * @param {String} version(optional) - Plugin version, fallbacks to the latest version of not passed
 * @param {String}(optional) api_version
 */
const getPluginTranslations = (slug, version, api_version) => {
    if (!slug) {
        throw new Error('slug is required');
    }

    const params = {
        slug,
        version,
    };

    if (!isValidVersion(api_version, API_VERSIONS['translation_api'])) {
        api_version = DEFAULT_API_VERSIONS['translations'];
    }

    const url = `${TRANSLATIONS_API}/${translationType}/${api_version}`;

    return fetchTranslations(url, params);
};

/**
 * Fetch plugin downloads count
 *
 * @param {String}(required) slug - plugins slug
 * @param {String}(optional) limit - Downloads in last {limit} days
 * @param {String}(optional) api_version
 */
const getPluginDownloads = (slug, limit, api_version) => {
    if (!slug) {
        throw new Error('slug is required');
    }

    if (limit && typeof limit !== 'number') {
        throw new Error('limit should be number');
    }

    const params = {
        slug,
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
 * @param {String}(required) type - 'wordpress' | 'php' |  'mysql' |  'plugin'
 * @param {String}(required) slug - Plugin slug
 * @param {String}(optional) api_version
 */
const getPluginStats = (slug, api_version) => {
    if (!slug) {
        throw new Error('plugin slug is required');
    }

    if (!isValidVersion(api_version, API_VERSIONS['stats_api'])) {
        api_version = DEFAULT_API_VERSIONS['stats'];
    }

    const url = `${STATS_API}/plugins/${api_version}/${slug}`;

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
