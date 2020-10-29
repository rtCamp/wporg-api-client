/** External dependencies */
import isObject from 'lodash/isObject';

/** Utilities */
import {
    query_themes_params,
    query_themes_filter_params,
    query_plugins_params,
    query_plugin_filter_params,
    browse_values,
} from './arguments';
import { INFO_API_TYPES } from '../../utils/api_types';

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

    /** Check if a valid object */
    if (params) {
        if (!isObject(params) || Array.isArray(params)) {
            isValid = false;
            errors.push('params should be an object');
        }
    }

    let isValid = true,
        errors = [];

    const params_list = type === 'themes' ? query_themes_params : query_plugins_params;

    /** Check each argument and it's type */
    for (let property in params) {
        const propertyValue = params[property];

        /** Check if a property exists */
        if (!(property in params_list)) {
            isValid = false;
            errors.push(`property ${property} doesn't exist`);
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
            }
        } else if (typeof propertyValue != params_list[property]) {
            isValid = false;
            errors.push(`property ${property} should be ${params_list[property]}, passed ${typeof propertyValue}`);
        }

        /** Check if browse filter have correct values passed */
        if (property === 'browse') {
            if (browse_values.indexOf(propertyValue) === -1) {
                isValid = false;
                errors.push(`incorrect value provided for property ${property}, possible values are ${browse_values}`);
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
        errors.push('filter key is required');
    }

    if (!filter_value) {
        errors.push('filter value is required');
    }

    /** Check if supported filter is passed */
    if (!(filter_key in params_list)) {
        errors.push(`filter ${filter_key} is not supported, possible options are ${Object.keys(params_list)}!`);
    }

    /** Check filter value data type */
    if (filter_key === 'tag') {
        if (
            typeof filter_value === 'string' ||
            (Array.isArray(filter_value) && hasCorrectElementTypesInArray(filter_value, 'string'))
        ) {
        } else {
            errors.push('tag should be either string or array of strings!');
        }
    } else if (typeof filter_value != params_list[filter_key]) {
        errors.push(`filter ${filter_key} should be ${params_list[filter_key]}, passed ${typeof filter_value}`);
    }

    /** Check if browse filter have correct values passed */
    if (filter_key === 'browse') {
        if (browse_values.indexOf(filter_value) === -1) {
            errors.push(`incorrect value provided for filter ${filter_key}, possible values are ${browse_values}`);
        }
    }

    /** Check if page type is correct */
    if (page && typeof page !== 'number') {
        errors.push(`page should be number`);
    }

    /** Check if per page type is correct */
    if (per_page && typeof per_page !== 'number') {
        errors.push(`per page should be number`);
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

        paramsObj = {
            ...params,
            [key]: value,
        };
    }

    return paramsObj;
};

/**
 * Concatenate tags from tags array
 *
 * @param {Object} params*
 *
 * @returns {String} concatenated tags
 */
const concatenateTags = (params) => {
    /** Check if params is a valid object */
    if (params) {
        if (!isObject(params) || Array.isArray(params)) {
            throw new Error('params should be object');
        }
    }

    const concatenatedTags = '';

    /** Checking if tag exists in params object amd it's an array, if not an array then
     * 	will be handled like normal arg
     * */
    if ('tag' in params && Array.isArray(params['tag'])) {
        const tags = params['tag'];

        tags.forEach((item) => {
            const tag = `&request[tag]=${item}`;

            concatenatedTags += tag;
        });
    }

    return concatenatedTags;
};

export { isValidType, isInfoListParamsValid, isFilterInfoListParamsValid, createParamsObj, concatenateTags };
