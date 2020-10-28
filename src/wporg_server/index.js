/** External dependencies */
import _get from 'lodash/get';

/** Utilities */
import axios from '../utils/axios_instance';
import {
    INFO_API,
    TRANSLATIONS_API,
    STATS_API,
    PLUGIN_DOWNLOADS_API,
    CORE_VERSION_CHECK_API,
    CORE_CREDITS_API,
    CORE_CHECKSUMS_API,
} from '../utils/apis';
import { DEFAULT_API_VERSIONS } from '../utils/versions';
import { infoTypes } from '../utils/api_types';

/**
 * Fetch themes or plugin info
 *
 * @param {String}(required) type - themes | plugins @todo create handler to check
 * @param {String}(required) action
 * @param {Object}(optional) args
 * @param {String}(optional) version - available api versions @todo create handler to check
 */
const fetchInfo = async (type, action, args, version) => {
    let response = {},
        params = {
            action,
        };

    /**  Add params from args object */
    for (let arg in args) {
        /** Tag is handled separately at line 41 when it is passed as an array  */
        if (arg === 'tag' && Array.isArray(args[arg])) {
            continue;
        }

        let key = `request[${arg}]`;
        let value = args[arg];

        params = {
            ...params,
            [key]: value,
        };
    }

    /** Tags needs to be passed in url string because params object can not have two properties
     * with one key which is the case for tags i.e request[tag], so we are concatenating tag params
     * in url
     * */
    let tagsParam = '';
    /** We are checking if tag exists in args object and it is an array, if not an array
     * then will be handled like normal arg in for loop
     * */
    if (args && 'tag' in args && Array.isArray(args['tag'])) {
        const tags = args['tag'];
        tags.forEach((tag) => {
            const tagString = `&request[tag]=${tag}`;
            tagsParam += tagString;
        });
    }

    try {
        /** Use default version if not passed */
        if (!version) {
            if (type in DEFAULT_API_VERSIONS) {
                version = DEFAULT_API_VERSIONS[type];
            } else {
                throw new Error(
                    `Type ${type} is incorrect, available types are ${infoTypes}`,
                );
            }
        }
        const url = `/${type}${INFO_API}/${version}?${tagsParam}`;

        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Fetch translations
 *
 * @param {String}(required) type - themes | plugins | core @todo create handler to check
 * @param {String}(optional) slug
 * @param {String}(optional) version - theme, plugin or core version
 */
const fetchTranslations = async (type, slug, version) => {
    let response = {},
        params = {
            slug,
            version,
        };

    try {
        const apiVersion = DEFAULT_API_VERSIONS['translations'];
        const url = `${TRANSLATIONS_API}/${type}/${apiVersion}`;

        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Fetch stats
 *
 * @param {String}(required) type - themes | plugins | core @todo create handler to check
 * @param {String}(optional) slug
 * @param {String}(optional) version - theme, plugin or core version
 */
const fetchStats = async (type) => {
    let response = {};

    try {
        const apiVersion = DEFAULT_API_VERSIONS['stats'];
        const url = `${STATS_API}/${type}/${apiVersion}`;

        response = await axios({
            url,
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Fetch plugin number of downloads
 *
 * @param {String}(required) slug - plugins slug
 * @param {String}(optional) limit - No of days
 * @param {String}(optional) callback - theme, plugin or core version
 */
const fetchPluginDownloads = async (slug, limit, callback) => {
    let response = {},
        params = {
            slug,
            limit,
            callback,
        };

    try {
        const apiVersion = DEFAULT_API_VERSIONS['stats'];
        const url = `${STATS_API}/plugin/${apiVersion}${PLUGIN_DOWNLOADS_API}`;

        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Fetch wordpress version info
 *
 * @param {String}(optional) version - To fetch versions released after given version
 * @param {String}(optional) locale - Locale
 */
const fetchCoreVersionInfo = async (version, locale) => {
    let response = {},
        params = {
            version,
            locale,
        };

    try {
        const apiVersion = DEFAULT_API_VERSIONS['version-check'];
        const url = `${CORE_VERSION_CHECK_API}/${apiVersion}`;

        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Fetch details of individual contributors in wordpress codebase
 *
 * @param {String}(optional) version
 * @param {String}(optional) locale
 */
const fetchCoreCreditDetails = async (version, locale) => {
    let response = {},
        params = {
            version,
            locale,
        };

    try {
        const apiVersion = DEFAULT_API_VERSIONS['credits'];
        const url = `${CORE_CREDITS_API}/${apiVersion}`;

        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}) || {});
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Returns a JSON encoded array of file MD5 checksums for a given WordPress
 * release / locale. Although english is the default, it's suggested to pass
 * it for 100% compatibility with core.
 *
 * @param {String}(required) version
 * @param {String}(optional) locale
 */
const fetchCoreChecksums = async (version, locale) => {
    let response = {},
        params = {
            version,
            locale,
        };

    try {
        const apiVersion = DEFAULT_API_VERSIONS['checksums'];
        const url = `${CORE_CHECKSUMS_API}/${apiVersion}`;

        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api returns error object */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData) {
            throw new Error(_get(response, 'data.error', {}) || {});
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export {
    fetchInfo,
    fetchTranslations,
    fetchStats,
    fetchPluginDownloads,
    fetchCoreVersionInfo,
    fetchCoreCreditDetails,
    fetchCoreChecksums,
};
