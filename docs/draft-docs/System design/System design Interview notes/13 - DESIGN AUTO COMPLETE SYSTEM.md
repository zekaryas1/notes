---
title: 13 - DESIGN AUTO COMPLETE SYSTEM
date created: Thursday, October 26th 2023, 9:03:30 pm
date modified: Sunday, March 17th 2024, 4:09:09 pm
---

# 13 - DESIGN AUTO COMPLETE SYSTEM

- Auto complete is also sometimes called
	- Typehead
	- Search as you type
	- incremental search

## Step 1 - Ask Questions

- After asking questions you might have the following requirements  
	- low latency  
	- relevant: suggestions should be relevant  
	- sorted:  
		- sorted by popularity or other ranking  
	- highly available and scalable

## Step 2 - High Level Design

- The system can be divided in to two parts
	- data gathering services:
		- record user inputs, so it can be used for future suggestion
	- query service:
		- given query return n(5) top relevant terms
- Data gathering service:
	- db structure
		- query, frequency, ex: `{twitter:35, twitch: 30, twillo: 25}`
- Query service
	- based on the above db structure we can have an SQL query to get relevant terms
	- this will work for small dataset but for a huge dataset a single DB might be a bottleneck.

```sql
select * from db_table
where query like 'tw%'
order by frequency Desc
limit 5

-- given = {twitter:35, twitch: 30, twillo: 25}
-- the above query should result
-- twitter, twitch and twillo in that order based on freq
```

## Step 3 - Deep Dive

- ![trie data structure image](https://www.boardinfinity.com/blog/content/images/2023/02/Trie-1.png)
- Trie data structure
	- instead of a relational database a trie data structure can be a better solution for this kind of search
	- A trie has the following properties
		- A trie is a tree-like data structure
		- the root represents an empty string
		- each node stores a character and can have 26 children
		- each tree node represents a single word or a prefix string
	- How are we sorting searches in trie though?
		- still with frequency
		- we update trie data structure to add frequency to an end of a possible query
	- how do we retrieve the relevant queries from the trie?
		- we get a query
		- we traverse the trie based on the query
		- when we reach the end of the query = aka node
		- return all the end words with their frequency bellow the reached trie node
			- *end word is what users searched before*
		- sort the query based on freq
	- Are there ways to make the retrieval operation any faster?
		- yes
		- cache top search queries at each node
		- each node will cache the top n queries for the nodes below it
			- this operation is similar among multiple runs thus makes sense but need to be careful about cache re-validation
- Data gathering service
	- how are we upading user quries to a trie? or how often?
		- on every user search can be a very inefficient thing to do as users search billions of times per day and updating the trie that many times is bad.
		- for most cases top suggestions might not change so we don't have to be every day
		- so we store user's search queries and apply them to the trie every week or every some interval.
	- how to efficiently store user search to trie?
		- we store users search to a log as we don't update trie per daya
		- logs are aggregated/processed to word: frequency mapping
		- mappings are added to trie DB(actual db)
			- caches might be updated now/every week
	- What an actual db can we use to store tria?
		- usually trie is represented with hash-table when designing, we can use this idea into system design as well
		- key-value ex: redis
		- key: word, value: [words], words in turn point to another key
- How to scale the system
	- sharding, but how
	- there are only 26 alphabets in English, we can split and store queries starting with a in server 1, … queries starting with z on server 26
	- what if a single server becomes too overloaded?
		- introduce second level sharding
		- aa - am to server 1-1, an-az to server 1-2

## Readme

- [How We Built Prefixy: A Scalable Prefix Search Service for Powering Autocomplete | by Prefixy Team | Medium](https://medium.com/@prefixyteam/how-we-built-prefixy-a-scalable-prefix-search-service-for-powering-autocomplete-c20f98e2eff1)
- [https://www.youtube.com/watch?v=kx-XDoPjoHw&t=1s&pp=ygUaZGVzaWduIHRvcCBrIHN5c3RlbSBkZXNpZ24%3D](https://www.youtube.com/watch?v=kx-XDoPjoHw&t=1s&pp=ygUaZGVzaWduIHRvcCBrIHN5c3RlbSBkZXNpZ24%3D)
