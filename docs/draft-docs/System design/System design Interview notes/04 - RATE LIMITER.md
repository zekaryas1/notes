---
title: 04 - RATE LIMITER
date created: Thursday, September 29th 2022, 7:48:43 pm
date modified: Sunday, March 17th 2024, 4:06:40 pm
---

# 04 - RATE LIMITER

## Step 1: Understand the System Scope

- What is a rate limiter?
	- rate limiting aka API throttling
	- rate limiter is used to control the rate of traffic sent by a client or a service.
	- In the HTTP world, a rate limiter limits the number of client requests allowed to be sent over a specified period.
	- why is it important?
		- to avoid DOS(denial of service)
		- to save resource
	- example:
		- A user can write no more than 2 posts per second.
- What happens if a rate is exceeds?
	- the server sends response = too many requests
	- or the request is added to message queue

## Step 2: Propose High Level Design

- your fundamental design could be
	- request comes from the client -> goes to a system in a middle which act as a request limiter and then pass to -> web servers
- API gateway
	- [https://www.youtube.com/embed/6ULyxuHKxg8?feature=oembed](https://www.youtube.com/embed/6ULyxuHKxg8?feature=oembed)
	- rate limiting is usually implemented within a component called API gateway.
	- API gateway is a fully managed service that supports rate limiting, SSL termination, authentication, IP whitelisting, servicing static content, etc.

## Rate Limiting Algorithms

- There are different rate limiting algorithms with their own pros and cons
	- Token bucket
	- Leaking bucket
	- Fixed window counter
	- Sliding window log
	- Sliding window counter

### Token Bucket

- ![Token bucket](https://www.krakend.io/images/documentation/krakend-token-bucket.png)
- How it works
	- A token bucket is a container that has pre-defined capacity.
	- Tokens are put in the bucket at preset rates periodically.
		- Once the bucket is full, no more tokens are added.
	- each request consumes one token
	- when a request arrives, we check if there are enough token?, if
		- yes, we take one token out for each request and request goes through
		- no, the request is dropped
- we might need more than one bucket for different requests
	- For instance, if a user is allowed to make 1 post per second, add 150 friends per day, and like 5 posts per second, 3 buckets are required for **each user**.
	- If the system allows a maximum of 10,000 requests per second, it makes sense to have a global bucket shared by all requests.

```python
input BUCKET_SIZE  # mak tokens in bucket
input REFILL_RATE  # token to add/second

bucket = Bucket(BUCKET_SIZE)

# request arrives
if bucket.isFull():
	reutrn {status: 429, message: 'rate exceded'}
else:
	bucket.removeToken()
	return request.process()

setTimeInterval(  
  for x in range(REFIL_RATE):
	  token.ifNotFull.push(newToken)				
,1000)  #every second add n token if buket is not full
```

### Leaking Bucket Algorithm

- ![token bucket visualization](https://programmer.ink/images/think/fb2fa6c0c5aea327f72d2e67ed19c801.jpg)
- The leaking bucket algorithm is similar to the token bucket except that requests are processed at a fixed rate.
- It is usually implemented with a first-in-first-out (FIFO) queue.
- How it works?
	- Requests arrive
	- system checks if the queue if full? if
		- yes, discard the request
		- no, request is added to queue
	- requests are pulled from the queue and processed at regular intervals

```python
input BUCKET_SIZE  # queue size
input OUTFLOW_RATE # req to process/second

# request arrives
q = Queue(BUCKET_SIZE) 

if queue.isFull():
	return {status: 429}
else:
	queue.append(request)

setTimeInterval(
	for i in range(OUTFLOW_RATE):
		req = queue.popleft()
		return req.process()				
, 1000) #every second process a n requests and remove a token
```

> Both of the algorithms mentioned above have the benefit of using less memory, and being easy to implement but one drawback is that adjusting the two parameters, size and rate, may be difficult.

### Sliding Window Log Algorithm

- How it works?
	- it keeps track of request timestamps
		- these timestamps are keps in cache such as `sorted set of redis`
	- when a new request comes in, remove all the outdated timestamps
		- outdated timestamps = timestamps older than the start of the current time window.
	- add the new requests timestamp to the log.
	- if the log size is same or lower than the allowed count, the request is accepted, otherwise rejected.
- How to implement this?
	- *can be implemented using redis properties*

## High-level Architecture

- *Making decisions*
- Now we know more about rate limiting, in short keep counters…
- Where shall we store counters?
	- the choice is either database or in-memory cache
	- database will be slow due to disk usage, however in-memory caches are fast and supports time-based expiration strategy eg: Redis
- Redis is a great option for implementing rate limiting as it offers two commands we can use
	- INCR: to increase a stored value by 1
	- EXPIRE: It sets a timeout for the counter. If the timeout expires, the counter is automatically deleted.

## Design Deep Dive

- Where we are so far
	- Request arrives -> API gatway(with rate limiting algorithm) -> Servers
	- What happens if exceeding the rate limit?
		- return 429 or add request to 'message queue' depending on use case
	- For rate-limiting implementation we considered redis
- How to handle rules?
	- as discussed before we might need different buckets with different properties, we need rules for this
	- consider [GitHub - envoyproxy/ratelimit: Go/gRPC service designed to enable generic rate limit scenarios from different types of applications.](https://github.com/envoyproxy/ratelimit#examples)
	- rules are stored in configuration file saved on disk and can be cached.
	- for instance: the rule below, shows that clients are not allowed to login more than 5 times in 1 minute.

```yml 
# rate limiting rules ex
domain: auth
descriptors:
	- key: auth_type
		Value: login
		rate_limit:
			unit: minute
			requests_per_unit: 5
```

## Bottlenecks or Challenges

- one rate limiter might not be enough
	- One rate limiter might not be enough to meet the demands of scalability, thus we should consider using multiple rate limiters.
	- But This brings two challenges
		- session issues -> in order for the architecture to scale, the rate limiters must be stateless, allowing requests to be routed to various rate limiter not just single server.
			- *for this to work clients need to use a central data store, instead of a dedicated store*
		- if we're using a single data store -> race condition will occur
			- this can happen because multiple servers might try to modify a single value -> counter

## Finalizing

- monitoring
	- After the rate limiter is put in place, it is important to gather analytics data to check whether,
		- The rate limiting algorithm is effective.
		- The rate limiting rules are effective.
		- *we can update these if system is not performing efficient*
- avoid rate limiting in the first place
	- try using client and server side cache
	- send proper messages to clients

## Readme

- [https://www.youtube.com/embed/FU4WlwfS3G0?feature=oembed](https://www.youtube.com/embed/FU4WlwfS3G0?feature=oembed)
- [Fetching Title#co6u](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
- [Fetching Title#hg1c](https://stripe.com/blog/rate-limiters)
- Implementation focused
	- [Fetching Title#xb6a](https://engineering.classdojo.com/blog/2015/02/06/rolling-rate-limiter/)
	- [Fetching Title#rvyp](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/)
	- [Fetching Title#5wpz](https://gist.github.com/ptarjan/e38f45f2dfe601419ca3af937fff574d#request-rate-limiter)
