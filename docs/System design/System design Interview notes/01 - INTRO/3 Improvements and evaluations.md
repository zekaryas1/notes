---
title: 3 Improvements and Evaluations
date created: Wednesday, February 1st 2023, 2:18:43 pm
date modified: Sunday, March 17th 2024, 11:38:20 am
---

# 3 Improvements and Evaluations

## Improve Response Times

### Cache

![](https://miro.medium.com/max/1400/1*evi5WJgy9lpY3NeaThSbAA.png)

- Cache is a temporary storage that stores the result of expensive operation or frequently accessed data in memory so that subsequent requests are served more quickly
- Advantage of cache
	- better performance
	- reduce database workloads
- Considerations when using cache
	- use cache when read operation is more frequent than write operation
	- when you have a complex query
		- ex: complex join operation
	- don't set expiration data too soon or too long
- [https://www.youtube.com/embed/5TRFpFBccQM?feature=oembed](https://www.youtube.com/embed/5TRFpFBccQM?feature=oembed)

> Redis, memcache

### CDN(content Delivery network)

- `CDN` is a network of geographically dispersed servers used to deliver static content.
- [https://www.youtube.com/embed/RI9np1LWzqw?feature=oembed](https://www.youtube.com/embed/RI9np1LWzqw?feature=oembed)
- Static content can be
	- JavaScript, CSS, images or/and Videos.
- How `CDN` works at the high-level
	- a user visits a website, -> makes a request
	- A `CDN` server closer to the users deliver the contents
	- NB: the further a `CDN` server from a user is the slower the website loads
- Consideration when using `CDN`
	- Cost, `CDN`s are provided by third party
	- Set precious cache expiration policy that is neither too long nor too short
	- make sure the app can also operate under `CDN` failure

>  Cloudfront, akamai

### Message Queue

![](https://miro.medium.com/max/1400/1*gdI9UekGEfg6CQWsYBZYsg@2x.png)

- a message queue is a durable component, stored in memory that supports asynchronous communication
- used to handle time taking operations, such as
	- compression of user profile images/ generating a thumbnail
	- sending batch emails to several users
- Part of message queue
	- Producers:
		- create messages and publish them to a message queue
	- Consumer/Workers
		- connect to the queue and perform actions based on the message
	- Message queue
		- `MQ` can operate in absence of one of the components
		- if consumer is absent
			- produces will keep posting on to `MQ`
		- if producer is absent
			- consumers will keep operation with what is in `MQ`
- Notes on the scalability?
	- The producer and the consumer can be scaled independently.
	- When the size of the queue becomes large, more workers(Consumers) are added to reduce the processing time.
	- However, if the queue is empty most of the time, the number of workers can be reduced.

> RabbitMQ

## Evaluations

### Loggin, Metrics and Automation

- These tools are essential when your system is big and not easy to easily keep track
- ==Logging==
	- log errors and problems
	- logging can happen at per server level or user tools to aggregate them to a centralized service for easy search and viewing
- ==Metrics==
	- collect different metrics to help gain business insights and understand health status of the system
	- Examples
		- Users, number of active users
		- CPU or IO performance
		- DB, cache performance
- ==Automation==
	- automate what can be automated to save time and increase productivity
		- Use CI/CD
