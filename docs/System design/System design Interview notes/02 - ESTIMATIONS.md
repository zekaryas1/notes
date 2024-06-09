---
title: 02 - ESTIMATIONS
date created: Sunday, September 4th 2022, 3:23:36 pm
date modified: Sunday, March 17th 2024, 4:06:30 pm
---

# 02 - ESTIMATIONS

## Tips

- An ASCII character uses one byte of memory (8 bits)
- Commonly asked back-of-the-envelope estimations:
	- QPS => Query per second,
		- Has two parts
			- Write query per second
			- Read query per second. *if not given you can assume read operation is 10 times read operation*
		- peak QPS,
			- 2 * Write Query per second
	- storage,
		- default for 5 or 10 years
	- cache,
	- number of servers, etc.

> the common questions to ask is traffic volume per day (write operations) per day and storage space requirement ex: how long is a URL/tweet, with these we can estimate the other requirements.

## Power of Two

```
Power  Approx Value        Bytes
---------------------------------------------------------------
10     1 thousand           1 KB
20     1 million            1 MB
30     1 billion            1 GB
40     1 trillion           1 TB
50     1 quadrilion         1 PB
-
16                          64 KB
32                          4 GB

```

## Examples

### Example 1 - URL Shortner

> This information are information you get by asking interviewer or researching.

- Given
	- 100 mil URLs are generated per day
	- average url length is 100
- QPS
	- write per sec:
		- 100 mil / 24 / 60 / 60 = 1160
	- read per sec:
		- assuming read write ratio is 10:1
		- 1160 * 10 = 11,600
- Storage
	- storage per day
		- 100 url length(asci) = 100 bytes
		- 100 bytes * 100 mi = 10^2 * 10^8 = 10^10 = 10 \* 10^9 = 10 GB
	- assuming the url shortener service will run for 10 years
		- per day = 100 mi * 100 bytes = 10 GB
		- per year = 10 GB * 365 = 3.65 TB
		- per 10 years = 36.5 TB

### Example 2 - Twitter QPS

- Assuming:
	- 300 million monthly active users.
	- 50% of users use Twitter daily.
	- Users post 2 tweets per day on average.
	- 10% of tweets contain media.
	- Data is stored for 5 years.
- Run back of the envelop calculation on twitter statics
	- QPS
		- DAU(Daily active users) = 300 mi * 50% = 150 mi
		- Writes Query per second = 150 mi * (2 tweets / 24 / 60/ 60) = ~3500
		- Peek Write query per second = 2 * ~3500 = ~ 7500
	- Storage
		- one tweet size
			- id => 64 byte
			- text => 140 byte *140 chars = 140 bytes*
			- media => 1 MB
			- total 1MB, but only 10% contain media, thus total = (10% * 1MB)
		- per day media storage
			- 150 mi * 2(users post 2 tweets per day) * (10% * 1 MB) = 30 TB
				- `150 2^20 * 2 * (0.1 2 ^ 20)`
				- `300 2^20 * 0.1 2 ^ 20`
				- `30 2^40`
				- `30 TB`
		- per 5 years
			- 30 TB /* 365 /* 5 = ~55PB
