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
const getEventDetails = (args) => {
    if (!args) {
        throw new Error('Please pass arguments');
    }

    /** If a valid object */
    if ((args && !isObject(args)) || (args && Array.isArray(args))) {
        throw new Error("arguments should be an object and can't be empty!");
    }

    for (let arg in args) {
        let argValue = args[arg];

        /** If argument exists */
        if (!(arg in event_args)) {
            throw new Error(`argument ${arg} is not supported`);
        }

        /** If type of latitude and longitude is either string or number*/
        if (arg === 'latitude' || arg === 'longitude') {
            if (doesElementHaveOneOfType(argValue, event_args[arg])) {
                throw new Error(
                    `${arg} type is incorrect, possible types are ${event_args}`,
                );
            }
        } else if (typeof argValue != event_args[arg]) {
            /** If argument value data type is correct */
            throw new Error(
                `argument ${arg} should be ${
                    event_args[arg]
                }, passed ${typeof argValue}`,
            );
        }
    }

    /** The date and end_date fields in the response are in the event's local
     * timezone, not UTC. */
    return fetchEventDetails(args);
};

export { getEventDetails };
