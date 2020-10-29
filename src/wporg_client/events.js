/** External dependencies */
import isObject from 'lodash/isObject';

/**  Internal dependencies */
import { fetchEventDetails } from '../wporg_server/';

/** Utilities */
import { isEventsParamsValid } from './utils/events_methods';
import { event_params } from './utils/arguments';
import { doesElementHaveOneOfType } from '../utils/generic_functions';

/**
 * Upcoming WordCamps and meetup events, filterable by location.
 *
 * @param {Object}* args - List of arguments (List can be found here:- event_params)
 * @param {String} api_version
 */
const getEventDetails = (args, api_version) => {
    const { isValid, errors } = isEventsParamsValid(args);

    if (!isValid) {
        throw new Error(errors);
    }

    let params = {};

    /**  Add params from args object */
    for (let arg in args) {
        let value = args[arg];

        params = {
            ...params,
            [arg]: value,
        };
    }

    if (!isValidVersion(api_version, API_VERSIONS['EVENTS_API'])) {
        api_version = DEFAULT_API_VERSIONS['events'];
    }

    const url = `${EVENTS_API}/${api_version}`;

    /** The date and end_date fields in the response are in the event's local
     * timezone, not UTC. */
    return fetchEventDetails(url, params);
};

export { getEventDetails };
