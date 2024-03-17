---
title: 09 - DESIGN A WEB CRAWLER
date created: Friday, March 17th 2023, 9:29:18 pm
date modified: Sunday, March 17th 2024, 4:08:35 pm
---

# 09 - DESIGN A WEB CRAWLER

## Intro

- A web crawler is used by search engines to discover new or updated content on the web.
- content can be web page, image, video, PDF, etc.
- a web crawler starts by collecting a few web pages and then follows links on those pages to collect new content.
- A crawler is used for many purposes:
	- search engine indexing
	- web archiving
	- web data mining
	- web copyright monitoring

## Step 1: Ask Questions

- Here are possible answers you might get after asking your questions.
	- The web crawler is for search indexing
	- 1 billion pages are collected per month
	- Only HTML pages are included
	- Store files for 5 years
	- Ignore duplicate pages
- non functional requirements
	- scalability:
		- web is very large, system needs to handle billions of pages per month
		- crawling should be extremely efficient using parallelization
	- robustness:
		- system should handle malicious pages, broken pages, unresponsive server
	- politeness:
		- the system should not make too many requests to a website within a short time interval.

### Back of the Envelop Estimation

- QPS - Query per second
	- Write operation per second
		- 1 billion web pages are downloaded per month
		- 1 bil / 30 days / 24 hr / 60 min / 60 sec = ~400 pages /sec
	- Peak QPS
		- 2 * QPS = ~800
- Storage
	- Assuming the average web page size is 500KB.
	- storage per month:
		- 1 billion page * 500 KB = 500TB/month
	- storage per 5 years:
		- 500 TB * 12 * 5 = 30 PB

## Step 2 - High Level Design

- lets divide the system into different components
	- seed urls
	- url frontier
	- html downloader
		- dns resolver
	- content parser
	- content seen
		- content storage
	- link extractor
	- url filter
	- url seen
		- url storage

### System Components

#### Seed Urls

- a starting point for the crawl process.
- A good seed url servers as a good starting point that a crawler can utilize to traverse as many links as possible.

#### URL Frontier

- stores urls to be downloaded
- queue (First in first out)

#### HTML Downloader

- Downloads html pages from the internet
- urls are provided one by one by url frontier

##### DNS Resolver

- to download a web page, a url must be translated into an ip address
- the html downloader calls the dns resolver to get the right ip address for a url

#### Content Parser

- after an html is downloaded, it must be parsed and validated
- validation is important to get rid of malformed web pages

#### Content Seen?

- service to eliminate data redundancy and shorten processing time.
- we need best algorithm to check if there is new content?
	- character by character is too slow
	- using hash for comparison is better
		- or bloom filter

#### Content Storage

- storage system for storing HTML content
- how to store the files
	- most popular content in memory
	- other most contents in disk

#### URL Extractor

- url extractor parses and extracts links from HTML pages.

#### URL Filter

- the url filter excludes certain content types
- this could be based on
	- file extensions
	- error links
	- or blacklisted sites

#### URL Seen?

- a data structure that keeps track of urls that are visited before or already in the frontier.
- "url seen" helps avoid
	- adding the same url multiple times as this can increase server load and cause potential infinite loops
- What algorithms can we use to detect if a url is already seen?
	- bloom filter
	- hash table

#### URL Storage

- used to store already visited urls.

### Summary

```
- Step 1: 
	- Add seed URLs to the URL Frontier

- Step 2: 
	- HTML Downloader fetches a list of URLs from URL Frontier.

- Step 3: 
	- HTML Downloader gets IP addresses of URLs from DNS resolver and starts downloading.

- Step 4: 
	- Content Parser parses HTML pages and checks if pages are malformed.

- Step 5: 
	- After content is parsed and validated, it is passed to the “Content Seen?” component.

- Step 6: 
	- “Content Seen” component checks if a HTML page is already in the storage.
	- If it is in the storage, this means the same content in a different URL has already been processed. 
	- In this case, the HTML page is discarded.
	- If it is not in the storage, the system has not processed the same content before. The content is passed to Link Extractor.

- Step 7: 
	- Link extractor extracts links from HTML pages.

- Step 8: 
	- Extracted links are passed to the URL filter.

- Step 9: 
	- After links are filtered, they are passed to the “URL Seen?” component.

- Step 10: 
	- “URL Seen” component checks if a URL is already in the storage, if yes, it is processed before, and nothing needs to be done.

- Step 11: 
	- If a URL has not been processed before, it is added to the URL Frontier.
```

## Step 3 - Design Deep Dive

- Deep dive on most important components
	- DFS vs BFS graph algorithms
	- url frontier
	- html downloader
	- robustness
	- extensibility
	- detect and avoid problematic content

### DFS Vs BFS

- DFS is usually not a good choice because the depth of DFS can be very deep.
- BFS is commonly used by web crawlers and is implemented by a first-in-first-out (FIFO) queue
- The traditional BFS doesn't handle two cases we want
	- ability to download different web-pages, being polite
		- polite system is a system that doesn't cause troubles to other servers ex: DOS attack, the opposite is "impolite" system
	- ability to prioritize urls based on page rank, web traffic, update frequency…etc.
	- solution
		- url frontier

### URL Frontier

- helps to address shortcoming of traditional BFS
- a data structure that stores urls to be downloaded
- ensures politeness, url prioritization and freshness.
- how does url frontier achieve
	- politeness
	- priority
	- freshness

#### Politeness

- Our system shouldn't focus at one web-address at a time, it should be parallel, moreover each parallel operation should be polite.
- concept?
	- download one page at a time from the same host.
	- add delay between two download tasks
- how to?
	- a url arrives at Queue router
	- queue router checks *mapping table* to find which queue to add this address
		- each queue hold the same address. ex: web-address related to google.com will be assigned only to queue1
	- worker threads 1-n pull a url to download from their dedicated queue, they use *queue selector* to find which queue is associated with them
		- there is a fixed timeout before starting a new download

#### Priority

- we can prioritize urls based on usefulness which can be measured by page-rank, website traffic, update frequency, etc.
- how it works?
	- Prioritizer: It takes URLs as input and computes the priorities.
	- Queue f1 to fn:
		- Each queue has an assigned priority. Queues with high priority are selected with higher probability.
	- Queue selector: Randomly choose a queue with a bias towards queues with higher priority.
	- Front queue selector: selects highest priority url from queue and forwards to back queue router
		- back queue router is the first step to "politeness" implementation

#### Freshness

- To keep outdated webdata, a web-page must be re-crawled periodically.
- re-crawl all the urls is time consuming and resource intensive
- few strategies to optimize freshness are
	- re-crawl based on web pages update history
	- prioritize urls and re-crawl important pages first and more frequently.

### Performance Optimization for HTML Downloader

- distributed crawl
	- To achieve high performance, crawl jobs are distributed into multiple servers, and each server runs multiple threads
- cache DNS resolver
	- DNS Resolver is a bottleneck for crawlers because DNS requests might take time due to the synchronous nature of many DNS interfaces.
	- Maintaining our DNS cache to avoid calling DNS frequently is an effective technique for speed optimization.
- Locality
	- Distribute crawl servers geographically. When crawl servers are closer to website hosts, crawlers experience faster download time
- Short timeout
	- Some web servers respond slowly or may not respond at all.
	- To avoid long wait time, a maximal wait time is specified. If a host does not respond within a predefined time, the crawler will stop the job and crawl some other pages.

### Detect and Avoid Problematic Content

1. Redundant content
	1. As discussed previously, nearly 30% of the web pages are duplicates. Hashes or checksums help to detect duplication
2. Spider traps
	1. A spider trap is a web page that causes a crawler in an infinite loop.
		1. ex: [Loading...](www.spidertrapexample.com/foo/bar/foo/bar/foo/bar)
		2. Such spider traps can be avoided by setting a maximal length for URLs.
3. Data noise
	1. Some of the contents have little or no value, such as advertisements, code snippets, spam
	2. URLs, etc. Those contents are not useful for crawlers and should be excluded if possible.

## Readme

- [https://www.youtube.com/watch?v=0LTXCcVRQi0&t=28s](https://www.youtube.com/watch?v=0LTXCcVRQi0&t=28s)
