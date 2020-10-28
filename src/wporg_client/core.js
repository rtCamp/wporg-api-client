/**  Internal dependencies */
import { fetchTranslations, fetchCoreVersionInfo } from '../wporg_server/';

import { translationTypes } from '../utils/api_types';

/** These types are maintained in  constants file  */
const translationType =
    translationTypes && Array.isArray(translationTypes) && translationTypes[2];

/**
 * Get wordpress translations
 *
 * @param {String} version(optional) - Plugin version, fallbacks to the latest version of not passed
 */
const getCoreTranslations = async (version) => {
    let response;

    try {
        /** Core is by default in the API so that's why we have passed  null as slug in the
         * 2nd arg
         */
        response = await fetchTranslations(translationType, null, version);
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Get wordpress version info
 *
 * @param {String}(optional) version - To fetch versions released after given version
 * @param {String}(optional) locale - Locale
 */
const getCoreVersionInfo = async (version, locale) => {
    if (
        (version && typeof version !== 'string') ||
        (locale && typeof locale !== 'string')
    ) {
        throw new Error('version and locale should be in string');
    }

    let response;

    try {
        response = await fetchCoreVersionInfo(version, locale);
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export { getCoreTranslations, getCoreVersionInfo };
