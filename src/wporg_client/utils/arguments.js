/**
 * Themes
 */

/** Arguments for query_themes action  */
const query_themes_args = {
    search: 'string',
    tag: ['string', 'array'],
    theme: 'string', //slug of a theme
    author: 'string',
    page: 'number', //default: 1
    per_page: 'number', //default: 24
    browse: 'string', //any one value from browse_values array
    fields: 'array',
};

/** Same as above but have removed page and page_no, as in case of filters they are coming as args
 * not in filters (in method getThemesBy()) */
const query_themes_filters = {
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
const query_plugins_args = {
    search: 'string',
    tag: ['string', 'array'],
    author: 'string',
    page: 'number', //default: 1
    per_page: 'number', //default: 24
    browse: 'string', //any one value from browse_values array
    fields: 'array',
};

/** Same as above but have removed page and page_no, as in case of filters they are coming as args
 * not in filters (in method getThemesBy()) */
const query_plugin_filters = {
    search: 'string',
    tag: ['string', 'array'],
    author: 'string',
    browse: 'string', //any one value from browse_values array
    fields: 'array',
};

/**
 * Common
 */

/** Possible values for browse filter in query theme action */
const browse_values = ['popular', 'featured', 'updated', 'new'];

export {
    query_themes_args,
    query_themes_filters,
    query_plugins_args,
    query_plugin_filters,
    browse_values,
};
