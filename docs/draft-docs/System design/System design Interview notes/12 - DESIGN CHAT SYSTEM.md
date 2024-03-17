---
title: 12 - DESIGN CHAT SYSTEM
date created: Monday, September 4th 2023, 11:30:56 am
date modified: Sunday, March 17th 2024, 4:09:03 pm
---

# 12 - DESIGN CHAT SYSTEM

## Step - 1: Scope the System

- what kind of chat system
	- group(slack), 1-1(messenger), 1-many(channels)…
- After asking questions, you might have the following information:
	- the system should support 1-1 and group chat
	- supports mobile and web
	- how many daily active users? => 50 mil DAU
	- group member limit? 100 people
	- what content is supported? message is only text
	- other important detail?
		- online indicator
		- push notification

## Step - 2: High Level Design

- the high level design can will have 3 components
	- sender
	- chat service
	- receiver
- chat service responsibilities?
	- receive messages from sender
	- find the right receiver
	- if receiver is online
		- send automatically
		- else: hold the message
- the communication protocol
	- the sender can use HTTP to send message to `chat service`
	- chat service:
		- can't user HTTP since HTTP is only client-initiated, it doesn't have push technique
		- other alternatives?
			- polling(pulling)
				- client periodically asks the servers for new messages
				- frequency matters(every 2s, 2min…)
				- cons: wastes server resource, makes them busy
			- long polling
				- same as polling except, long polling keeps both client's connection alive until a new messages arrives or a timeout threshold has been reached.
				- cons:
					- both clients(receiver, sender) need to connect to same server or message must be forwarded to the appropriate server with receiver's open connection
			- **WebSocket**
				- most common for this kind of scenario
				- a bi-directional and persistent
				- connection is initiated by client.

## Step 2 - High Level Design

- most components communication can be HTTP based
	- user registration
	- profile management
	- search
- the rest can be based on `WebSockets`
- Based on the above information we can divide our system into two component
	1. stateless service: services with HTTP
		1. stateless because we don't need users session information at hand
		2. stateless service architecture
			1. request from user
			2. load balancer
			3. service discovery
			4. services:
				1. auth service
				2. group management
				3. profile management
	2. `stateful` services: services with `WebSocket`
		1. stateful because each client holds persistent network connection
		2. only chat service
			1. we can have multiple chat services
			2. clients can connect to different chat services,
				1. receiver and server must be on same server for web socket to work!?
- notification service:
	- integrate with third party-service or [10 - DESIGN A NOTIFICATION SYSTEM](draft-docs/System%20design/System%20design%20Interview%20notes/10%20-%20DESIGN%20A%20NOTIFICATION%20SYSTEM.md)
- summary
	- user sends request
		- statless services for http servers
		- realtime communication(messaging, online/offline indicator) for stateful services
	- notification service through 3rd party
	- storage:
		- choose between SQL vs NoSQL
		- consider using cache for fast access
			- recent messages should be stored in cache as they will be accessed frequently
		- data model
			- message(for 1-1): id, sender, receiver, content, date
			- group_message: group_id, msg_id, content, date
		- what data type for our id?
			- id for data model should be unique and time sortable
			- we can consider
				- auto_increment, but this won't work on NoSQL or distributed system
				- Snowflake id generation can work
				- Instagram unique id generation with db also can work

### Step-3 - Design Deep Dive

- Service discovery
	- Zookeeper for selecting the right chat server for client based on
		- geographical location
		- server capacity
- Message flow for 1-1 messaging
	- user A sends a message to user B
	- id is generated for the message
	- message is stored to storage(either SQL or `NoSQL`)
	- if user is
		- online
			- use `WebSocket` to send direct message
		- offline
			- add a notification to user B device
- Online presence
	- dedicated server called presence server
	- a `websocket` connection is established between user and presence server
	- the server can set user online when there is a connection and set user offline when there is a connection problem
		- we can have another field on user model called last_online: timestamp
	- alternatively we can have user periodically ping presence server, and presence server will mark user as offline if it didn't receive heartbeat after x-sec(ex: 30 sec)
		- This is better that above approach because users are likely to face internet connection problems within a short period of time.

### Read Me

- Erlang and `websocket` connections
- ![Fetching Title#umh4](https://youtu.be/xyLO8ZAk2KE)
