/**  Internal dependencies */
import { fetchEventDetails } from '../wporg_server/';

/** Utilities */
import { isEventsParamsValid } from './utils/events_methods';
import { isValidVersion } from '../utils/generic_functions';
import { API_VERSIONS, DEFAULT_API_VERSIONS } from '../utils/versions';
import { EVENTS_API } from '../utils/apis';

/**
 * Upcoming WordCamps and meetup, filterable by location.
 *
 * @param {Object} params* - List of filters, possible values are listed in
 * utils => themes_info => params => event_params
 * @param {String} api_version
 */
const getEventDetails = (params, api_version) => {
    const { isValid, errors } = isEventsParamsValid(params);

    if (!isValid) {
        throw new Error(errors);
    }

    let updatedParams = {};

    /**  Add params from params object */
    for (let property in params) {
        let value = params[property];

        updatedParams = {
            ...updatedParams,
            [property]: value,
        };
    }

    if (!isValidVersion(api_version, API_VERSIONS['event_api'])) {
        api_version = DEFAULT_API_VERSIONS['events'];
    }

    const url = `${EVENTS_API}/${api_version}`;

    /** The date and end_date fields in the response are in the event's local
     * timezone, not UTC. */

    return fetchEventDetails(url, updatedParams);
};

export { getEventDetails };
