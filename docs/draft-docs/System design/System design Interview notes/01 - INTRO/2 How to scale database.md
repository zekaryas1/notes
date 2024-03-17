---
title: 2 How to Scale Database
date created: Wednesday, February 1st 2023, 2:17:33 pm
date modified: Sunday, March 17th 2024, 11:37:35 am
---

# 2 How to Scale Database

> The concept of database scaling is similar to [1 How to scale servers](draft-docs/System%20design/System%20design%20Interview%20notes/01%20-%20INTRO/1%20How%20to%20scale%20servers.md), we can't keep adding more power to single database(more ram, cpu…), we need to find ways to distribute the database horizontally to multiple instances efficiently.

- Two ways to scale database
	- Replication ex: *master slaves or leader followers*
	- Partitioning *aka horizontal scaling for databases*

## Database Replication

- Database replication can be used in many database management systems
- ![](https://miro.medium.com/max/1400/1*x0rxTJ4wxdWOnmLNmWm-kQ.png)
- master/slave(leader/follower) database replication is one of the easiest database replication technique
	- purpose of master
		- only supports write operations
		- handles only insert, delete and update commands
	- purpose of slave
		- get copies of the data from master database
		- handles only read operation
	- How many master or slave nodes do we need
		- depends on the system at hand, if the system is more write heavy we will need more slave nodes than master nodes
	- Advantages of database replication or (leader/follower) DB replication
		- `Performance` as read operation can be handled by multiple servers
		- `Reliability`: if a follower/slave node fails there are other nodes to replace than node

## Database Partitioning

- [Data Partitioning (Sharding) in System Design](https://www.enjoyalgorithms.com/blog/data-partitioning-system-design-concept/)
- With database replication we're still keeping the same data across multiple database servers but this can eventual cause storage overload
- ==Partitioning==: means splitting the data across multiple machines while ensuring you have a way of figuring out which data is on which machine

>Think of it like a pizza. With replication, you are making a copy of a complete pizza pie on every server. With `Partitioning/sharding`, you’re sending pizza slices to several different replica sets. Combined together, you have access to the entire pizza pie.

- Partitioning techniques?
	- Vertical partitioning
	- Horizontal partitioning/`Sharding`
		- sharding is one specific kind of partitioning where we use a key to divide the data.
			- Directory based
			- key(hash) based
	- Combined

> Sharding = horizontal partitioning(when use use key in a row)

### Vertical Partitioning

- ![](https://s33046.pcdn.co/wp-content/uploads/2014/04/VerticalPartitioning.png)
- aka `partitioning by feature`. column based Partitioning
- for instance,
	- Facebook can be vertically partitioned to users, posts, and friends.
- cons:
	- one of the partition can experience huge load, requiring another partitioning
		- Breaking Employee table to `Employee profile` and `Employee address`

### Directory Based Partitioning

- ![](https://miro.medium.com/max/1400/0*fS-UeLqeWblh64RR.gif)
- keep a directory or lookup table to locate where data is
- for instance,
	- table-1 for posts with id {1-1000}. table-2 id {1000-2000}
	- table-1 for country with starting letter `{A-M}`, table-2 `{M-Z}`
- pros:
	- easy to add new server
- cons:
	- single point of failure, it all depends on the lookup table
	- constant access of the lookup table, can overwhelm the server

### Key-based (hash based) Partitioning

- uses some part of the data(for example an ID) to partition the data
- a very simple way to do this is to allocate N server and put the data on `mod(key %n)
- cons:
	- when adding new servers, we need to run the hashing function again, moving data again

### Combined Partitioning

- Sometimes the best approach is to use is multiple partitioning techniques to achieve the desired result

### Challenges with Partitioning

- Re-Partitioning is a heavy task
	- This happens when a partition could no longer hold more data due to rapid growth
	- Certain partition experience exhaustion faster than others due to uneven data distribution
	- When partition exhaustion happens
		- updating the partition function is required
- join and de-normalization
	- when data is across multiple servers, it is hard to perform join operations
	- Solution
		- consider de-normalization
- Failure of a single partition
	- if a single partition that was handing users with id {1-1000} fails, it way make those people unable to access the system
	- Solution is replication
		- backup partition in case of failures
		- [Read more: Using Partition with Replication](draft-docs/System%20design/System%20design%20Interview%20notes/01%20-%20INTRO/2%20How%20to%20scale%20database.md#Using%20Partition%20with%20Replication)

### Using Partition with Replication

- We use replication to achieve better availability and backup,
	- but it costs performance
		- i.e time to distribute new data to every nodes and storage
- partition can be used to efficiently distribute data across multiple machines, as result better performance,
	- aka, no need to replicate new data and more scale-able
- A technique to use both together is, to go with partition initially and keep backup db in case of the partition failure

## SQL Vs NoSQL

### SQL

- relational database
- for data with clear and stable definition/`fixed schema`
- join operations is possible/ `complex queries possible`
- scales vertically
- example:
	- `MysQL`, oracle and `postgreSQL`

### NoSQL

- non-relational heavy database
- for data that will likely evolve and not clear yet/ `dynamic schema`
- join operations not supported on all `NoSQL` options/ `complex queries not well supported`
- scales horizontally
- can be grouped into four categories:
	- Key-value stores
	- graph stores
	- column based stores
	- document stores
- example:
	- `CouchDB`, `Neo4j`, Cassandra, HBase. and Amazon DynamoDB

> NoSQL DBs are scale-able can store a massive amount of data
