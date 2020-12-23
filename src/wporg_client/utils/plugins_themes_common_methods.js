/** External dependencies */
import isObject from 'lodash/isObject';

/** Utilities */
import {
    query_themes_params,
    query_themes_filter_params,
    query_plugins_params,
    query_plugin_filter_params,
    browse_values,
} from './params';
import { INFO_API_TYPES } from '../../utils/api_types';
import { hasCorrectElementTypesInArray } from '../../utils/generic_functions';

/**
 * Checks if type is correct or not

 * @param {String} type*
 *
 * @returns {Boolean} Returns true if type exists in INFO_API_TYPES array
 */
const isValidType = (type) => {
    if (INFO_API_TYPES.indexOf(type) !== -1) {
        return true;
    }

    return false;
};

/**
 * Checks validity of plugins/themes info list params
 *
 * @param {Object} params*
 * @param {String} type* - plugins | themes
 *
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
const isInfoListParamsValid = (params, type) => {
    if (!isValidType(type)) {
        throw new Error('type is required');
    }

    if (!params) {
        throw new Error('params are required');
    }

    let isValid = true,
        errors = [];

    const params_list = type === 'themes' ? query_themes_params : query_plugins_params;

    /** Check if a valid object */
    if (params) {
        if (!isObject(params) || Array.isArray(params)) {
            isValid = false;
            errors.push('params should be an object');

            return {
                isValid,
                errors,
            };
        }
    }

    /** Check each argument and it's type */
    for (let property in params) {
        const propertyValue = params[property];

        /** Check if a property exists */
        if (!(property in params_list)) {
            isValid = false;
            errors.push(`property ${property} doesn't exist`);

            return {
                isValid,
                errors,
            };
        }

        /** Check property value data type */
        if (property === 'tag') {
            if (
                typeof propertyValue === 'string' ||
                (Array.isArray(propertyValue) && hasCorrectElementTypesInArray(propertyValue, 'string'))
            ) {
            } else {
                isValid = false;
                errors.push('property tag should be either string or array of strings');

                return {
                    isValid,
                    errors,
                };
            }
        } else if (typeof propertyValue != params_list[property]) {
            isValid = false;

            const propertyType = property in params_list ? params_list[property] : undefined;
            const message = propertyType
                ? `property ${property} should be ${propertyType}, passed ${typeof propertyValue}`
                : `invalid property ${property}`;

            errors.push(message);

            return {
                isValid,
                errors,
            };
        }

        /** Check if browse filter have correct values passed */
        if (property === 'browse') {
            if (browse_values.indexOf(propertyValue) === -1) {
                isValid = false;
                errors.push(`incorrect value provided for property ${property}, possible values are ${browse_values}`);

                return {
                    isValid,
                    errors,
                };
            }
        }
    }

    return {
        isValid,
        errors,
    };
};

/**
 * Check if filter info list params are valid
 *
 * @param {String} filter_key*
 * @param {String} filter_key*
 * @param {Number} page
 * @param {Number} per_page
 * @param {String} type* - plugins | themes
 *
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
const isFilterInfoListParamsValid = (filter_key, filter_value, page, per_page, type) => {
    if (!isValidType(type)) {
        throw new Error('type is required');
    }

    let isValid = true,
        errors = [];

    const params_list = type === 'themes' ? query_themes_filter_params : query_plugin_filter_params;

    /** Check if filter key and filter value is passed */
    if (!filter_key) {
        isValid = false;
        errors.push('filter key is required');

        return {
            isValid,
            errors,
        };
    }

    if (!filter_value) {
        isValid = false;
        errors.push('filter value is required');

        return {
            isValid,
            errors,
        };
    }

    /** Check if supported filter is passed */
    if (!(filter_key in params_list)) {
        isValid = false;
        errors.push(`filter ${filter_key} is not supported, possible options are ${Object.keys(params_list)}`);

        return {
            isValid,
            errors,
        };
    }

    /** Check filter value data type */
    if (filter_key === 'tag') {
        if (
            typeof filter_value === 'string' ||
            (Array.isArray(filter_value) && hasCorrectElementTypesInArray(filter_value, 'string'))
        ) {
        } else {
            isValid = false;
            errors.push('tag should be either string or array of strings');

            return {
                isValid,
                errors,
            };
        }
    } else if (typeof filter_value != params_list[filter_key]) {
        isValid = false;
        errors.push(
            `filter value of ${filter_key} should be ${params_list[filter_key]}, passed ${typeof filter_value}`,
        );

        return {
            isValid,
            errors,
        };
    }

    /** Check if browse filter have correct values passed */
    if (filter_key === 'browse') {
        if (browse_values.indexOf(filter_value) === -1) {
            isValid = false;
            errors.push(`incorrect value provided for filter ${filter_key}, possible values are ${browse_values}`);

            return {
                isValid,
                errors,
            };
        }
    }

    /** Check if page type is correct */
    if (page && typeof page !== 'number') {
        isValid = false;
        errors.push(`page should be number`);

        return {
            isValid,
            errors,
        };
    }

    /** Check if per page type is correct */
    if (per_page && typeof per_page !== 'number') {
        isValid = false;
        errors.push(`per page should be number`);

        return {
            isValid,
            errors,
        };
    }

    return {
        isValid,
        errors,
    };
};

/**
 * Create params object from arguments
 *
 * @param {Object} params
 *
 * @returns {Object} params object
 */
const createParamsObj = (params) => {
    /** Check if params is a valid object */
    if (params) {
        if (!isObject(params) || Array.isArray(params)) {
            throw new Error('params should be object');
        }
    }

    let paramsObj = {};

    for (let property in params) {
        /** Tag is handled separately in case of array  */
        if (property === 'tag' && Array.isArray(params[property])) {
            continue;
        }

        let key = `request[${property}]`;
        let value = params[property];

        if ( 'object' === typeof value ) {
            for ( let index in value ) {
                let subKey = key + `[${ index }]`;
                paramsObj = {
                    ...paramsObj,
                    [ subKey ]: value[ index ],
                };
            }
        } else {
            paramsObj = {
                ...paramsObj,
                [ key ]: value,
            };
        }
    }

    return paramsObj;
};

/**
 * Concatenate tags from tags array
 *
 * @param {Array} tag_array*
 *
 * @returns {String} concatenated tags
 */
const concatenateTags = (tag_array) => {
    /** Check if tag_array is a valid array */
    if (tag_array && !Array.isArray(tag_array)) {
        throw new Error("tag_array should be array and can't be empty");
    }

    let concatenatedTags = '';

    tag_array.forEach((item) => {
        const tag = `&request[tag]=${item}`;

        concatenatedTags += tag;
    });

    return concatenatedTags;
};

export { isValidType, isInfoListParamsValid, isFilterInfoListParamsValid, createParamsObj, concatenateTags };
