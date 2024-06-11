---
title: 15 - Design Google Drive
date created: Tuesday, December 12th 2023, 11:28:24 am
date modified: Sunday, March 17th 2024, 4:09:19 pm
---

# 15 - Design Google Drive

## Step 1: Scope/understand the Problem

- After discussion, your striped down features could be
	- Functional requirements:
		- Add files, any file type
		- Download stored files
		- Sync files across multiple devices
		- See file revisions
		- Share files with other people
		- Send notification when a file is edited, deleted or shared with you
	- Non functional requirements
		- Reliability
			- we don't want to loss people's data
		- Faster sync speed
			- lessen user's frustration
		- Bandwidth usage
			- Don't abuse user's metered data(cost)
		- Scalability
		- High availability

### Step 1.2: Back of the Envelope Estimation

- DAU = 50 mil
- 10GB free space per user
- 10 mil of DAU user uploads 2 files per data, averaging 500 kb
- 1:1 read to write ratio
- Total space needed
	- 50 mil * 10GB = 500 Petabyte
- QPS(Write QPS)
	- 10 mil * 2 uploads / 24 hours / 3600 seconds = ~240
- Peak QPS
	- QPS * 2 = 480

## Step 2: High Level Design

- Start with a single server, the server might container
	- a MySQL database
	- a server to accept download and upload request
	- a free space ex: 1TB
- API structure
	- upload url
		- /domain/upload
	- download url
		- /domain/download/file_name
	- revision url
		- this is: endpoint to get file history
		- /domain/file_name/revisions?limit=20
		- returns file_name's history with 10 limit
	- Authentication is needed to execute the above requests
- Single server issue and possible solution
	- You can not put everyone's file on a single server, storage limit
	- You can consider two solutions
		- have multiple servers and share storage
			- cons:
				- doesn't have replication, loss of data in case of server outage
		- facilitate external storage services, like Amazon S3
			- pros:
				- has same and cross region replication, increasingly reduces data loss due to server outage
- How would the system flow look like in this distributed implementation?
	- A user sends a request
	- A load balancer gets the request and forwards to one of the multiple servers
		- Single server to handle all requests isn't enough,thus we will roll multiple stateless servers
		- Decouple the database form server
			- Since we are using multiple servers, we need to decouple and make the database scalable on its own and add additional measures(replication)
	- A server stores the file to s3 then store the metadata to a database
- How cloud storage works briefly or What is Block storage?
	- Ans: Block storage
		- Bloc storage is a technology to store data files on cloud-based environments
		- A file can be split into several blocks, each with unique hash value
		- As for block size, Dropbox uses maximal size of 4-MB for a single block
		- Each block is treated as an independent object and stored separably.
		- To reconstruct a file, blocks are joined in a particular order
- Sync conflicts
	- when does sync issue arise?
		- when two users/clients try to modify the same file or folder at the same time.
	- How to we resolve conflict issues?
		- First committer wins
		- Second comer gets conflict response and has to resolve the issue with either merge or override

## Step 3: Deep Dive

- Components to dive into
	- Block servers
	- metadata database
	- upload flow
	- download flow
	- notification service
	- how to save storage space
	- failure handling
- Block storage
	- how does a block server work?
		- When a block server receives a file, it does the following tasks
			- Split the file into smaller blocks, can be 4-MB each
			- Compress the sub-blocks using file compression algorithms(i.e gzip, bzip2)
			- encrypt each sub-blocs before it is sent to cloud storage
			- upload sub-blocks to cloud storage
	- We don't need to send the whole file on each update?
		- what is the problem
			- For large files that are updated regularly, sending the whole file on each update consumes a lot of bandwidth, a solution we can propose here is `Delat sync`
		- Delta sync
			- When a file is modified, only modified blocks are sync instead of the whole file using sync algorithm
		- Delta sync flow? (very simplified)
			- A new file arrives at block server
			- block server breaks it down to chunks
			- block servers identifies new(updated) chunks(sub-blocks) after comparison, others are the same as before
			- block server sores only the updated chunks on cloud storage
			- ex:
				- there already exist a movie stored, a new update is being uploaded, but only part from 45 - 50 min is updated, so you only store this new version
				- when user tries to download the new version movie we we send old movie(0-45), new version(45-50), old movie(50 - end)
	- Block servers allow us to save network traffic by providing delta sync and compression.
- Metadata database
	- Why we should use SQL?
		- We need a system that requires strong consistency, because it is unacceptable for a file to be shown differently by different clients at the same time
		- For this reason we will prefer SQL databases with ACID properties instead of NoSQL databases.
	- What would out scheme look like?
		- User table: `{name, email, photo_url}`
		- Device: `{user_id, device_id, notification_push_id}`
		- file: `{id, name, owner_user_id, path}`
		- file_version: `{file_id, version_num, last_modified}`
		- block: `{block_id, file_version_id, block_order}`
- Upload flow
	- A user uploads a file to API server
		- What performance improvements can we do when uploading?
			- instead of uploading a whole ex: 10 GB file a user submits which will use a lot of bandwidth,
			- we break down the file into different chunks, and upload them
			- pros:
				- Doesn't take a lot of bandwidth
				- If upload failed we can resume form where we left off, without wasting lot of resource.
	- API server send the file to block server
	- Block servers chunk the files into blocks, compress, encrypt the blocks, and upload them to cloud storage.
	- Once the file is uploaded, cloud storage triggers upload completion callback. The request is sent to API servers.
	- File information is stored in metadata DB
	- The notification service notifies relevant clients that a file is fully uploaded.
- Download flow
	- Api server gets a call to download a file
	- Api server calls metadata DB to fetch metadata of the changes
		- metadata contains all blocks
	- Api server sends requests to block server to download blocks
	- Block server downloads blocks from cloud storage and constructs the file
	- Api server returns the constructed file.
- notification service:
	- why do we need a notification service?
		- To inform any mutation of a file performed locally to other clients to reduce conflicts.
		- At the high-level, notification service allows data to be transferred to clients as events happen.
		- Here are a few options
			- Long polling: one way communication
			- Web Socket:
				- Web socker provides a persistent connection between the client and the server. Communication is bi-directional
- Save storage space
	- when saving multiple version of the same file, don't store duplicate data.
	- limit the number versions a file can have, if the version limit is exceeded we delete the old ones
	- Moving infrequent(data that has not been active for months or years) data to cold storage
		- i.e Amazon S3 glacier
- Failure Handling
	- How to handle a load balancer failure?
		- have active - passive implementation
		- the passive server monitors the active servers heartbeat, if the heart beat is not received for some time the passive will make itself active.

## Readme

- [Youtube design Google drive](https://youtu.be/jLM1nGgsT-I)
- [Differential synchronization](https://www.youtube.com/watch?v=S2Hp_1jqpY8)
- [How we scaled Dropbox](https://youtu.be/PE4gwstWhmc)
