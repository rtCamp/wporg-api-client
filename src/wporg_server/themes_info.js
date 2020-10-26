/** External dependencies */
import _get from 'lodash/get';

/** Utilities */
import axios from '../utils/axios_instance';
import { THEMES_INFO_API, THEMES_TRANSLATIONS_API } from '../utils/apis';
import {
    THEMES_INFO_VERSION,
    THEMES_TRANSLATIONS_VERSION,
} from '../utils/versions';

/**
 * Fetch themes info
 * @param {String}(required) action
 * @param {Object}(optional) args
 */
const fetchThemesInfo = async (action, args) => {
    let response = {},
        params = {
            action,
        };

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
     *
     * */
    let tagsParam = '';
    /** We are checking if tag exists in args object and it is an array, if not an array
     * then will be handled like normal arg in for loop */
    if ('tag' in args && Array.isArray(args['tag'])) {
        const tags = args['tag'];
        tags.forEach((tag) => {
            const tagString = `&request[tag]=${tag}`;
            tagsParam += tagString;
        });
    }

    try {
        const url = `${THEMES_INFO_API}/${THEMES_INFO_VERSION}?${tagsParam}`;
        response = await axios({
            url,
            params: { ...params },
        });

        if ('error' in _get(response, 'data', {})) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

/**
 * Fetch theme translations
 * @param {String}(optional) slug
 * @param {String}(optional) version
 */
const fetchThemesTranslations = async (slug, version) => {
    let response = {},
        params = {
            slug,
            version,
        };

    try {
        response = await axios({
            url: `${THEMES_TRANSLATIONS_API}/${THEMES_TRANSLATIONS_VERSION}`,
            params: { ...params },
        });

        if ('error' in _get(response, 'data', {})) {
            throw new Error(_get(response, 'data.error', {}));
        }
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export { fetchThemesInfo, fetchThemesTranslations };
