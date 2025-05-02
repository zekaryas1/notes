---
title: 0 TERMINOLOGIES
date created: Friday, February 10th 2023, 11:22:45 am
date modified: Saturday, April 26th 2025, 12:19:28 pm
---

# 0 TERMINOLOGIES

## Scalability

- Scalability refers to the capability of a system or application to handle an increasing workload efficiently.
- A system is considered scalable when it can handle increased user traffic or a larger amount of data without experiencing a noticeable degradation in performance.
	- It should be able to scale both vertically (by upgrading individual components/resources) and horizontally (by adding more instances or nodes) to meet the growing needs of users or data volume, while still maintaining responsiveness and reliability.
- Scalability is crucial for systems that expect growth or unpredictable spikes in usage, allowing them to adapt and handle increased demands effectively.
- [How to scale servers](1%20How%20to%20scale%20servers.md)
- [How to scale database](2%20How%20to%20scale%20database.md)

## Availability

- System should always remain up and return the response of a client request.
- Availability is usually quantified in percentage, and counting the number of 9s.
- Availability = UP time / ( UP time + DOWN time)
	- ex: downtime/year = 3.65 days
	- up time = 365(1 year) - 3.65 = 361.35
	- av = 361 / (361.35 + 3.65) = 0.99 (two nines)
- ![](https://ucarecdn.com/c27ec4b7-10ed-4e64-999d-f1d85407df0c/)
- *for better availability consider*
	- redundancy
	- load balancing
	- fail-over mechanisms
	- disaster recovery strategies…

## Consistency

- Consistency means that when you make changes to a piece of data in one part of the system, those changes are immediately visible and reflected accurately in all other parts of the system.
	- This guarantees that users always see up-to-date and accurate information, regardless of which component they are interacting with.
- Different consistency models exist, such as strong consistency, eventual consistency, and eventual strong consistency, each defining specific trade-offs between availability, performance, and synchronization guarantees.
	- The choice of the consistency model depends on the requirements and use case of the system.
- [06.1 - More on CONSISTENCY](../06.1%20-%20More%20on%20CONSISTENCY.md)

## Throughput

- How much request can a system process in a given time frame
	- `ex: 10,000 requests/second`
	- `ex2: 10,000 image compression/second`
- *for better throughput consider*
	- Splitting up requests and distributing to various servers
- *for better latency consider*
	- caching
	- better algorithms
	- better hardware
	- parallel processing -> divide and concur
	- CDN
	- database partitioning
- [Throughput in System Design](https://www.enjoyalgorithms.com/blog/throughput-in-system-design/)

## Latency

- The time spent in generating the desired output
	- `formula = abs(time_packet_arrived-time_packet_left)`
	- `ex1: 10ms to compress a single image`
	- `ex2: 2 sec to respond to a webpage request`
- Latency is ==inversion proportional== to performance of a system,
	- *lower latency == higher system performance*
- What factors influence latency?
	- Routers: how fast the routers can process packets
	- server performance
	- Transmission mediums: ex: Fiber optics is better than WAN
	- Storage delays: the type of storage/db/cache we're using
- *for better latency consider*
	- compression
	- caching
	- database partitioning
	- CDN
- [Latency in System Design](https://www.enjoyalgorithms.com/blog/latency-in-system-design/)

## Load Balancing

- A machines that balances the load/requests among various servers
- To scale a system we need more servers, so there must be a way to direct requests to these servers, in such a manner so that there is no heavy load on one server.
- type of load balancing algorithms
	- static load balancing algorithms
		- Don't consider the state of the servers, don't consider whether a server is busy or not.
		- exs:
			- round robin
			- weighted round robin
			- source IP hash
			- url hash…
	- dynamic load balancing algorithms
		- Consider the state of the server or how busy the server is at the moment
		- This method might require some kind communication with servers
			- pull or push communication
				- Pull, when load balancer periodically pull data from servers
				- Push, when servers periodically ping load balancer their presence
		- exs:
			- least connection method
			- weighted least connection method
			- least response time method…
- [Load Balancing Algorithms](https://www.enjoyalgorithms.com/blog/types-of-load-balancing-algorithms/)

## Proxies

- A middle-man that stands between the client and server.
- A client sends a request -> goes though the proxy -> reaches the server.
- Two types of proxies
	- forward proxy
		- acts as a mask for clients and hides the client's identity
		- ex: VPN
	- reverse proxy
		- acts as a mask for server and hides the server's identity from the response
		- ex: Load balancer, Nginx Reverse proxy
- [Forward and Reverse Proxy in System Design](https://www.enjoyalgorithms.com/blog/proxies-in-system-design/)

## Database Partition

- A way of dividing database into smaller chunks to increase performance of the system.
- A way to improve *latency and throughput* so that more requests are served.
- [Data Partitioning (Sharding) in System Design](https://www.enjoyalgorithms.com/blog/data-partitioning-system-design-concept/)

## Caching

- Storing frequent used data in a memory so that it can be accessed quickly, instead of querying the system.
- *complexity with caching*
	- Cache invalidation -> it's important to maintain consistency between data stored in the cache and data stored in disk, but when to sync them is hard.
	- Cache memory is expansive -> so we need to keep limited cache -> how, by removing least important cache -> various cache eviction algorithms
		- LIFO -> LAST IN FIRST OUT
		- FIFO -> FIRST IN FIRST OUT
		- LRU -> LEAST RECENTLY USED
		- LFY -> LEAST FREQUENTLY USED

## CAP Theorem

- [https://www.youtube.com/embed/BHqjEjzAicA?feature=oembed](https://www.youtube.com/embed/BHqjEjzAicA?feature=oembed)
- states that a distributed database system can only provide two of the three properties.
	- *1. consistency, 2. availability and 3. fault tolerance*
	- We can make trad-off between three available properties based on use cases for our system.
- definition to the 3 properties?
	- consistency?
		- Read operations should give the most recent write operation.
	- availability?
		- System is always available whenever any request is made request should always return a response from server.
	- Fault tolerance? *Aka partition tolerance*
		- System should work irrespective of any harm or breakdown of nodes.
		- Must include of the three properties as this is most likely to happen in real world
			- Therefor design should make decisions about which of the other 2 properties i.e. consistency and availability to focus on.
- Distributed systems cab be classified as CP or AP, based on the decisions they make
	- CP -> consistency and partition tolerance
		- ex: bank systems
	- AP -> availability and partition tolerance
		- ex: online streaming services
- [CAP theorem - Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)

## ACID

- ACID (atomicity, consistency, isolation, durability)
- ACID is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps.
	- *Atomicity*: Ensures that a transaction is treated as a single, indivisible unit, and it either fully succeeds or fully fails, without partial completion.
	- *Consistency*: Guarantees that a transaction takes the database from one valid state to another, preserving the integrity of the data.
	- *Isolation*: Ensures that multiple transactions can occur concurrently without interfering with each other, preventing data inconsistencies.
	- *Durability*: Guarantees that once a transaction is committed, its changes are permanent and will survive any subsequent failures.
- [ACID - Wikipedia](https://en.wikipedia.org/wiki/ACID)
- [Achieving ACID Transactions in a Globally Distributed Database](https://fauna.com/blog/acid-transactions-in-a-globally-distributed-database)

## BASE

- BASE (basically-available, soft-state, eventual consistency)
- aka Eventual consistency, optimistic replication
- A consistency model used in distributed computing to achieve high availability that informally guarantees that,
	- If no new updates are made to a given data item, eventually all accesses to that item will return the last updated value
- [Eventual consistency - Wikipedia](https://en.wikipedia.org/wiki/Eventual_consistency)
