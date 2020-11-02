# wporg-api-client
WordPress.org API client built in node.js

# Installation
npm install wporg-api-client

Note: add `--save` if you are using npm < 5.0.0

# Example

```javascript
//To Fetch All Plugins List

const { getPluginsList } = require("wporg-api-client");

const pluginsList = async () => {
	let data = {};

	try {
		data = await getPluginsList();
		console.log(data, "data");
	} catch (error) {
		console.log(error.message, "error");
	}
};

pluginsList();
```

Note: Asterisk(*) is used to denote required arguments

# Core

## Get Core Translation

 Available API versions: 1.0

```javascript
getCoreTranslations(wp_version, api_version)
```

Note: wp_version starts from 4.0

### Usage

```javascript
getCoreTranslations('4.9.5')
```

## Get Core Version Info

Available API versions: 1.7

```javascript
getCoreVersionInfo(wp_version, locale, api_version)
```

### Usage

```javascript
getCoreVersionInfo('4.0.1', 'eu')
```

## Get Core Credit Details

Available API versions: 1.1

```javascript
getCoreCreditDetails(wp_version, locale, api_version)
```

### Usage

```javascript
getCoreCreditDetails('4.0.1', 'eu')
```

## Get Core Checksums

Available API versions: 1.0

```javascript
getCoreChecksums(wp_version*, locale, api_version)
```

###	Usage

```javascript
getCoreChecksums('5.5.1', 'eu')
```

## Get Browser Info

Available API versions: 1.1

```javascript
getBrowserInfo(useragent*)
```

###	Usage

```javascript
getBrowserInfo('Chrome/86.0')
```

## Get Core Version Stability Info

Available API versions: 1.0

```javascript
getCoreVersionStabilityInfo(wp_version, api_version)
```

###	Usage

```javascript
getCoreVersionStabilityInfo() //returns all versions info


getCoreVersionStabilityInfo('4.6.20')	//returns specific version info
```

## Get Core Statistics

Available API versions: 1.0

```javascript
getCoreStats(api_version)
```

###	Usage

```javascript
getCoreStats()
```

# Plugins

**Filters list**

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



Available API versions: 1.1, 1.2

## Get plugins list

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

##	Filter Plugins By

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

## Get Plugins Info

```javascript
getPluginInfo(plugin_slug, api_version)
```

### Usage

```javascript
getPluginInfo('wordpress-seo');
```

## Get Plugin Hot Tags List

```javascript
getPluginHotTagsList(api_version)
```

Note: tags_count is not implemented in the original api yet

### Usage

```javascript
getPluginHotTagsList()
```

## Get Plugin Translations

Available API versions: 1.0

```javascript
getPluginTranslations(slug, plugin_version, api_version)
```

### Usage

```javascript
getPluginTranslations('classic-editor', 1.5);
```

## Get Plugin Downloads

Available API versions: 1.0

```javascript
getPluginDownloads(plugin_slug*, limit, api_version)
```

limit: Downloads in last {limit} days

### Usage

```javascript
getPluginDownloads('classic-editor', 7)
```

## Get Plugin Statistics

```javascript
getPluginStats(plugin_slug*, api_version)
```

### Usage

```javascript
getPluginStats('classic-editor)
```

# Themes

**Filters list**

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

## Filter Themes By

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

## Get Theme Info

```javascript
getThemeInfo(theme_slug, api_version)
```

### Usage

```javascript
getThemeInfo('simple-grid')
```

## Get Popular Theme Tags

```javascript
getPopularThemeTags(tags_count, api_version)
```

### Usage

```javascript
getPopularThemeTags()

getPopularThemeTags(5)
```

## Get Theme Translations

Available API versions: 1.0

```javascript
getThemeTranslations(theme_slug*, theme_version, api_version)
```

### Usage:

```javascript
getThemeTranslations('grocery-store', 1.0.2)
```

# Events

## Get Upcoming WordCamps and meetups details, filterable by location.

Filters list

## Main Filters

* location(string):

* latitude(number | string) and longitude(number | 		string)

* ip(string)

* country(string): Country name

## Filters To Be Used In Conjunction With Others

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

# Others

## Get Statistics of Php, MySql and Wordpress

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

## Generate Secret Key

Available API versions: 1.1

```javascript
generateSecretKey(api_version)
```

### Usage

```javascript
generateSecretKey()
```

## List of popular import plugins in the WordPress Plugin Directory used by Tools → Import Screen.

Available API version: 1.1

```javascript
getPopularImportPlugins(api_version)
```

### Usage

```javascript
getPopularImportPlugins()
```






