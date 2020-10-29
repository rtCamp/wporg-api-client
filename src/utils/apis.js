/**
 * BASE_URL
 */
const BASE_URL = 'https://api.wordpress.org';

/**
 * Themes and Plugins info API
 * */
const INFO_API = '/info';

/**
 * Translations API
 * */
const TRANSLATIONS_API = '/translations';

/**
 * Core API
 * */
const CORE_VERSION_CHECK_API = '/core/version-check';

const CORE_CREDITS_API = '/core/credits';

const CORE_CHECKSUMS_API = '/core/checksums';

const CORE_BROWSE_HAPPY_API = '/core/browse-happy';

const CORE_POPULAR_IMPORT_PLUGINS_API = '/core/importers';

const CORE_STABLE_CHECK_API = '/core/stable-check';

/**
 * Events API */
const EVENTS_API = '/events';

/**
 * Others
 * */
const STATS_API = '/stats';

/** Use with STATS_API */
const PLUGIN_DOWNLOADS_API = '/downloads.php';

const SECRET_KEY_API = '/secret-key';

/** Use with SECRET_KEY_API */
const SALT_API = '/salt';

export {
    BASE_URL,
    INFO_API,
    TRANSLATIONS_API,
    CORE_VERSION_CHECK_API,
    CORE_CREDITS_API,
    CORE_CHECKSUMS_API,
    CORE_BROWSE_HAPPY_API,
    CORE_POPULAR_IMPORT_PLUGINS_API,
    CORE_STABLE_CHECK_API,
    EVENTS_API,
    STATS_API,
    PLUGIN_DOWNLOADS_API,
    SECRET_KEY_API,
    SALT_API,
};
