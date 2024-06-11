---
title: 16 - Reading continues
date created: Monday, December 18th 2023, 9:16:14 am
date modified: Sunday, March 17th 2024, 4:09:25 pm
---

# 16 - Reading Continues

## HTTP, Polling, Web-socket

- [What are Long-Polling, Websockets, Server-Sent Events (SSE) and Comet? - Stack Overflow](https://stackoverflow.com/a/12855533)

### HTTP

- a one-directional message transfer protocol between a client and a server
- flow:
	- a client sends a request to server
	- server responds with a response
	- client again sends a new request…

#### Short Vs Long Polling

- Both
	- Client implementation on top of HTTP
	- Can make Server busy and can waste resource
- Short poling
	- a client regularly pulls information from a server
	- ex
		- periodically pulling pinging server to check if a server is online or offline
		- can be implemented on client side by using `setTimeout()`
- Long polling
	- when a client makes a request to server, the server waits until there is a data to give back.
	- can be used to implement real-time applications, but nowadays web-socket is a better alternative.
	- ex:
		- if you make a request to server to check if there is a new version of a file, the server waits until some other user makes a file update.
		- can be implemented on server by storing client's request on data-structure and responding when there is a new update.
		- [How to use long polling in native JavaScript and node.js? - Stack Overflow](https://stackoverflow.com/a/45854088)

### Web Socket

- Once the connection is established using web-socket, either side can send messages to the other at any time.
- This allows for real-time bidirectional communication without the need for repeated requests.
- HTTP is used only for connection establishment, after that the web-socket protocol is used.
- flow
	- a client established a connection with server
	- both(client and server) can send each other messages anytime.
- ex:
	- chat application, real-time gaming leader-board

### Server-Sent Events (SSE)

- Aka: Event Source
- With server-sent events, it's possible for a server to send new data to a web page at any time, by pushing messages to the web page.
	- These incoming messages can be treated as _[Events](https://developer.mozilla.org/en-US/docs/Web/API/Event) + data_ inside the web page.
- Depends on HTTP but has its own protocol.
- Can be considered as half part of web-socket, which support both client and server sending each other data at any time.
	- use SSE if you want only server sending data at real-time.
- ex:
	- [Using server-sent events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
