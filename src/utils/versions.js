/**
 * Themes
 */

/**
 * Available versions:
 * 1.0 - Returns content in PHP serialized form
 * 1.1 - Returns content in JSON object
 */
const THEMES_INFO_VERSION = '1.1';
const THEMES_TRANSLATIONS_VERSION = '1.0';

const defaultApiVersions = {
    themes: '1.1',
    plugins: '1.2',
};

/**
 * Plugins
 */

/**
 * Available versions:
 * 1.0 - Returns content in PHP serialized form
 * 1.1 - Returns content in JSON object
 * 1.2 - Returns content in JSON object and only accepts GET requests
 */

const PLUGINS_INFO_VERSION = '1.2';

export {
    defaultApiVersions,
    THEMES_INFO_VERSION,
    THEMES_TRANSLATIONS_VERSION,
    PLUGINS_INFO_VERSION,
};
