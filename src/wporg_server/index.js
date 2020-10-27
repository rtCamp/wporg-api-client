/** External dependencies */
import _get from 'lodash/get';

/** Utilities */
import axios from '../utils/axios_instance';
import { INFO_API, TRANSLATIONS_API } from '../utils/apis';
import { defaultApiVersions } from '../utils/versions';
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
            if (type in defaultApiVersions) {
                version = defaultApiVersions[type];
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
        const apiVersion = defaultApiVersions['translations'];
        const url = `${TRANSLATIONS_API}/${type}/${apiVersion}`;

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

export { fetchInfo, fetchTranslations };
