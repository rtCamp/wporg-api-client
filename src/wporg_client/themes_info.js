/** External dependencies */
import isObject from 'lodash/isObject';

/**  Internal dependencies */
import {
    fetchThemesInfo,
    fetchThemesTranslations,
} from '../wporg_server/themes_info';

/** Utilities */
import {
    actions,
    query_themes_args,
    query_themes_filters,
    browse_values,
} from '../utils/themes_info/arguments';
import { hasCorrectElementTypesInArray } from '../utils/generic_functions';

/**
 * Get list of themes
 *
 * @param {Object} args(optional) - An object of arguments for filter, possible values are listed
 * in utils => themes_info => arguments => query_themes_args
 */
const getThemesList = async (args = {}) => {
    /** If not an valid object */
    if ((args && !isObject(args)) || (args && Array.isArray(args))) {
        throw new Error("Arguments should be an object and can't be empty!");
    }

    for (let arg in args) {
        let argValue = args[arg];

        /** If unsupported argument is passed */
        if (!(arg in query_themes_args)) {
            throw new Error(`Argument ${arg} is not supported`);
        }

        /** If tag is neither string not array */
        if (arg === 'tag') {
            if (
                typeof argValue === 'string' ||
                (Array.isArray(argValue) &&
                    hasCorrectElementTypesInArray(argValue, 'string'))
            ) {
            } else {
                throw new Error(
                    'Argument tag should be either string or array of strings',
                );
            }
        } else if (typeof argValue != query_themes_args[arg]) {
            /** If argument value data type is incorrect */
            throw new Error(
                `Argument ${arg} should be ${
                    query_themes_args[arg]
                }, passed ${typeof argValue}`,
            );
        }

        /** If browse filter have unsupported values passed */
        if (arg === 'browse' && browse_values.indexOf(argValue) === -1) {
            throw new Error(
                `Incorrect value provided for argument ${arg}, possible values are ${browse_values}`,
            );
        }
    }

    const action = actions['QUERY_THEMES'];

    const response = await fetchThemesInfo(action, args);

    return response;
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
const getThemesBy = async (filter_key, filter_value, page, per_page) => {
    if (!filter_key || !filter_value) {
        throw new Error('Filter key and filter value are required!');
    }

    /** If unsupported filter is passed */
    if (!(filter_key in query_themes_filters)) {
        throw new Error(
            `Filter ${filter_key} is not supported, possible options are ${Object.keys(
                query_themes_filters,
            )}!`,
        );
    }

    /** If tag filter type is incorrect. */
    if (filter_key === 'tag') {
        if (
            typeof filter_value === 'string' ||
            (Array.isArray(filter_value) &&
                hasCorrectElementTypesInArray(filter_value, 'string'))
        ) {
        } else {
            throw new Error('Tag should be either string or array of strings!');
        }
    } else if (typeof filter_value != query_themes_filters[filter_key]) {
        /** If argument value data type is incorrect */
        throw new Error(
            `Filter ${filter_key} should be ${
                query_themes_filters[filter_key]
            }, passed ${typeof filter_value}`,
        );
    }

    /** If browse filter have unsupported values passed */
    if (filter_key === 'browse' && browse_values.indexOf(filter_value) === -1) {
        throw new Error(
            `Incorrect value provided for filter ${filter_key}, possible values are ${browse_values}`,
        );
    }

    /** If page or page number type is incorrect */
    if (
        (page && typeof page !== 'number') ||
        (per_page && typeof per_page !== 'number')
    ) {
        throw new Error(`page and per_page should be number`);
    }

    const action = actions['QUERY_THEMES'];

    const args = {
        [filter_key]: filter_value,
        page,
        per_page,
    };

    const response = await fetchThemesInfo(action, args);

    return response;
};

/**
 * Get single theme info
 *
 * @param {String} theme_slug(required)
 * @param {Array} fields(optional) -  Not accepting currently as associative arrays are not
 * available in JS
 */
const getThemeInfo = async (theme_slug, fields) => {
    /** @todo add support for fields */
    if (!theme_slug) {
        throw new Error('Theme slug is required!');
    }

    const action = actions['THEME_INFORMATION'];

    const args = {
        slug: theme_slug,
    };

    const response = await fetchThemesInfo(action, args);

    return response;
};

/**
 * Get list of valid theme tags
 */
const getThemeTagsList = async () => {
    const action = actions['FEATURE_LIST'];

    const response = await fetchThemesInfo(action);

    return response;
};

/**
 * Get list of most popular theme tags
 *
 * @param {Number} number(optional) - The amount of tags to return
 */
const getPopularThemeTagsList = async (tags_count) => {
    /** If tags count is of incorrect type */
    if (tags_count && typeof tags_count !== 'number') {
        throw new Error('tags_count should be number');
    }

    const action = actions['HOT_TAGS'];

    const args = {
        number: tags_count,
    };

    const response = await fetchThemesInfo(action, args);

    return response;
};

/**
 * Get theme translations
 *
 * @param {String} slug(required) - Theme slug
 * @param {String} version(optional) - Theme version, fallbacks to the latest version of not passed
 */
const getThemeTranslations = async (slug, version) => {
    if (!slug) {
        throw new Error('Slug is required!');
    }

    const response = await fetchThemesTranslations(slug, version);

    return response;
};

export {
    getThemeInfo,
    getThemesList,
    getThemesBy,
    getThemeTagsList,
    getPopularThemeTagsList,
    getThemeTranslations,
};
