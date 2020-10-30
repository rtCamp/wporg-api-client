/**  Internal dependencies */
import { fetchInfo, fetchTranslations } from '../wporg_server/';

/** Utilities */
import { themesActions } from './utils/actions';
import { INFO_API, TRANSLATIONS_API } from '../utils/apis';
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
const infoType = INFO_API_TYPES && Array.isArray(INFO_API_TYPES) && INFO_API_TYPES[0];

const translationType = TRANSLATION_API_TYPES && Array.isArray(TRANSLATION_API_TYPES) && TRANSLATION_API_TYPES[0];

/**
 * Get list of themes
 *
 * @param {Object} filters - List of filters, possible values are listed in
 * utils => themes_info => params => query_themes_params
 * @param {String} api_version
 */
const getThemesList = (filters = {}, api_version) => {
    const { isValid, errors } = isInfoListParamsValid(filters, infoType);

    if (!isValid) {
        throw new Error(errors);
    }

    const params = {
        action: themesActions['QUERY_THEMES'],
        ...createParamsObj(filters),
    };

    /** We're concatenating tag param in url when tag is an array of strings because
     * 	params object can not have two properties with the same key
     * */
    let concatenatedTags = '';
    /** Checking if tag exists in params object amd it's an array, if not an array then
     * 	will be handled like normal filter
     * */
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

    return fetchInfo(url, params);
};

/**
 * Get filtered themes
 *
 * @param {String} filter_key*
 * @param {String} filter_value*
 * @param {Number} page - Page number
 * @param {Number} per_page - Themes per page
 * @param {String} api_version
 *
 * Use any one value from query_themes_filter_params object listed in arguments file,
 * e.g: filterThemesBy('browse', 'popular') to get popular themes listing
 */
const filterThemesBy = (filter_key, filter_value, page, per_page, api_version) => {
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
        action: themesActions['QUERY_THEMES'],
        ...createParamsObj(paramsObj),
    };

    /** Use default api version if not provided */
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
 * Get single theme info
 *
 * @param {String} theme_slug*
 * @param {String} api_version
 */
const getThemeInfo = (theme_slug, api_version) => {
    /** @todo add support for fields:- Not accepting currently as associative arrays are not available in JS */
    if (!theme_slug) {
        throw new Error('theme slug is required');
    }

    const params = {
        action: themesActions['THEME_INFORMATION'],
        'request[slug]': theme_slug,
    };

    /** Use default api version if not provided */
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
 * Returns a list of the most popular theme tags
 *
 * @param {Number} tags_count - The number of tags to return
 * @param {String} api_version
 */
const getPopularThemeTags = (tags_count, api_version) => {
    /** If tags count is of correct type */
    if (tags_count && typeof tags_count !== 'number') {
        throw new Error('tags count should be number');
    }

    const params = {
        action: themesActions['HOT_TAGS'],
        'request[number]': tags_count,
    };

    /** Use default api version if not provided */
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
 * Get theme translations
 *
 * @param {String} theme_slug* - Theme slug
 * @param {String} theme_version - Theme version, fallbacks to the latest version of not passed
 * @param {String} api_version
 */
const getThemeTranslations = (theme_slug, theme_version, api_version) => {
    /** If theme_slug is provided */
    if (!theme_slug) {
        throw new Error('theme_slug is required');
    }

    const params = {
        slug: theme_slug,
        version: theme_version,
    };

    if (!isValidVersion(api_version, API_VERSIONS['translation_api'])) {
        api_version = DEFAULT_API_VERSIONS['translations'];
    }

    const url = `${TRANSLATIONS_API}/${translationType}/${api_version}`;

    return fetchTranslations(url, params);
};

export { getThemesList, filterThemesBy, getThemeInfo, getPopularThemeTags, getThemeTranslations };
