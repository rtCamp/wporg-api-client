/** External dependencies */
import { isObject } from 'lodash';

/** Utilities */
import { event_params } from '../utils/params';
import { doesElementHaveOneOfType } from '../../utils/generic_functions';

/**
 * Checks validity of events params
 *
 * @param {Object} params*
 *
 * @returns {Object} { isValid: Boolean, errors: Array }
 */

const isEventsParamsValid = (params) => {
    if (!params) {
        throw new Error('params are required');
    }

    // let requiredProperties = country | ip | (latitude & longitude) | ;

    /** Check if a valid object */
    if (!isObject(params) || Array.isArray(params)) {
        throw new Error("params should be an object and can't be empty!");
    }

    let isValid = true,
        errors = [];

    for (let property in params) {
        const propertyValue = params[property];

        /** If property exists */
        if (!(property in event_params)) {
            isValid = false;
            errors.push(`property ${property} doesn't exist`);

            return {
                isValid,
                errors,
            };
        }

        /** If type of latitude and longitude is either string or number*/
        if (property === 'latitude' || property === 'longitude') {
            if (!doesElementHaveOneOfType(propertyValue, event_params[property])) {
                isValid = false;
                errors.push(`${property} type is incorrect, possible types are ${event_params[property]}`);

                return {
                    isValid,
                    errors,
                };
            }
        } else if (typeof propertyValue != event_params[property]) {
            /** If argument value data type is correct */
            isValid = false;
            errors.push(`property ${property} should be ${event_params[property]}, passed ${typeof argValue}`);

            return {
                isValid,
                errors,
            };
        }
    }

    return {
        isValid,
        errors,
    };
};

export { isEventsParamsValid };
