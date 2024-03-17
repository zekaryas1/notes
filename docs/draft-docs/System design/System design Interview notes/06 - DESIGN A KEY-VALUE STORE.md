---
title: 06 - DESIGN A KEY-VALUE STORE
date created: Monday, February 13th 2023, 1:44:25 pm
date modified: Sunday, March 17th 2024, 4:06:56 pm
---

# 06 - DESIGN A KEY-VALUE STORE

## What is Key Value Store

- aka key-value database is a non-relational database.
- key which is a unique identifier is stored with its associated value.
	- this association is called key-value pair.

## Properties of Key-value Pair

- key must be unique, and the value associated with it must be accessible via the key.
- key can be a plain text or hashed values.
	- key must be immutable!?
- value can be string, list, objects, etc…

## The Questions

> design key-value store that supports two operations put(key, value) and get(key)

## Scope the System

- functional requirements
	- supports two operations put and get
- non functional requirements
	- ability to store big data
	- high availability
		- the system can responds even during failures
	- high scalability
		- the system can be scaled to support even large dateset
	- automatic scaling
		- the addition/deletion of server should be automatic based on traffic
	- tunable consistency: configurable consistency
	- low latency

## High Level Design

### Single-server Key-value Store

- store the key-value pairs in a hash-table, which keeps everything in memory.
- pros
	- access is fast since it from memory
- cons
	- storage is limited to one server, thus can't keep adding more data.
	- *solution: considering distributed hash-table(key-value) design*

### Distributed Key-value Store

- aka distributed hash table
- distributed system has to make a decision on which side to take (availability, or consistency) from [CAP Theorem](draft-docs/System%20design/System%20design%20Interview%20notes/01%20-%20INTRO/0%20TERMINOLOGIES.md#CAP%20Theorem)

## System Components

### Data Partition

- as discussed it is difficult to fit the whole data in to a single server.
- *solution*
	- split the data into smaller partition and store them on multiple servers
- challenges of the above solution, are while partitioning we need to consider
	1. to distribute data across multiple servers evenly
	2. minimize data movement when nodes are added or removed
- to solve the above challenges, we might consider [05 - CONSISTENT HASHING](draft-docs/System%20design/System%20design%20Interview%20notes/05%20-%20CONSISTENT%20HASHING.md)
	- create a hash ring, place servers and key on it, key is stored/associated with the first server clockwise.
- advantages of using [05 - CONSISTENT HASHING](draft-docs/System%20design/System%20design%20Interview%20notes/05%20-%20CONSISTENT%20HASHING.md)
	- automatic scaling - we can add/remove servers with minimum trouble
	- virtual nodes - we can add virtual nodes to increase performance

> put(key, value), key is hashed and place/located on the ring, and we put the value to the first server we find

### Data Replication

- extending the above [05 - CONSISTENT HASHING](draft-docs/System%20design/System%20design%20Interview%20notes/05%20-%20CONSISTENT%20HASHING.md) solution, to achieve high availability and reliability, we can replicate asynchronously over N servers.
	- N is a configurable parameter, it can be 3, 10…
- How this works
	- *put(key, value) -> instead of just putting the value on the first server we find, we replicate the data to next N server we find clockwise*
- things to consider when replicating the data?
	- keep replicating data to unique servers only, otherwise duplication is possible to occur due to *virtual servers* presence around the ring.
	- consider placing replicas in different data center, as nodes in the same data center often fail at the same time

### Consistency

- since data is replicated at multiple nodes, it must be synchronized across replicas.
- this means, since we have replicated data, the operations we do on one server must be replicated to the other replica servers too.
	- one reason for this importance could be servers could be using a cache which will be affected by every read/write operation.
	- and operation happening on server A, must also happen to all it's replicas
- This bring to discussion of complex topics such as
	- which consistency models to use
		- strong, weak, eventual or casual consistency models
		- based on model which consistency algorithm to use
		- [Consistency Models](draft-docs/System%20design/System%20design%20Interview%20notes/06.1%20-%20More%20on%20CONSISTENCY.md#Consistency%20Models)
	- conflict resolution mechanism
		- with same data existing and being updated in multiple places
		- how do you resolve conflict(which happened before)
			- Machine Timestamps, `Lamport` clocks, Vector clicks timestamps
		- [Conflict/Inconsistency Resolution with Versioning](draft-docs/System%20design/System%20design%20Interview%20notes/06.1%20-%20More%20on%20CONSISTENCY.md#Conflict/Inconsistency%20Resolution%20with%20Versioning)
	- how to detect and handle failures
		- [How to Detect Failures](draft-docs/System%20design/System%20design%20Interview%20notes/06.1%20-%20More%20on%20CONSISTENCY.md#How%20to%20Detect%20Failures)

## Readme

- [https://www.youtube.com/watch?v=iuqZvajTOyA](https://www.youtube.com/watch?v=iuqZvajTOyA)
