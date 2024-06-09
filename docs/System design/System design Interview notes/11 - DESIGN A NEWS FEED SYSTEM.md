---
title: 11 - DESIGN A NEWS FEED SYSTEM
date created: Friday, April 28th 2023, 10:27:07 am
date modified: Sunday, March 17th 2024, 4:08:52 pm
---

# 11 - DESIGN A NEWS FEED SYSTEM

## Intro - What is News Feed

- News feed is the constantly updating list of stories in the middle of your home page.
- News Feed includes status updates, photos, videos, links, app activity, and likes from people, pages, and groups that you follow on Facebook

## Step 1 - Scope the System

- A conversation with interviews can lead to the following features
	- The system should work on mobile and web
	- Feeds are sorted in reverse chronological order
	- A user can have 5000 users
	- Traffic volume = 10 mil DAU
	- Feeds can contain media files, images, videos and text

## Step 2 - High Level Design

- The system can be divided into two blocks
	- Feed publishing
		- what happens when a user post? is the post added to friends' feed?
	- News-Feed building
		- how is user's news-feed collected ? by aggregating friends' posts?

### NewsFeed APIs

- APIs for clients to communicate with servers.
- used by clients to:
	- post a status
	- retrieving news feed
	- adding friends
	- …etc

#### Feed Publishing Api

- `post /v1/me/feed`
	- used to publish a post
	- body: content of the post
	- auth_token: it is used to authenticate api requests

#### Newsfeed Retrieval Api

- `get /v1/me/feed`
	- auth_token: for authentication

## Step 3 - Design Deep Dive

### Feed Publishing Deep Dive

- User sends a post request
- load balancer send traffic to web-servers
- web-servers redirect traffic to post-service
- post service stores post in the database and cache
- fanout service: pushed new content to friends' news feed
	- feed data is stores in cache for fast retrieval
- notification service informs friends that new content is up

--

- web servers
	- besides communicating with clients, web servers enforce
		- authentication with auth_token
		- rate limiting
- Fanout service
	- what is fanout?
		- The process of delivering a post to all friends.
	- types of fanout models?
		- Fanout on write
		- Fanout on read
		- Hybrid approach that takes the best of two modes
	- Fanout on write(Push model)
		- After a write of new post is delivered -> it will be added to friends cache
		- pros:
			- news feed is generated in real-time and can be pushed to friends immediately
			- fetching news feed is fast since the news feed is pre-computed during write time.
		- cons:
			- if a user has many friends, fetching the friends list and generating news feeds for all of them are slow and time consuming,
				- this is called hotkey problem
				- consider celebs with many followers
			- for inactive users or those rarely log in, pre-computing news feeds waste computing.
	- Fanout on read(Pull model)
		- The news feed is generated during read time. This is an on-demand model
		- pros:
			- handles in-active users well,
			- data is not pushed to friends so there is no hotkey problem
		- cons:
			- fetching the news feed is slow as the news feed is not-precomputed
	- Hybrid aproache
		- since fetching the news feed fast is crucial, we use a push model for the majority of users,
		- for users with many followers i.e celebs,
			- we let followers pull news content on-demand(on-read)

### Newsfeed Building Deep Dive

- user sends a get request
- load balancer sends traffic to web-servers
- web-servers route request to news feed service
- feed service fetches news feed from cache
	- i.e feeds are already pushed to user

--

- GraphDB can be utilized for storing and easily getting user's friends
- use CDN to store media content (images, videos, etc…)
