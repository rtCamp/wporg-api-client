/** External dependencies */
import isObject from 'lodash/isObject';

/**  Internal dependencies */
import { fetchInfo, fetchTranslations } from '../wporg_server/';

/** Utilities */
import { hasCorrectElementTypesInArray } from '../utils/generic_functions';
import { themesActions } from './utils/actions';
import {
    query_themes_args,
    query_themes_filters,
    browse_values,
} from './utils/arguments';
import { INFO_API_TYPES, TRANSLATION_API_TYPES } from '../utils/api_types';

/** These types are maintained in  constants file  */
const infoType =
    INFO_API_TYPES && Array.isArray(INFO_API_TYPES) && INFO_API_TYPES[0];

const translationType =
    TRANSLATION_API_TYPES &&
    Array.isArray(TRANSLATION_API_TYPES) &&
    TRANSLATION_API_TYPES[0];

/**
 * Get list of themes
 *
 * @param {Object} args(optional) - An object of arguments for filter, possible values are listed
 * in utils => themes_info => arguments => query_themes_args
 */
const getThemesList = (args = {}) => {
    /** If a valid object */
    if ((args && !isObject(args)) || (args && Array.isArray(args))) {
        throw new Error('arguments should be an object');
    }

    /** Check each argument and it's type */
    for (let arg in args) {
        let argValue = args[arg];

        /** If argument exists */
        if (!(arg in query_themes_args)) {
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
        } else if (typeof argValue != query_themes_args[arg]) {
            /** If type of argument value is correct */
            throw new Error(
                `argument ${arg} should be ${
                    query_themes_args[arg]
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

    const action = themesActions['QUERY_THEMES'];

    return fetchInfo(infoType, action, args);
};

/**
 * Get themes by filters
 *
 * @param {String} filter_key(required)
 * @param {String} filter_value(required)
 * @param {Number} page(optional) - Page number
 * @param {Number} per_page(optional) - Themes per page
 *
 * Use any one value from query_themes_filters object listed in arguments file,
 * e.g: getThemesBy('browse', 'popular') to get popular themes listing
 */
const getThemesBy = (filter_key, filter_value, page, per_page) => {
    /** If filter key and filter value is passed */
    if (!filter_key || !filter_value) {
        throw new Error('filter key and filter value are required!');
    }

    /** If supported filter is passed */
    if (!(filter_key in query_themes_filters)) {
        throw new Error(
            `filter ${filter_key} is not supported, possible options are ${Object.keys(
                query_themes_filters,
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
            throw new Error('gag should be either string or array of strings!');
        }
    } else if (typeof filter_value != query_themes_filters[filter_key]) {
        /** If argument value data type is incorrect */
        throw new Error(
            `filter ${filter_key} should be ${
                query_themes_filters[filter_key]
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

    const action = themesActions['QUERY_THEMES'];

    const args = {
        [filter_key]: filter_value,
        page,
        per_page,
    };

    return fetchInfo(infoType, action, args);
};

/**
 * Get single theme info
 *
 * @param {String} theme_slug(required)
 * @param {Array} fields(optional) -  Not accepting currently as associative arrays are not
 * available in JS
 */
const getThemeInfo = (theme_slug, fields) => {
    /** @todo add support for fields */
    if (!theme_slug) {
        throw new Error('theme slug is required');
    }

    const action = themesActions['THEME_INFORMATION'];

    const args = {
        slug: theme_slug,
    };

    return fetchInfo(infoType, action, args);
};

/**
 * Get list of valid theme tags
 */
const getThemeTagsList = () => {
    const action = themesActions['FEATURE_LIST'];

    return fetchInfo(infoType, action);
};

/**
 * Get list of most popular theme tags
 *
 * @param {Number} tags_count(optional) - The number of tags to return
 */
const getThemeHotTagsList = (tags_count) => {
    /** If tags count is of correct type */
    if (tags_count && typeof tags_count !== 'number') {
        throw new Error('tags count should be number');
    }

    const action = themesActions['HOT_TAGS'];

    const args = {
        number: tags_count,
    };

    return fetchInfo(infoType, action, args);
};

/**
 * Get theme translations
 *
 * @param {String} slug(required) - Theme slug
 * @param {String} version(optional) - Theme version, fallbacks to the latest version of not passed
 */
const getThemeTranslations = (slug, version) => {
    /** If slug is provided */
    if (!slug) {
        throw new Error('slug is required');
    }

    return fetchTranslations(translationType, slug, version);
};

export {
    getThemesList,
    getThemesBy,
    getThemeInfo,
    getThemeTagsList,
    getThemeHotTagsList,
    getThemeTranslations,
};
