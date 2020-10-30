# wporg-api-client
WordPress.org API client built in node.js

# Installation
npm install wporg-api-client

# Examples

# Core

Available API versions:

1.0: Returns JSON object

1. getCoreTranslations(wp_version, api_version)

	Note: wp_version starts from 4.0

	Usage:-

	getCoreTranslations('4.9.5')



Available API versions:

1.7: Returns JSON object

2. getCoreVersionInfo(wp_version, locale, api_version)

	Usage:-

	getCoreVersionInfo('4.0.1', 'eu')



Available API versions:

1.1: Returns JSON object

3. getCoreCreditDetails(wp_version, locale, api_version);

	Usage:-

	getCoreCreditDetails('4.0.1', 'eu')



Available API versions:

1.0: Returns JSON object

4. getCoreChecksums(wp_version*, locale, api_version)

	Usage:-

	getCoreChecksums('5.5.1', 'eu')


Available API versions:

1.1: Returns JSON object



5. getBrowserInfo(useragent*)

	Usage:-

	getBrowserInfo('Chrome/86.0')



Available API versions:

1.0: Returns JSON object

6. getCoreVersionStabilityInfo(wp_version, api_version)

	Usage:-

	getCoreVersionStabilityInfo()	//returns all versions info
	getCoreVersionStabilityInfo('4.6.20')	//returns specific version info


Available API versions:

1.0: Returns JSON object

7. getCoreStats(api_version)

	Usage:-

	getCoreStats()


# Plugins

Filters list:-

	1. search(string): Textual search, using a free-form string

	2. tag('string' | 'array'): Return themes with a specified tag or set of tags(array of strings)

	3. author(string):	WordPress.org username of the author, pass this filter to return themes authored by them

	4. page(number): page number
	default: 1

	5. per_page(number): Themes to show per page
	default: 24

	6. browse(string): Predefined themes ordering. Possible values are:-

		popular: Themes ordered by popularity
		featured: Set of featured themes
		updated: Recently updated themes
		new: Latest themes



Available API versions:
	1.1: Returns JSON object
	1.2: Returns JSON object

1. getPluginsList(filters, api_version)

	Usage:-

	getPluginsList()

	getPluginsList({
		tag: ['photography', 'blue'],
		browse: 'popular',
		page: 1,
		per_page: 10,
		//... other filters
	})

2. filterPluginsBy(filter_key*, filter_value*, page, per_page, api_version)

	Usage:-

	filterPluginsBy('search', 'buddypress', 1, 5)
	filterPluginsBy('tag', ['popup', 'slideshow'])
	filterPluginsBy('author', 'wordpressdotorg', 2, 3)
	filterPluginsBy('browse', 'popular')

3. getPluginInfo(plugin_slug, api_version)

	Usage:-

	getPluginInfo('wordpress-seo');

4. getPluginHotTagsList(api_version)

	Note: tags_count is not implemented in the original api yet

	Usage:-
	getPluginHotTagsList()



Available API versions:

1.0: Returns JSON object

5. getPluginTranslations(slug, plugin_version, api_version)

	Usage:-

	getPluginTranslations('classic-editor', 1.5);


Available API versions:

1.0: Returns JSON object

6. getPluginDownloads(plugin_slug*, limit, api_version)

	limit: Downloads in last {limit} days

	Usage:-

	getPluginDownloads('classic-editor', 7)

7. getPluginStats(plugin_slug*, api_version)

	Usage:-

	getPluginStats('classic-editor)

# Themes

Filters list:-

	1. search(string): Textual search, using a free-form string

	2. tag('string' | 'array'): Return themes with a specified tag or set of tags(array of strings)

	3. theme(string): Slug of a specific theme to return

	4. author(string):	WordPress.org username of the author, pass this filter to return themes authored by them

	5. page(number): page number
	default: 1

	6. per_page(number): Themes to show per page
	default: 24

	7. browse(string): Predefined themes ordering. Possible values are:-

		popular: Themes ordered by popularity
		featured: Set of featured themes
		updated: Recently updated themes
		new: Latest themes

Available API versions:

1.1: Returns JSON object
1.2: Returns JSON object

1. getPluginsList(filters, api_version)

	Usage:-

	getPluginsList()

	getPluginsList({
		tag: ['photography', 'blue'],
		browse: 'popular',
		page: 1,
		per_page: 10,
		//... other filters
	})

2. filterThemesBy(filter_key*, filter_value*, page, per_page, api_version)

	Usage:-

	filterThemesBy('search', 'grid', 1, 15)
	filterThemesBy('tag', ['photography', 'blue'])
	filterThemesBy('theme', 'gridmag')
	filterThemesBy('author', 'wordpressdotorg', 2, 3)
	filterThemesBy('browse', 'popular')

3. getThemeInfo(theme_slug, api_version)

	Usage:-

	getThemeInfo('simple-grid')

4. getPopularThemeTags(tags_count, api_version)

	Usage:-

	getPopularThemeTags()
	getPopularThemeTags(5)



Available API versions:

1.0: Returns JSON object

5. getThemeTranslations(theme_slug*, theme_version, api_version)

	Usage:

	getThemeTranslations('grocery-store', 1.0.2)



# Events

Available API versions:

1.0: Returns JSON object

Params list:-

    1.location(string):

    2.latitude(number | string) and longitude(number | string)

	3.ip(string):

	4.country(string): Country name

	Params to be used in conjunction with others:

	1.number(number): No of events to show

    2.locale(string)

    3.timezone(string)




1. getEventDetails(params, api_version)

Usage:-

getEventDetails({
	country: 'IT',
});
getEventDetails({
	ip: '136.0.16.1',
})
getEventDetails({
	latitude: '41.900001525879',
	longitude: '12.479999542236',
})
getEventDetails({
	location: 'Australia',
})
getEventDetails({
	number:5,
	location:'Australia'
})


# Other

Available API versions:

1.0: Returns JSON object

1. getStats(type, api_version)

Usage:-

getStats('php')
getStats('mysql')
getStats('wordpress')


Available API versions:

1.1: Returns JSON object

1. generateSecretKey(api_version)

Usage:-

generateSecretKey()


