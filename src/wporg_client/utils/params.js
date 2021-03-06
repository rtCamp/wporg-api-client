/**
 * Themes
 */

/** Arguments for query_themes action  */
const query_themes_params = {
    search: 'string',
    tag: ['string', 'array'],
    theme: 'string', //slug of a theme
    author: 'string',
    page: 'number', //default: 1
    per_page: 'number', //default: 24
    browse: 'string', //any one value from browse_values array
    fields: 'object',
};

/** Same as above but have removed page and page_no, as in case of filters they are coming as args
 * not in filters (in method getThemesBy()) */
const query_themes_filter_params = {
    search: 'string',
    tag: ['string', 'array'],
    theme: 'string', //slug of a theme
    author: 'string',
    browse: 'string', //any one value from browse_values array
    fields: 'array',
};

/**
 * Plugins
 */

/** Arguments for query_plugins action  */
const query_plugins_params = {
    search: 'string',
    tag: ['string', 'array'],
    author: 'string',
    page: 'number', //default: 1
    per_page: 'number', //default: 24
    browse: 'string', //any one value from browse_values array
    fields: 'object',
};

/** Same as above but have removed page and page_no, as in case of filters they are coming as args
 * not in filters (in method getThemesBy()) */
const query_plugin_filter_params = {
    search: 'string',
    tag: ['string', 'array'],
    author: 'string',
    browse: 'string', //any one value from browse_values array
    fields: 'array',
};

/**
 * Events
 */
const event_params = {
    number: 'number',
    location: 'string',
    locale: 'string',
    timezone: 'string',
    latitude: ['number', 'string'],
    longitude: ['number', 'string'],
    ip: 'string',
    country: 'string',
};

/**
 * Common
 */

/** Possible values for browse filter in query theme action */
const browse_values = ['popular', 'featured', 'updated', 'new'];

export {
    query_themes_params,
    query_themes_filter_params,
    query_plugins_params,
    query_plugin_filter_params,
    event_params,
    browse_values,
};
