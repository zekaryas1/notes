---
title: WEB (HTML + CSS)
date created: Wednesday, April 5th 2023, 3:38:53 pm
date modified: Thursday, April 6th 2023, 11:37:26 am
---

# WEB (HTML + CSS)

## WEB Rendering Blocking and How to Prevent Them

- [9 tricks to eliminate render blocking resources - LogRocket Blog](https://blog.logrocket.com/9-tricks-eliminate-render-blocking-resources/)

### What is Rendering Blocking

- Render blocking resources are files that are essential to the process of rendering a web page. When the browser encounters a render blocking resource, it stops downloading the rest of the resources until these critical files are processed.
- Non-render blocking resources don’t postpone the rendering of the page and can be safely downloaded in the background after the initial page render.

### Why Care About Rendering Blocking

- If you reduce the number of render blocking resources, you can shorten the critical rendering path and reduce page load times, thus improving the user experience and search engine optimization.

### Types of Rendering Blocking Resources

- everything found in `<head>` section
	- CSS style-sheets
	- JavaScript files added in `head` section
	- fonts added from either CDN or a local server

### Non Rendering Blocking Resources

- everything placed at the bottom of body tag
	- images
	- media files
	- `<script>` tags

```html
<!doctype html>
<html lang="en">
  <head>
	<!-- blocking resource here -->
  </head>
  <body>
    <h1>Hello, world!</h1>


	<!-- non blocking resource here -->
  </body>
</html>
```

### Solving Render Blocking Resources

1. Identify your render blocking resources
	1. This can be by using tools such as
		1. [Lighthouse overview - Chrome Developers](https://developers.google.com/web/tools/lighthouse)
		2. [PageSpeed Insights](https://pagespeed.web.dev/)
		3. [GTmetrix | Website Performance Testing and Monitoring](https://gtmetrix.com/)
2. Don’t use CSS imports
	1. instead of using @import tool, which is blocking, consider adding your CSS using the traditional `link:stylesheet` in your html section
3. Load conditional CSS with `media` attributes
	1. i.e process CSS that apply for mobile only when the view-port matches mobile only.
	2. `<link href="large.css" rel="stylesheet" media="screen and (min-width: 1500px)">`
	3. Tool to convert your existing CSS with media query to conditional CSS
		1. [postcss-extract-media-query - npm](https://www.npmjs.com/package/postcss-extract-media-query)
4. Defer non-critical CSS
	1. every CSS included in head section is blocking, however some CSS definition inside the file might not be critical during page load.
	2. we can split CSS files into critical and non-critical so critical can load in head section and non-critical load at the bottom of body tag as non-blocking resource
	3. You can split files using
		1. [Critical Path CSS Generator - Prioritize above the fold content :: SiteLocity](https://www.sitelocity.com/critical-path-css-generator)
		2. [GitHub - addyosmani/critical: Extract & Inline Critical-path CSS in HTML pages](https://github.com/addyosmani/critical)
5. Use the `defer` and `async` attributes to eliminate render-blocking JavaScript
	1. JavaScript placed in head section are blocking resource
	2. JavaScript placed at bottom of body are non-blocking,
		1. but sometimes will cause, some page components to lag and distorted view due to unloaded UI parts
		2. ex: ads, animations
	3. both defer and `async` are
		1. ways to include JavaScript in head section as non-blocking
		2. executed in the order they appear in the HTML document, so if you have multiple scripts with defer, they will be executed in the order they appear.
	4. defer  
		1. `<script src="example.js" defer></script>`
		2. This attribute can be used with scripts that don’t need to be executed immediately when the page loads, but can be executed later when the page has finished loading.
	6. `async`
		1. `<script async src="example.js"></script>`
		2. When a script is marked as `async`, it will execute as soon as it is available, regardless of whether or not the page has finished parsing.
6. Find and remove unused CSS and JavaScript
	1. [PurgeCSS: Remove unused CSS code - LogRocket Blog](https://blog.logrocket.com/purgecss-remove-unused-css-code/)
7. Split code into smaller bundles
	1. [Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack - LogRocket Blog](https://blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack/)
8. `Minify` CSS and JavaScript files
	1. [Getting started with PostCSS - LogRocket Blog](https://blog.logrocket.com/getting-started-with-postcss-in-2019-484262a4d725/)
9. Load custom fonts locally
	1. fonts found in head section are blocking resource
	2. prefer downloading and using fonts from local instead of directly from CDN
	3. Use this tool to help you download and self-host google fonts
		1. [google webfonts helper](https://gwfh.mranftl.com/fonts)
	4. consider using `font-display: swap;`
		1. to instruct the browser to immediately begin to use a system font and swap it with the custom font once it downloads
		2. This enables you to avoid invisible text on the page while the custom font is still loading.
	5. prefer to use `woff` and `woff2` font formats
