/** Types available for /info api, for eg: /themes/info
 * When change the element indexes please make the changes in the corresponding components,for eg:
 * wporg_client => plugins | themes => infoType
 */
const infoTypes = ['themes', 'plugins'];

/** Types available for translations api, for eg: /translations/plugins
 * When change the element indexes please make the changes in the corresponding components,for eg:
 * wporg_client => plugins | themes => translationType
 */
const translationTypes = ['themes', 'plugins', 'core'];

export { infoTypes, translationTypes };
