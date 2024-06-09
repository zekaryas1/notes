---
title: 08 - DESIGN A URL SHORTENER
date created: Monday, March 13th 2023, 12:14:55 am
date modified: Sunday, March 17th 2024, 4:08:28 pm
---

# 08 - DESIGN A URL SHORTENER

## Step 1 - Scope the System

- System design interview questions are intentionally left open-ended. To design a well-crafted system, it is critical to ask clarification questions.
- After asking questions we might have a basic use-case for the system like:
	- URL shortening: given a long URL => return a much shorter URL
	- URL redirecting: given a shorter URL => redirect to the original URL
	- High availability, scalability, and fault tolerance considerations

### Back of the Envelop Estimation

- [Example 1 - URL Shortner](02%20-%20ESTIMATIONS.md#Example%201%20-%20URL%20Shortner)
- How many possible unique urls do we need per 10 years
	- per day = 100 mil urls are needed
	- per year = 100 mil * 365 = 36.5 Bil
	- per 10 years = 36.5 * 10 = 365 billion possible urls

## Step 2 - High Level Design

- The system can be divided into 3 parts
	1. API endpoints
	2. URL redirecting
	3. URL shortening

### API Endpoints

- the api is used to setup a communication line with clients
- there will be two endpoints
- post == `api/v1/data/shorten`
	- body = `{longUrl: longUrlValue}`
	- saves a new longul
	- then return a short url
- get == `api/v1/{shortUrl}`
	- get the long url and redirect

### URL Redirection

- what happens when you enter the short url into a server
	- a get request is sent to the server
	- the server gets the long url
	- redirect you the long url with code => 301

#### 301 Vs 302 Redirects

- there are two ways to redirect a user to a new location, 301 and 302 redirects
- 301 redirect
	- shows the requested url is "permanently" moved to long url
	- browsers will cache the longurl as it is permanent
- 302 redirect
	- shows the requested url is "temporarily" moved to long url
	- browsers won't cache the longurl and will ask the server each time
- 301 vs 302
	- 301 is good when you want to reduce server load and get advantage of browser cache
	- 302 is better when you want to get full analytic information, who, where, how many times is a longurl being accessed.

### URL Shortening

- the most intuitive way to implement url shortening is to use hash function with dictionary

```python
dict = defaultdict(lambda: "notFound")

def save(longUrl):
	shortUrl = hash(longUrl)
	dict[shortUrl] = longUrl
	return {
		status: 200,
		url: shortUrl
	}

def get(shortUrl):
	return {
		status: 301,
		url: dict[shortUrl]
	}

```

## Step 3 - Design Deep Dive

### Storage

- in the high level design the urls are stored in hash table, which is in memory, that won't work for our case because
	- memory is limited by ram
	- we need permanent storage, think if server failure
	- solution, Database
		- doesn't mainly dependent on ram but storage
		- data is persisted
- database schema
	- `{id: primarykey, shortUrl: string unique, longUrl: string}`

### Hash Function

- we need to be careful with the hash function and length we select, if result of the hash function should be short enough but also should be able to generate so enough unique urls
- hash length
	- The hashValue consists of characters from [0-9, a-z, A-Z], containing 10 + 26 + 26 = 62 possible characters.
	- To figure out the length of hashValue, find the smallest n such that 62^n ≥ 365 billion.
		- if n == 2, 62 ^ 2 => 3844 which is very low
		- if n == 8, 62 ^ 8 => xyz, which is just above 365 billion
		- When n = 7, 62 ^ n = ~3.5 trillion, 3.5 trillion is more than enough to hold 365 billion URLs, so the length of hashValue is 7.
- hash function
	- To shorten a long URL, we should implement a hash function that hashes a long URL to a 7-character string.
	- plus, the hash function should be able to generate a random non-guessable shorturls.
	- possible solutions
		- md5
		- crc32
		- sha-1
	- cons of the above hashing functions
		- for the same key they generate the same value
		- the smallest hash value they generate is 8, which is above our requirement, thus we need to trim it to 7, which in-turn might cause a collision
		- solution
			 1. trim the result of the hash function to 7
			 2. if the trimmed value is in db
			 3. add a specific pre-defined string to long url
			 4. run the hash again, and go back to step 1

### Base 62 Conversion as Hash Function

- beside using hash functions such as md5, sha-1, crc32, we can also consider base 62 conversion for it features
- base 62 conversion features
	- given a unique id(?number) it can generate a unique characters just like we need
		- the unique is can be auto-increment id
		- collision is impossible, which was possible in-case of the above hash functions
		- ex: new long url with id => 2009215674938 => Base_62_conversion(2009215674938) => zn9edcu
	- cons:
		- the id generation technique is guessable, just increment a number => pass it to base_64 and you get the next short url
			- for this reason this hash function should be used for system with minor security requirement.

## Step 4 - Wrap up

- Cache
	- since read operations are more than write operations, we consider using cache to increase performance
- Rate limiter
	- a bad user can send an overwhelming requests, we can use rate limiter with IP filtering to solve this
- web server scaling
	- our design is stateless, thus adding removing server is doable
- database scaling
	- consider replication or sharding
- analytics
- availability

## Readme

- [Bloom filter - Wikipedia](https://en.wikipedia.org/wiki/Bloom_filter)
	- [https://www.youtube.com/watch?v=V3pzxngeLqw](https://www.youtube.com/watch?v=V3pzxngeLqw)
	- A Bloom filter is a probabilistic data structure that is used to determine whether an element is a member of a set or not. It is space-efficient and is widely used in distributed systems and databases.
