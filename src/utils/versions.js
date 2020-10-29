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

const INFO_API_VERSION = ['1.0', '1.1'];

const TRANSLATION_API_VERSION = ['1.0'];

const STATS_API_VERSION = ['1.0'];

const CORE_VERSION_CHECK_API_VERSION = ['1.6', '1.7'];

const DEFAULT_API_VERSIONS = {
    themes: '1.1',
    plugins: '1.2',
    translations: '1.0',
    stats: '1.0',
    'core-version-check': '1.7',
    credits: '1.1',
    checksums: '1.0',
    events: '1.0',
    'secret-key': '1.1',
    'browse-happy': '1.1',
    importers: '1.1',
    'stable-check': '1.0',
};

export { DEFAULT_API_VERSIONS };
