/**  Internal dependencies */
import { fetchInfo, fetchTranslations } from '../wporg_server/';

/** Utilities */
import { themesActions } from './utils/actions';
import { INFO_API, TRANSLATIONS_API } from '../utils/apis';
import { INFO_API_TYPES, TRANSLATION_API_TYPES } from '../utils/api_types';
import { API_VERSIONS, DEFAULT_API_VERSIONS } from '../utils/versions';
import { isInfoListParamsValid, isFilterInfoListParamsValid } from './utils/plugins_themes_common_methods';
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
 * @param {Object} args(optional) - An object of arguments to filter, possible values are
 * listed in utils => themes_info => arguments => query_themes_params
 * @param {String} api_version
 */
const getThemesList = (args = {}, api_version) => {
    const { isValid, errors } = isInfoListParamsValid(args, infoType);

    if (!isValid) {
        throw new Error(errors);
    }

    const params = {
        action: pluginsActions['QUERY_THEMES'],
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

    return fetchInfo(url, params, api_version);
};

/**
 * Get themes by filters
 *
 * @param {String} filter_key(required)
 * @param {String} filter_value(required)
 * @param {Number} page(optional) - Page number
 * @param {Number} per_page(optional) - Themes per page
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

    const params = {
        action: pluginsActions['QUERY_THEMES'],
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
 * Get single theme info
 *
 * @param {String} theme_slug(required)
 * @param {Array} fields(optional) -  Not accepting currently as associative arrays are not
 * available in JS
 * @param {String} api_version
 */
const getThemeInfo = (theme_slug, fields, api_version) => {
    /** @todo add support for fields */
    if (!theme_slug) {
        throw new Error('theme slug is required');
    }

    const params = {
        action: pluginsActions['THEME_INFORMATION'],
        slug: theme_slug,
    };

    const url = `/${infoType}${INFO_API}/${api_version}`;

    return fetchInfo(url, params);
};

/**
 * Get list of valid theme tags
 *
 * @param {String} api_version
 */
const getThemeHotTagsList = (api_version) => {
    const action = themesActions['FEATURE_LIST'];

    return fetchInfo(infoType, action);
};

/**
 * Get list of most popular theme tags
 *
 * @param {Number} tags_count(optional) - The number of tags to return
 * @param {String} api_version
 */
const getThemeHotTagsList = (tags_count, api_version) => {
    /** If tags count is of correct type */
    if (tags_count && typeof tags_count !== 'number') {
        throw new Error('tags count should be number');
    }

    const params = {
        action: pluginsActions['HOT_TAGS'],
        number: tags_count,
    };

    const url = `/${infoType}${INFO_API}/${api_version}`;

    return fetchInfo(url, params);
};

/**
 * Get theme translations
 *
 * @param {String} slug(required) - Theme slug
 * @param {String} version(optional) - Theme version, fallbacks to the latest version of not passed
 * @param {String} api_version
 */
const getThemeTranslations = (slug, version, api_version) => {
    /** If slug is provided */
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

export { getThemesList, filterThemesBy, getThemeInfo, getThemeHotTagsList, getThemeHotTagsList, getThemeTranslations };
