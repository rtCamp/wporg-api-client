/** External dependencies */
import isObject from 'lodash/isObject';

/**  Internal dependencies */
import {
    fetchInfo,
    fetchTranslations,
    fetchPluginDownloads,
} from '../wporg_server/';
import { getStats } from './stats';

/** Utilities */
import { hasCorrectElementTypesInArray } from '../utils/generic_functions';
import { pluginsActions } from './utils/actions';
import {
    query_plugins_args,
    query_plugin_filters,
    browse_values,
} from './utils/arguments';
import {
    INFO_API_TYPES,
    TRANSLATION_API_TYPES,
    STATS_API_TYPES,
} from '../utils/api_types';

/** These types are maintained in  constants file  */
const type =
    INFO_API_TYPES && Array.isArray(INFO_API_TYPES) && INFO_API_TYPES[1];
const translationType =
    TRANSLATION_API_TYPES &&
    Array.isArray(TRANSLATION_API_TYPES) &&
    TRANSLATION_API_TYPES[1];
const statsType =
    STATS_API_TYPES ** Array.isArray(STATS_API_TYPES) && STATS_API_TYPES[3];

/**
 * Get list of plugins
 *
 * @param {Object} args(optional) - An object of arguments for filter, possible values are listed
 * in utils => arguments => query_plugins_args
 */
const getPluginsList = (args = {}) => {
    /** If a valid object */
    if ((args && !isObject(args)) || (args && Array.isArray(args))) {
        throw new Error('arguments should be an object');
    }

    /** Check each argument and it's type */
    for (let arg in args) {
        let argValue = args[arg];

        /** If argument exists */
        if (!(arg in query_plugins_args)) {
            throw new Error(`argument ${arg} doesn't exist`);
        }

        /** If tag is string or array of string */
        if (arg === 'tag') {
            if (
                typeof argValue === 'string' ||
                (Array.isArray(argValue) &&
                    hasCorrectElementTypesInArray(argValue, 'string'))
            ) {
            } else {
                throw new Error(
                    'argument tag should be either string or array of strings',
                );
            }
        } else if (typeof argValue != query_plugins_args[arg]) {
            /** If argument value data type is correct */
            throw new Error(
                `argument ${arg} should be ${
                    query_plugins_args[arg]
                }, passed ${typeof argValue}`,
            );
        }

        /** If browse filter have correct values passed */
        if (arg === 'browse' && browse_values.indexOf(argValue) === -1) {
            throw new Error(
                `incorrect value provided for argument ${arg}, possible values are ${browse_values}`,
            );
        }
    }

    const action = pluginsActions['QUERY_PLUGINS'];

    return fetchInfo(type, action, args);
};

/**
 * Get plugins by filters
 *
 * @param {String} filter_key(required)
 * @param {String} filter_value(required)
 * @param {Number} page(optional) - Page number
 * @param {Number} per_page(optional) - Plugins per page
 *
 * Use any one value from query_plugin_filters object listed in arguments file,
 * e.g: getPluginsBy('browse', 'popular') to get popular plugins listing
 */
const getPluginsBy = (filter_key, filter_value, page, per_page) => {
    /** If filter key and filter value is passed */
    if (!filter_key || !filter_value) {
        throw new Error('filter key and filter value are required!');
    }

    /** If supported filter is passed */
    if (!(filter_key in query_plugin_filters)) {
        throw new Error(
            `filter ${filter_key} is not supported, possible options are ${Object.keys(
                query_plugin_filters,
            )}!`,
        );
    }

    /** If tag filter is string or array of strings */
    if (filter_key === 'tag') {
        if (
            typeof filter_value === 'string' ||
            (Array.isArray(filter_value) &&
                hasCorrectElementTypesInArray(filter_value, 'string'))
        ) {
        } else {
            throw new Error('Tag should be either string or array of strings!');
        }
    } else if (typeof filter_value != query_plugin_filters[filter_key]) {
        /** If argument value data type is incorrect */
        throw new Error(
            `filter ${filter_key} should be ${
                query_plugin_filters[filter_key]
            }, passed ${typeof filter_value}`,
        );
    }

    /** If browse filter have correct values passed */
    if (filter_key === 'browse' && browse_values.indexOf(filter_value) === -1) {
        throw new Error(
            `incorrect value provided for filter ${filter_key}, possible values are ${browse_values}`,
        );
    }

    /** If page and per page type is correct */
    if (
        (page && typeof page !== 'number') ||
        (per_page && typeof per_page !== 'number')
    ) {
        throw new Error(`page and per page should be number`);
    }

    const action = pluginsActions['QUERY_PLUGINS'];

    const args = {
        [filter_key]: filter_value,
        page,
        per_page,
    };

    return fetchInfo(type, action, args);
};

/**
 * Get single plugin info
 *
 * @param {String} plugin_slug(required)
 * @param {Array} fields(optional) -  Not accepting currently as associative arrays are not
 * available in JS
 */
const getPluginInfo = (plugin_slug, fields) => {
    /** @todo add support for fields */
    if (!plugin_slug) {
        throw new Error('plugin slug is required');
    }

    const action = pluginsActions['PLUGIN_INFORMATION'];

    const args = {
        slug: plugin_slug,
    };

    return fetchInfo(type, action, args);
};

/**
 * Get list of most popular plugin tags
 *
 * @param {Number} tags_count(optional) - The number of tags to return
 *
 * Note: tags_count is not implemented in the api yet
 */
const getPluginHotTagsList = (tags_count) => {
    /** If tags count is of incorrect type */
    if (tags_count && typeof tags_count !== 'number') {
        throw new Error(`${tags_count} should be number`);
    }

    const action = pluginsActions['HOT_TAGS'];

    const args = {
        number: tags_count,
    };

    return fetchInfo(type, action, args);
};

/**
 * Get plugin translations
 *
 * @param {String} slug(required) - Plugin slug
 * @param {String} version(optional) - Plugin version, fallbacks to the latest version of not passed
 */
const getPluginTranslations = (slug, version) => {
    if (!slug) {
        throw new Error('slug is required');
    }

    return fetchTranslations(translationType, slug, version);
};

/**
 * Get plugin stats
 */
const getPluginStats = () => {
    return getStats(statsType);
};

/**
 * Fetch plugin number of downloads
 *
 * @param {String}(required) slug - plugins slug
 * @param {String}(optional) limit - Downloads in last {limit} days
 */
const getPluginDownloads = (slug, limit) => {
    if (!slug) {
        throw new Error('slug is required');
    }

    if (limit && typeof limit !== 'number') {
        throw new Error('limit should be of type number');
    }

    return fetchPluginDownloads(slug, limit);
};

export {
    getPluginsList,
    getPluginsBy,
    getPluginInfo,
    getPluginHotTagsList,
    getPluginTranslations,
    getPluginStats,
    getPluginDownloads,
};
