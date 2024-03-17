---
title: 05 - CONSISTENT HASHING
date created: Thursday, February 9th 2023, 11:07:16 am
date modified: Sunday, March 17th 2024, 4:06:47 pm
---

# 05 - CONSISTENT HASHING

## What is Consistent Hashing

- [Consistent Hashing | Algorithms You Should Know #1 - YouTube](https://www.youtube.com/embed/UF9Iqmg94tk?feature=oembed)
- To achieve horizontal scaling, it is important to distribute requests/data efficiently and evenly across servers.
- Consistent hashing is a commonly used technique to achieve this goal.

## The Re-hashing Problem

> imagine we're building a distributed caching system
- the problem with simple hashing methods such as `hash(key) % N`, happens when a new server is added or when server is removed.
- in horizontal distributed system we want a requests from the same client to be forwarded to the same server, this is important because
	- *Cache Consistency*: When a request is served by the same server that previously cached the data, it ensures cache consistency. If different servers handled the same request, they might have different versions of the cached data, leading to inconsistencies and potential issues with data integrity.
	- *Improved Performance*: Caching systems are designed to provide faster access to data compared to fetching it from the original data source. When the same server handles the same request, it can quickly retrieve data from its local cache, resulting in improved overall system performance.
- with the previous hashing function `hash(key)%N`, when a server is added or removed, request will be forwarded to other random server, this will cause
	- re-calculation of mapping each request to a new server
	- a storm of cache misses. *cache for clientA that was previously stored in server1 won't be reachable after new mapping*
	- because on the a new mapping, a need for data shuffling, *data belonging to clientA on server 1 needs to be moved to a new server map*,
		- this will cause a heavy computation, because most probably we'll end up moving a lot of data between servers.
	- *Consistent hashing is an effective technique to mitigate this problem.*

## Consistence Hashing

- Consistent Hashing helps us in effective organization and distribution of resources by ensuring minimum reorganization of requests in any failure.
- In Consistent Hashing, a hash function is used to map servers to locations in a virtual ring.
- The position of the server is just a random position obtained using the hash function.

## How Consistence Hashing Works

Consistent Hashing is organized in the following manner:

1. The servers are hashed using their IP addresses and assigned positions on the ring, based on the output of hash function.
2. Similarly, keys(ex: user ip) are hashed to positions using the same hash function and placed in the virtual ring.
3. They map keys with the server having the same position, and in case the position doesn’t match, then assign the key to the first server that we get while moving in a clockwise direction.

> With this approach adding or removing a server will only require redistribution of a fraction of keys.

> A coordinator server such as zookeeper can help us hold information such as how many server we have, what our mapping is….

## Issued with Consistence Hashing

- with non-uniform key distribution, it is likely a single server of a set of servers will get most requests and other servers will stay idle.
- To deal with this,
	- we replicated and arranged all servers at different positions in the ring. *these nodes are called virtual nodes*
	- In this manner, with an increased number of servers, the distribution becomes much more uniform and helps in the service’s scaling.
- ![](https://cdn-images-1.medium.com/max/800/1*XkPxtQv-H4qJ-cHXueyw-w.png)

## Readme

- [Fetching Title#jicu](https://discord.com/blog/how-discord-scaled-elixir-to-5-000-000-concurrent-users)
