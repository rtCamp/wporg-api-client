/**
 * Note: When change the element indexes please make the changes in the corresponding
 * components
 */

/** Types available for /info api, for eg: /themes/info */
const INFO_API_TYPES = ['themes', 'plugins'];

/** Types available for translations api, for eg: /translations/plugins */
const TRANSLATION_API_TYPES = ['themes', 'plugins', 'core'];

/** Types available for stats api, for eg: /stats/wordpress */
/** plugins is not added because it is passed directly in the getPluginStats method */
const STATS_API_TYPES = ['wordpress', 'php', 'mysql'];

/** Kept this separate from STATS_API_TYPES because plugin type is used only in plugin file */
const STATS_API_TYPES_FOR_PLUGIN = 'plugin';

export { INFO_API_TYPES, TRANSLATION_API_TYPES, STATS_API_TYPES, STATS_API_TYPES_FOR_PLUGIN };
