/** Utilities */
import axios from '../utils/axios_instance';
import {
    BASE_URL,
    THEMES_INFO_API,
    THEMES_TRANSLATIONS_API,
} from '../utils/apis';
import {
    THEMES_INFO_VERSION,
    THEMES_TRANSLATIONS_VERSION,
} from '../utils/versions';

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

    console.log(params, 'params');

    try {
        const url = `${THEMES_INFO_API}/${THEMES_INFO_VERSION}?${tagsParam}`;
        console.log(url, 'url');
        response = await axios({
            url,
            params: { ...params },
        });
    } catch (error) {
        console.log(error, 'error');
    }

    return response;
};

const fetchThemesTranslations = async (slug, version) => {
    let response = {},
        params = {
            slug,
            version,
        };

    console.log(params, 'params');

    try {
        response = await axios({
            url: `${THEMES_TRANSLATIONS_API}/${THEMES_TRANSLATIONS_VERSION}`,
            params: { ...params },
        });
    } catch (error) {
        console.log(error, 'error');
    }

    return response;
};

export { fetchThemesInfo, fetchThemesTranslations };
