/**  Internal dependencies */
import {
    fetchTranslations,
    fetchCoreVersionInfo,
    fetchCoreCreditDetails,
    fetchCoreChecksums,
    fetchBrowserInfo,
} from '../wporg_server/';

import { TRANSLATION_API_TYPES } from '../utils/api_types';

/** These types are maintained in  constants file  */
const translationType =
    TRANSLATION_API_TYPES &&
    Array.isArray(TRANSLATION_API_TYPES) &&
    TRANSLATION_API_TYPES[2];

/**
 * Get wordpress translations
 *
 * @param {String} version(optional) - Plugin version, fallbacks to the latest version of not passed
 */
const getCoreTranslations = (version) => {
    /** Core is by default in the API so that's why we have passed  null as slug in the 2nd arg */
    return fetchTranslations(translationType, null, version);
};

/**
 * Get wordpress version info
 *
 * @param {String}(optional) version - To fetch versions released after given version
 * @param {String}(optional) locale - Locale
 */
const getCoreVersionInfo = (version, locale) => {
    if (
        (version && typeof version !== 'string') ||
        (locale && typeof locale !== 'string')
    ) {
        throw new Error('version and locale should be in string');
    }

    return fetchCoreVersionInfo(version, locale);
};

/**
 * Fetch details of individual contributors in wordpress codebase
 *
 * @param {String}(optional) version
 * @param {String}(optional) locale
 */
const getCoreCreditDetails = (version, locale) => {
    if (
        (version && typeof version !== 'string') ||
        (locale && typeof locale !== 'string')
    ) {
        throw new Error('version and locale should be in string');
    }

    return fetchCoreCreditDetails(version, locale);
};

/**
 * Returns a JSON encoded array of file MD5 checksums for a given WordPress
 * release / locale. Although english is the default, it's suggested to pass
 * it for 100% compatibility with core.
 *
 * @param {String}(required) version
 * @param {String}(optional) locale
 */
const getCoreChecksums = (version, locale) => {
    if (!version) {
        throw new Error('version is required');
    }

    if (
        (version && typeof version !== 'string') ||
        (locale && typeof locale !== 'string')
    ) {
        throw new Error('version and locale should be in string');
    }

    return fetchCoreChecksums(version, locale);
};

/**
 * Fetch browser details
 *
 * @param {String} useragent
 */
const getBrowserInfo = (useragent) => {
    if (!useragent || typeof useragent !== 'string') {
        throw new Error('useragent is required and should be string');
    }

    return fetchBrowserInfo(useragent);
};

export {
    getCoreTranslations,
    getCoreVersionInfo,
    getCoreCreditDetails,
    getCoreChecksums,
    getBrowserInfo,
};
