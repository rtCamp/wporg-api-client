/***************************************************************************************
 * Themes Info
 ***************************************************************************************/

/** actions */
const actions = {
    QUERY_THEMES: 'query_themes',
    THEME_INFORMATION: 'theme_information',
    HOT_TAGS: 'hot_tags',
    FEATURE_LIST: 'feature_list',
};

/** query_themes */
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

const query_themes_filters = {
    search: 'string',
    tag: ['string', 'array'],
    theme: 'string', //slug of a theme
    author: 'string',
    browse: 'string', //any one value from browse_values array
    fields: 'array',
};

const browse_values = ['popular', 'featured', 'updated', 'new'];

export { actions, query_themes_args, query_themes_filters, browse_values };
