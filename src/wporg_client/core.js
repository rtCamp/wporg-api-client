/**  Internal dependencies */
import { fetchTranslations } from '../wporg_server/';

import { translationTypes } from '../utils/constants';

/** These types are maintained in  constants file  */
const translationType =
    translationTypes && Array.isArray(translationTypes) && translationTypes[2];

/**
 * Get core translations
 *
 * @param {String} version(optional) - Plugin version, fallbacks to the latest version of not passed
 */
const getCoreTranslations = async (version) => {
    let response;

    try {
        response = await fetchTranslations(translationType, null, version);
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export { getCoreTranslations };
