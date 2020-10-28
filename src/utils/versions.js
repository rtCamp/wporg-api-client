/**
 * Themes
 */

/**
 * Available versions:
 * 1.0 - Returns content in PHP serialized form
 * 1.1 - Returns content in JSON object
 */

/**
 * Plugins
 */

/**
 * Available versions:
 * 1.0 - Returns content in PHP serialized form
 * 1.1 - Returns content in JSON object
 * 1.2 - Returns content in JSON object and only accepts GET requests
 */

const DEFAULT_API_VERSIONS = {
    themes: '1.1',
    plugins: '1.2',
    translations: '1.0',
    stats: '1.0',
    'version-check': '1.7',
};

export { DEFAULT_API_VERSIONS };
