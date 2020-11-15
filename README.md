# WpOrg: Node.js Client
### WordPress.org Client Library for Node.js

# Installation
	npm i wporg-api-client

Note: add `--save` if you are using npm < 5.0.0

This library exposes methods for all the APIs listed here: https://codex.wordpress.org/WordPress.org_API

# Examples

### Fetch All Plugins List

```javascript

const { getPluginsList } = require("wporg-api-client");

const fetchPluginsList = async () => {
	let pluginsList = {};

	try {
		pluginsList = await getPluginsList();
		console.log(pluginsList, "pluginsList");
	} catch (error) {
		console.log(error.message, "error");
	}
};

fetchPluginsList();
```
### Get Plugin Downloads Count

```javascript

const { getPluginDownloads } = require("wporg-api-client")

const fetchPluginDownloads = async (plugin_slug) => {
	let downloadsCount = 0;

	try {
		const apiResponse = await getPluginDownloads(plugin_slug);

		downloadsCount = apiResponse.data

		console.log(downloadsCount, "downloadsCount");
	} catch (error) {
		console.log(error.message, "error");
	}
}

fetchPluginDownloads("contact-form-7")

```

Table of contents:

* <a href="#core">Core</a>
* <a href="#plugins">Plugins</a>
* <a href="#themes">Themes</a>
* <a href="#others">Others</a>

Note: Params marked with asterisk(*) are required.

# <h1 id="core">Core</h1>

* ## Get Core Translation

   Available API versions: 1.0

	```javascript
	getCoreTranslations(wp_version, api_version)
	```

	Note: wp_version starts from 4.0

	### Usage

	```javascript
	getCoreTranslations('4.9.5')
	```

* ## Get Core Version Info

	Available API versions: 1.7

	```javascript
	getCoreVersionInfo(wp_version, locale, api_version)
	```

	### Usage

	```javascript
	getCoreVersionInfo('4.0.1', 'eu')
	```

* ## Get Core Credit Details

	Available API versions: 1.1

	```javascript
	getCoreCreditDetails(wp_version, locale, api_version)
	```

	### Usage

	```javascript
	getCoreCreditDetails('4.0.1', 'eu')
	```

* ## Get Core Checksums

	Available API versions: 1.0

	```javascript
	getCoreChecksums(wp_version*, locale, api_version)
	```

	###	Usage

	```javascript
	getCoreChecksums('5.5.1', 'eu')
	```

* ## Get Browser Info

	Available API versions: 1.1

	```javascript
	getBrowserInfo(useragent*)
	```

	###	Usage

	```javascript
	getBrowserInfo('Chrome/86.0')
	```

* ## Get Core Version Stability Info

	Available API versions: 1.0

	```javascript
	getCoreVersionStabilityInfo(wp_version, api_version)
	```

	###	Usage

	```javascript
	getCoreVersionStabilityInfo() //returns all versions info


	getCoreVersionStabilityInfo('4.6.20')	//returns specific version info
	```

* ## Get Core Statistics

	Available API versions: 1.0

	```javascript
	getCoreStats(api_version)
	```

	###	Usage

	```javascript
	getCoreStats()
	```

# <h1 id="plugins">Plugins</h1>

* ### **Filters list**

  * search(string): Textual search, using a free-form string

  * tag('string' | 'array'): Return themes with a specified tag or set of tags(array of strings)

  * author(string):	WordPress.org username of the author, pass this filter to return plugins authored by them

  * page(number): page number
default: 1

  * per_page(number): Plugins to show per page
default: 24

  * browse(string): Predefined themes ordering. Possible values are

	*	popular: Plugins ordered by popularity
	*	featured: Set of featured plugins
	*	updated: Recently updated plugins
	*	new: Latest plugins

* ## Get plugins list

	Available API versions: 1.1, 1.2

	```javascript
	getPluginsList(filters, api_version)
	```

	### Usage

	```javascript
	getPluginsList()

	getPluginsList({
		tag: ['photography', 'blue'],
		browse: 'popular',
		page: 1,
		per_page: 10,
		//... other filters
	})
	```

* ## Filter Plugins By

	Available API versions: 1.1, 1.2

	```javascript
	filterPluginsBy(filter_key*, filter_value*, page, per_page, api_version)
	```

	### Usage

	```javascript
	filterPluginsBy('search', 'buddypress', 1, 5)
	filterPluginsBy('tag', ['popup', 'slideshow'])
	filterPluginsBy('author', 'wordpressdotorg', 2, 3)
	filterPluginsBy('browse', 'popular')
	```

* ## Get Plugins Info

	Available API versions: 1.1, 1.2

	```javascript
	getPluginInfo(plugin_slug, api_version)
	```

	### Usage

	```javascript
	getPluginInfo('wordpress-seo');
	```

* ## Get Plugin Hot Tags List

	Available API versions: 1.1, 1.2

	```javascript
	getPluginHotTagsList(api_version)
	```

	Note: tags_count is not implemented in the original api yet

	### Usage

	```javascript
	getPluginHotTagsList()
	```

* ## Get Plugin Translations

	Available API versions: 1.0

	```javascript
	getPluginTranslations(slug, plugin_version, api_version)
	```

	### Usage

	```javascript
	getPluginTranslations('classic-editor', '1.5');
	```

* ## Get Plugin Downloads

	Available API versions: 1.0

	```javascript
	getPluginDownloads(plugin_slug*, limit, api_version)
	```

	limit: Downloads in last {limit} days

	### Usage

	```javascript
	getPluginDownloads('classic-editor', 7)
	```

* ## Get Plugin Statistics

	```javascript
	getPluginStats(plugin_slug*, api_version)
	```

	### Usage

	```javascript
	getPluginStats('classic-editor')
	```

# <h1 id="themes">Themes</h1>

* ### **Filters list**

	*	search(string): Textual search, using a free-form string

  * tag('string' | 'array'): Return themes with a specified tag or set of tags(array of strings)

  *	theme(string): Slug of a specific theme to return

  *	author(string):	WordPress.org username of the author, pass this filter to return themes authored by them

  *	page(number): page number
  	default: 1

  *	per_page(number): Themes to show per page
  	default: 24

  *	browse(string): Predefined themes ordering. Possible values are

  	* popular: Themes ordered by popularity
  	* featured: Set of featured themes
  	* updated: Recently updated themes
  	* new: Latest themes

* ## Get Themes List

	Available API versions: 1.1, 1.2

	```javascript
	getThemesList(filters, api_version)
	```

	### Usage

	```javascript
	getThemesList()

	getThemesList({
		tag: ['photography', 'blue'],
		browse: 'popular',
		page: 1,
		per_page: 10,
		//... other filters
	})
	```

* ## Filter Themes By

	Available API versions: 1.1, 1.2

	```javascript
	filterThemesBy(filter_key*, filter_value*, page, per_page, api_version)
	```

	### Usage

	```javascript
	filterThemesBy('search', 'grid', 1, 15)

	filterThemesBy('tag', ['photography', 'blue'])

	filterThemesBy('theme', 'gridmag')

	filterThemesBy('author', 'wordpressdotorg', 2, 3)

	filterThemesBy('browse', 'popular')
	```

* ## Get Theme Info

	Available API versions: 1.1, 1.2

	```javascript
	getThemeInfo(theme_slug, api_version)
	```

	### Usage

	```javascript
	getThemeInfo('simple-grid')
	```

* ## Get Popular Theme Tags

	Available API versions: 1.1, 1.2

	```javascript
	getPopularThemeTags(tags_count, api_version)
	```

	### Usage

	```javascript
	getPopularThemeTags()

	getPopularThemeTags(5)
	```

* ## Get Theme Translations

	Available API versions: 1.0

	```javascript
	getThemeTranslations(theme_slug*, theme_version, api_version)
	```

	### Usage:

	```javascript
	getThemeTranslations('grocery-store', '1.0.2')
	```

# <h1 id="events">Events</h1>

* ## Get Upcoming WordCamps and meetups details, filterable by location.

  * ## Filters list

	Main Filters

	* location(string):

	* latitude(number | string) and longitude(number | 		string)

	* ip(string)

	* country(string): Country name

	Filters To Be Used In Conjunction With Others

	* timezone(string)

	* number(number): No of events to show

	* locale(string)

	```javascript
	getEventDetails(params, api_version)
	```

	### Usage

	```javascript
	getEventDetails({ country: 'IT' });

	getEventDetails({ ip: '136.0.16.1' })

	getEventDetails({
		latitude: '41.900001525879'
		longitude: '12.479999542236'
	})

	getEventDetails({ location: 'Australia' })

	getEventDetails({ number:5, location:'Australia' })
	```

# <h1 id="others">Others</h1>

* ## Get Statistics of Php, MySql and Wordpress

	Available API versions: 1.0

	```javascript
	getStats(type, api_version)
	```

	### Usage

	```javascript
	getStats('php')

	getStats('mysql')

	getStats('wordpress')
	```

* ## Generate Secret Key

	Available API versions: 1.1

	```javascript
	generateSecretKey(api_version)
	```

	### Usage

	```javascript
	generateSecretKey()
	```

* ## List of popular import plugins in the WordPress Plugin Directory used by Tools → Import Screen.

	Available API version: 1.1

	```javascript
	getPopularImportPlugins(api_version)
	```

	### Usage

	```javascript
	getPopularImportPlugins()
	```






