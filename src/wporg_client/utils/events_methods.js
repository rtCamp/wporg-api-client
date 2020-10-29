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

    /** If a valid object */
    if ((params && !isObject(params)) || (params && Array.isArray(params))) {
        throw new Error("params should be an object and can't be empty!");
    }

    let isValid = true,
        errors = [];

    for (let property in params) {
        const propertyValue = params[property];

        /** If argument exists */
        if (!(property in event_params)) {
            errors.push(`property ${property} is not supported`);
        }

        /** If type of latitude and longitude is either string or number*/
        if (property === 'latitude' || property === 'longitude') {
            if (doesElementHaveOneOfType(argValue, event_params[property])) {
                errors.push(`${property} type is incorrect, possible types are ${event_params}`);
            }
        } else if (typeof argValue != event_params[property]) {
            /** If argument value data type is correct */
            errors.push(`property ${property} should be ${event_params[property]}, passed ${typeof argValue}`);
        }
    }

    return {
        isValid,
        errors,
    };
};

export { isEventsParamsValid };
