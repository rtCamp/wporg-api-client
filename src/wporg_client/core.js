/**  Internal dependencies */
import {
    fetchTranslations,
    fetchCoreVersionInfo,
    fetchCoreCreditDetails,
    fetchCoreChecksums,
    fetchBrowserInfo,
    fetchCoreVersionStabilityInfo,
    fetchStats,
} from '../wporg_server/';

/** Utilities */
import {
    TRANSLATIONS_API,
    CORE_VERSION_CHECK_API,
    CORE_STABLE_CHECK_API,
    CORE_CREDITS_API,
    CORE_CHECKSUMS_API,
    CORE_BROWSE_HAPPY_API,
    STATS_API,
} from '../utils/apis';
import { TRANSLATION_API_TYPES, STATS_API_TYPES } from '../utils/api_types';
import { API_VERSIONS, WORDPRESS_VERSIONS, DEFAULT_API_VERSIONS } from '../utils/versions';
import { isValidVersion } from '../utils/generic_functions';

/** These types are maintained in  constants file  */
const translationType = TRANSLATION_API_TYPES && Array.isArray(TRANSLATION_API_TYPES) && TRANSLATION_API_TYPES[2];

/**
 * Get wordpress translations
 *
 * @param {String} wp_version - version number starts from 4.0, fallbacks to the latest version of not passed
 * @param {String} api_version
 */
const getCoreTranslations = (wp_version, api_version) => {
    if (!isValidVersion(wp_version, WORDPRESS_VERSIONS)) {
        throw new Error('invalid wordpress version');
    }

    const params = {
        version: wp_version,
    };

    if (!isValidVersion(api_version, API_VERSIONS['translation_api'])) {
        api_version = DEFAULT_API_VERSIONS['translations'];
    }

    const url = `${TRANSLATIONS_API}/${translationType}/${api_version}`;

    return fetchTranslations(url, params);
};

/**
 * Get wordpress version info
 *
 * @param {String} wp_version - To fetch version details released after given version
 * @param {String} locale - Locale
 * @param {String} api_version
 */
const getCoreVersionInfo = (wp_version, locale, api_version) => {
    if (wp_version && !isValidVersion(wp_version, WORDPRESS_VERSIONS)) {
        throw new Error('invalid wordpress version');
    }

    if (locale && typeof locale !== 'string') {
        throw new Error('locale should be string');
    }

    const params = {
        version: wp_version,
        locale,
    };

    if (!isValidVersion(api_version, API_VERSIONS['core_version_check_api'])) {
        api_version = DEFAULT_API_VERSIONS['core-version-check'];
    }

    const url = `${CORE_VERSION_CHECK_API}/${api_version}`;

    return fetchCoreVersionInfo(url, params);
};

/**
 * Fetch details of individual contributors in wordpress codebase
 *
 * @param {String} wp_version
 * @param {String} locale
 * @param {String} api_version
 */
const getCoreCreditDetails = (wp_version, locale, api_version) => {
    if (wp_version && !isValidVersion(wp_version, WORDPRESS_VERSIONS)) {
        throw new Error('invalid wordpress version');
    }

    if (locale && typeof locale !== 'string') {
        throw new Error('locale should be string');
    }

    const params = {
        version: wp_version,
        locale,
    };

    if (!isValidVersion(api_version, API_VERSIONS['core_credits_api'])) {
        api_version = DEFAULT_API_VERSIONS['core-credits'];
    }

    const url = `${CORE_CREDITS_API}/${api_version}`;

    return fetchCoreCreditDetails(url, params);
};

/**
 * Returns a JSON encoded array of file MD5 checksums for a given WordPress
 * release / locale. Although english is the default, it's suggested to pass
 * it for 100% compatibility with core.
 *
 * @param {String} wp_version*
 * @param {String} locale
 * @param {String} api_version
 */
const getCoreChecksums = (wp_version, locale, api_version) => {
    if (!wp_version) {
        throw new Error('wordpress version is required');
    }

    if (!isValidVersion(wp_version, WORDPRESS_VERSIONS)) {
        throw new Error('invalid wordpress version');
    }

    if (locale && typeof locale !== 'string') {
        throw new Error('locale should be string');
    }

    const params = {
        version: wp_version,
        locale,
    };

    if (!isValidVersion(api_version, API_VERSIONS['core_checksums_api'])) {
        api_version = DEFAULT_API_VERSIONS['core-checksums'];
    }

    const url = `${CORE_CHECKSUMS_API}/${api_version}`;

    return fetchCoreChecksums(url, params);
};

/**
 * Fetch browser details
 *
 * @param {String} useragent*
 * @param {String} api_version
 */
const getBrowserInfo = (useragent, api_version) => {
    if (!useragent) {
        throw new Error('useragent is required');
    }

    if (typeof useragent !== 'string') {
        throw new Error('useragent should be string');
    }

    const params = {
        useragent,
    };

    if (!isValidVersion(api_version, API_VERSIONS['core_browse_happy_api'])) {
        api_version = DEFAULT_API_VERSIONS['core-browse-happy'];
    }

    const url = `${CORE_BROWSE_HAPPY_API}/${api_version}`;

    return fetchBrowserInfo(url, params);
};

/**
 * Get wordpress versions stability info
 *
 * @param {String} wp_version
 * @param {String} api_version
 */
const getCoreVersionStabilityInfo = (wp_version, api_version) => {
    if (wp_version && isValidVersion(wp_version, WORDPRESS_VERSIONS)) {
        throw new Error('invalid wordpress version');
    }

    if (!isValidVersion(api_version, API_VERSIONS['core_stable_check_api'])) {
        api_version = DEFAULT_API_VERSIONS['core-stable-check'];
    }

    const url = `${CORE_STABLE_CHECK_API}/${api_version}`;

    return fetchCoreVersionStabilityInfo(url, wp_version);
};

/**
 * Get wordpress stats
 *
 * @param {String} api_version
 */
const getCoreStats = (api_version) => {
    if (!isValidVersion(api_version, API_VERSIONS['stats_api'])) {
        api_version = DEFAULT_API_VERSIONS['stats'];
    }

    const type = STATS_API_TYPES[0]; //it should be wordpress
    const url = `${STATS_API}/${type}/${api_version}`;

    return fetchStats(url);
};

export {
    getCoreTranslations,
    getCoreVersionInfo,
    getCoreCreditDetails,
    getCoreChecksums,
    getBrowserInfo,
    getCoreVersionStabilityInfo,
    getCoreStats,
};
