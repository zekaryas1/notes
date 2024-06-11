---
title: 07 - DESIGN A UNIQUE ID GENERATOR
date created: Saturday, March 11th 2023, 3:43:49 pm
date modified: Sunday, March 17th 2024, 4:08:20 pm
---

# 07 - DESIGN A UNIQUE ID GENERATOR

## Introduction

- why do we need unique id generator?
	- for unique identification
	- can be used for hashing in distributed computing

## 1. Scope the System

- after asking different questions, one might have a definition like these
	- IDs must be unique.
	- IDs are numerical values only.
	- IDs fit into 64-bit.
	- IDs are ordered by date.
		- contains time information
	- Ability to generate over 10,000 unique IDs per second.

## 2. Propose High-level Design

- There are pre-existing solutions we can consider to generate a distributed unique id
	- Universal unique identifier (UUID)
	- Ticket server, similar to Multi-master replication
	- Twitter snowflake approach

### UUID

- uuid is a randomly generated 128-bit number used to identify information in computer system
- uuid has a very low probability of getting collusion
- pros
	- generating id is very easy, no need to coordination between servers
	- easy to scale since server are independent
- cons
	- ids are 128 bits long, but we need 64 bits
	- id do not go up with time
	- ids could be non-numeric

### Ticket Server

- the idea with ticket server
	- is to use a centralized auto_increment feature in a single database server *aka ticket server*
- pros
	- numeric ids
	- easy to implement
- cons
	- single point of failure. to solve this we can consider
		- backup servers,
		- multiple ticket servers, but this also bring the challenge of data synchronization problems…
- [Ticket Servers: Distributed Unique Primary Keys on the Cheap | code.flickr.com](https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/)

### Twitter Snowflake Approach

- how snowflake works
	- it is based on divide and concur topic
	- instead of generating an ID directly, we divide an id into different sections.
- pros:
	- number id
	- easy to implement
	- time sortable
- snowflake parts
	- ![](https://miro.medium.com/v2/resize:fit:1200/0*zgoVKDg2-q9gmU1E.png)
	- The first 41 bits are a timestamp, representing milliseconds since the chosen epoch.
	- The next 10 bits represent a machine ID, preventing clashes
		- its possible for two machines to generate the same timestamps, machine and data-center id will help differentiate.
		- data-center/machine can also be
			- just 10 bits server_id(worker_id)
			- server id/process id
			- process id/thread id
		- AWS/docker can give you unique id to a machine
	- 12 more bits represent a per-machine sequence number, to allow creation of multiple snowflakes in the same millisecond.
		- within two consecutive milliseconds multiple request can arrive to the same machine,
		- 2^12 = 4096, sequence number rolls over to 0 every 4096

## Readme

- [Announcing Snowflake](https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake.html)
- [Generating unique IDs in a distributed environment at high scale | CalliCoder](https://www.callicoder.com/distributed-unique-id-sequence-number-generator/)
- [Snowflake ID - Wikipedia](https://en.wikipedia.org/wiki/Snowflake_ID)
- [Sharding & IDs at Instagram. With more than 25 photos and 90 likes… | by Instagram Engineering | Instagram Engineering](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)
