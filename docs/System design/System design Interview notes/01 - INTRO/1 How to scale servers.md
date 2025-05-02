---
title: 1 How to Scale Servers
date created: Wednesday, February 1st 2023, 2:15:39 pm
date modified: Saturday, April 26th 2025, 12:24:28 pm
---

# 1 How to Scale Servers

![](https://web.archive.org/web/20230622131909if_/https://www.cloudzero.com/hubfs/blog/horizontal-vs-vertical-scaling.webp)

## Vertical Scaling

- Aka `scale up`
- Process of adding more power (CPU, RAM, etc.)
- Pros
	- When traffic is low, vertical scaling is a good option
- Cons
	- Has a hard limit, impossible to keep adding CPU to infinity-
	- Single point of failure with no redundancy
- [Case Study: How Stackoverflow's monolith beats microservice performance.](https://www.linkedin.com/pulse/case-study-how-stackoverflows-monolith-beats-navjot-bansal/)
	- [Performance - Stack Exchange](https://stackexchange.com/performance)

## Horizontal Scaling

- Aka `scale out`
- Process of adding more servers
- Pros
	- Scale-able
	- More desirable for large scale applications
- Cons
	- Costly
	- More complexity
- Case study
	- Kubernetes

## Load Balancer

- A load balancer evenly distributes incoming traffic among web servers that are defined in a load-balanced set
- [Types of load balancers Load Balancing](0%20TERMINOLOGIES.md#Load%20Balancing)
- Case study
	- [Loadbalancing with ngnix](https://medium.com/@philosophyotaku/using-nginx-as-load-balancer-with-node-js-express-63b39948f737?source=homepage_reading_list---two_column_layout_sidebar------1----------------------------)

## Stateful Vs. Stateless Architecture

- When dealing with horizontal tier how can we keep states such as server session data?
- ==State== -> global data every server want to access
- ==Auto-scaling== -> process or adding and removing servers based on traffic load.

### Stateful

- When the server processes requests based on the information relayed with each request and information stored from earlier requests
	- This means that the server must access and hold onto state information(sessions) generated during the processing of the earlier request;
	- This constraints other related requests to be forwarded to this single server
- Hard to auto scale

### Stateless

- The server processes requests based only on information relayed with each request and doesn’t rely on information from earlier requests
	- This means that the server doesn’t need to hold onto state information between requests
	- This enables requests to be sent to other available servers, making the architecture scale-able
- But what if the nodes require state information ex: related to authentication
	- A good practice is to store state in the separate global database (SQL or NoSQL)
	- Any node that require state information can get it from this database
- Easier to auto-scale
