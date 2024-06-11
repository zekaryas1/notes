---
title: 03 - HOW TO START
date created: Thursday, September 29th 2022, 7:46:13 pm
date modified: Sunday, March 17th 2024, 4:06:25 pm
---

# 03 - HOW TO START

## TL:DR Steps Summary

1. Ask questions to narrow down the question
	- end with
		- Functional requirements and
		- Non functional requirements
2. Do back of the envelop estimation
3. Start Fundamental design
	- Propose you solution using a single server setup only
	- System can be divided into front-end -> back-end -> database
	- Outline simple communication methods i.e API request types, database schema
	- Confirm Use of third-party tools
		- unless asked to design blob storage, confirm if you can use i.e S3
		- unless asked to design CDN, confirm if you can use i.e Amazon cloud front
4. Deep dive
	- Time to think about how to scale each parts separately
	- How to scale back-end servers
		- decide should we scale vertically or horizontally
			- if scaling horizontally(use multiple web-servers)
				- load balancer to evenly distribute traffic among the multiple servers
				- when using multiple web-server extract sessions into a separate global database
		- if there is time-taking task consider message queue
	- How to scale the database?
		- decide should we go with replication, partitioning or both
			- if replication(master-slave replication)
			- if partitioning, you have to choice vertical or horizontal partitioning{`sharding`}
		- Consider database choices between *SQL or NoSQL* carefully?
	- Think about performance and security optimization?
		- speed up load/response time
			- use cache to speed up DB operation or for complex DB operations
			- use CDN to increase page load time/ front-end load time
		- consider Logging and Metrics to keep track of what is going on with your system and consider Automation to save time.
5. Wrap up
	1. Talk about what can be improved, What seems a bottleneck  

## How to Approach System Design Interviews

- [System Design Interview: A Step-By-Step Guide - YouTube](https://www.youtube.com/embed/i7twT3x5yv8?feature=oembed)

## Understand the Problem, with Q&A

### Scope the Problem

- put a boundary on the problem, usually system design questions are vague and broad scoped
- ask, why, who, how and any form of question to better understand the system
- For example, for `tinyurl` system design, questions can be
	- is short URL auto-generated or from user input or both?
	- is keeping track of stats i.e. click and surge on the URLs needed?
- At the end create two requirements
	- functional requirements(what the user needs)
	- non-functional requirements(what the system needs, ex: consistency)

> Being asked to "design YouTube" can be a very broad challenge, but after scoping it, the questions can be narrowed down to specific aspects such as user interface design, content recommendation algorithms, monetization strategies, and community engagement features.

### Make Reasonable Assumptions

- make assumptions about memory, number of users
	- How fast does the company anticipate to scale up?
	- What are the anticipated scales in 3 months, 6 months, and a year?
> aka: back of the envelop estimation

## Draw the Fundamental Components

- Front-end, back-end and other parts
- API endpoints, user-interface designs
- outline how they interact (Component diagram)
- specify how users interact with the system/front-end
	- ex: user sends a URL -> it then goes to back-end -> and the back-end…

## Deep Dive

- expand your fundamental designs, go even detail
	- scale each component,
		- server - horizontal scaling, vertical scaling, stateless or stateful, load balancer
		- database - shading, replication, caching

## Wrap up

### Identify the Key Issues

- find out the bottlenecks
	- both functional(user-based) and not-functional(system-based) issues
- foresee the future and predict likely issues that might occur
	- example on `tinyurl`
		- some URLs may be accessed more than others
		- a single database may not fit the calculated number of users
		- if your current design supports 1 million users, what changes do you need to make to support 10 million users?

### Redesign the Key Issues

- based on `identify the key issues`, modify your design
- example for the above issues
	- adding a cache will be a reasonable approach for `some urls being accesed frequently`
