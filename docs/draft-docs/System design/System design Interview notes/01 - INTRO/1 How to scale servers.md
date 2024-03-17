---
title: 1 How to Scale Servers
date created: Wednesday, February 1st 2023, 2:15:39 pm
date modified: Sunday, March 17th 2024, 11:36:08 am
---

# 1 How to Scale Servers

![](https://www.cloudzero.com/hubfs/blog/horizontal-vs-vertical-scaling.webp)

## Vertical Scaling

- aka `scale up`
- process of adding more power (CPU, RAM, etc.)
- pros
	- when traffic is low, vertical scaling is a good option
- cons
	- has a hard limit, impossible to keep adding CPU to infinity-
	- single point of failure with no redundancy
- [Case Study: How Stackoverflow's monolith beats microservice performance.](https://www.linkedin.com/pulse/case-study-how-stackoverflows-monolith-beats-navjot-bansal/)
	- [Performance - Stack Exchange](https://stackexchange.com/performance)

## Horizontal Scaling

- aka `scale out`
- process of adding more servers
- pros
	- scale-able
	- more desirable for large scale applications
- cons
	- costly
	- more complexity
- case study
	- Kubernetes

## Load Balancer

- a load balancer evenly distributes incoming traffic among web servers that are defined in a load-balanced set
- [Types of load balancers Load Balancing](draft-docs/System%20design/System%20design%20Interview%20notes/01%20-%20INTRO/0%20TERMINOLOGIES.md#Load%20Balancing)
- case study
	- [Loadbalancing with ngnix](https://medium.com/@philosophyotaku/using-nginx-as-load-balancer-with-node-js-express-63b39948f737?source=homepage_reading_list---two_column_layout_sidebar------1----------------------------)

## Stateful Vs. Stateless Architecture

- When dealing with horizontal tier how can we keep states such as server session data?
- ==State== -> global data every server want to access
- ==Auto-scaling== -> process or adding and removing servers based on traffic load.

### Stateful

- When the server processes requests based on the information relayed with each request and information stored from earlier requests
	- this means that the server must access and hold onto state information(sessions) generated during the processing of the earlier request;
	- this constraints other related requests to be forwarded to this single server
- Hard to auto scale

### Stateless

- The server processes requests based only on information relayed with each request and doesn’t rely on information from earlier requests
	- this means that the server doesn’t need to hold onto state information between requests
	- this enables requests to be sent to other available servers, making the architecture scale-able
- But what if the nodes require state information ex: related to authentication
	- a good practice is to store state in the separate global database (SQL or NoSQL)
	- any node that require state information can get it from this database
- Easier to auto-scale
