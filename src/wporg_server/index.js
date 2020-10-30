/** External dependencies */
import _get from 'lodash/get';

/** Utilities */
import axios from '../utils/axios_instance';
import { SECRET_KEY_API, SALT_API, CORE_POPULAR_IMPORT_PLUGINS_API } from '../utils/apis';
import { API_VERSIONS, DEFAULT_API_VERSIONS } from '../utils/versions';
import { isValidVersion } from '../utils/generic_functions';

/**
 * Fetch themes or plugins info
 *
 * @param {String} url
 * @param {Object} params
 */
const fetchInfo = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });

        const responseData = _get(response, 'data', {}) || {};

        /** Throw error if api contains error object */
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
 * Fetch available translations
 *
 * @param {String} url
 * @param {Object} params
 */
const fetchTranslations = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });

        /** Throw error if api contains error object */
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
 * @param {String} url
 * @param {Object} params
 */
const fetchCoreVersionInfo = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });

        /** Throw error if api contains error object */
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
 * @param {String} url
 * @param {Object} params
 */
const fetchCoreCreditDetails = async (url, params) => {
    /** @todo check wordpress version */
    let response = {};

    try {
        response = await axios({
            url,
            params: { ...params },
        });

        /** Throw error if api contains error object */
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
 * @param {String} url
 * @param {Object} params
 */
const fetchCoreChecksums = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });

        /** Throw error if api contains error object */
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
 * Fetch browser details
 *
 * @param {String} url
 * @param {Object} params
 */
const fetchBrowserInfo = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * List of popular import plugins in the WordPress Plugin Directory used by
 * Tools → Import Screen.
 *
 * @param {String} api_version
 */
const fetchPopularImportPlugins = async (api_version) => {
    let response = {};

    try {
        if (!isValidVersion(api_version, API_VERSIONS['core_popular_import_plugins_api'])) {
            api_version = DEFAULT_API_VERSIONS['core-importers'];
        }

        const url = `${CORE_POPULAR_IMPORT_PLUGINS_API}/${api_version}`;

        response = await axios({
            url,
        });
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Check if a version of WordPress is latest, outdated, or insecure
 *
 * @param {String} url
 * @param {String} wp_version - Wordpress version
 */
const fetchCoreVersionStabilityInfo = async (url, wp_version) => {
    let response = {};

    try {
        const apiResponse = await axios({
            url,
        });

        /** If version is provided, pass that version info */
        if (wp_version) {
            const data = _get(apiResponse, 'data', {}) || {};

            if (!(wp_version in data)) {
                throw new Error(`version ${wp_version} doesn't exist`);
            }

            response = { data: data[wp_version] };
        } else {
            /** If version is not provided pass all versions info */
            response = { ...apiResponse };
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Upcoming WordCamps and meetup events, filterable by location.
 *
 * @param {String} url
 * @param {Object} params
 */
const fetchEventDetails = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });

        /** Throw error if api contains error object
         * Checked for truthy value of error because unlike other cases here we are
         * getting an error key with 'null'
         */
        const responseData = _get(response, 'data', {}) || {};

        if ('error' in responseData && responseData['error']) {
            throw new Error(_get(response, 'data.error', {}) || {});
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
 * @param {String} url
 */
const fetchStats = async (url) => {
    let response = {};

    try {
        response = await axios({
            url,
        });

        /** Throw error if api contains error object */
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
 * @param {String} url
 * @param {Object} params
 */
const fetchPluginDownloads = async (url, params) => {
    let response = {};

    try {
        response = await axios({
            url,
            params,
        });

        /** Throw error if api contains error object */
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
 * Secret key generator for wp-config.php
 *
 * @param {String} api_version
 */
const generateSecretKey = async (api_version) => {
    let response = {};

    try {
        if (!isValidVersion(api_version, API_VERSIONS['secret_key_api'])) {
            api_version = DEFAULT_API_VERSIONS['secret-key'];
        }

        const url = `${SECRET_KEY_API}/${api_version}${SALT_API}`;

        response = await axios({
            url,
        });
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export {
    fetchInfo,
    fetchTranslations,
    fetchCoreVersionInfo,
    fetchCoreCreditDetails,
    fetchCoreChecksums,
    fetchBrowserInfo,
    fetchPopularImportPlugins,
    fetchCoreVersionStabilityInfo,
    fetchEventDetails,
    fetchStats,
    fetchPluginDownloads,
    generateSecretKey,
};
