/** External dependencies */
import isObject from 'lodash/isObject';

/**  Internal dependencies */
import { fetchEventDetails } from '../wporg_server/';

/** Utilities */
import { event_args } from './utils/arguments';
import { doesElementHaveOneOfType } from '../utils/generic_functions';

/**
 * Upcoming WordCamps and meetup events, filterable by location.
 *
 * @param {Object}(required) args - List of arguments
 */
const getEventDetails = async (args) => {
    if (!args) {
        throw new Error('Please pass arguments');
    }

    /** If not a valid object */
    if ((args && !isObject(args)) || (args && Array.isArray(args))) {
        throw new Error("Arguments should be an object and can't be empty!");
    }

    for (let arg in args) {
        let argValue = args[arg];

        /** If unsupported argument is passed */
        if (!(arg in event_args)) {
            throw new Error(`Argument ${arg} is not supported`);
        }

        if (arg === 'latitude' || arg === 'longitude') {
            if (doesElementHaveOneOfType(argValue, event_args[arg])) {
                throw new Error(
                    `${arg} type is incorrect, possible types are ${event_args}`,
                );
            }
        } else if (typeof argValue != event_args[arg]) {
            /** If argument value data type is incorrect */
            throw new Error(
                `Argument ${arg} should be ${
                    event_args[arg]
                }, passed ${typeof argValue}`,
            );
        }
    }

    let response;

    try {
        response = await fetchEventDetails(args);
    } catch (error) {
        const { message } = error || {};
        throw new Error(message);
    }

    return response;
};

export { getEventDetails };
