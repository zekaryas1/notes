---
title: WebRTC
date created: Tuesday, January 24th 2023, 2:40:30 pm
date modified: Wednesday, January 25th 2023, 4:29:18 pm
---

# WebRTC

- what is webrtc
	- web real time communication
	- find a peer to peer path to exchange video and audio in an efficient and low latency manner
	- standardized API
	- enables rich communications browsers, mobile, IOT devices
	- a set of JavaScript API's that allow us to establish peer to peer connection between two browsers to exchange data such as audio and video in real time.
- how webrtc works
	- let say we have two users, A and B
	- a wants to connect to B
	- A finds out all possible ways public can connect to it
	- B finds out all possible ways the public can connect to it
	- A and B signal this session information via other means
		- ex: QR, Tweet, WebSockets, HTTP Fetch…
	- A connects to B via the most optimal path
	- A & B also exchanges their support media and security
- NAT
	- network address translator
- websockets vs webrtc
	- websocket
		- real time communication through server
		- high latency = slow -> bad
			- since we've a server in the middle of clients
	- webrtc
		- real time communication between browsers, Data never touches servers
		- low latency = fast -> good
			- since no server it all between browsers
- pros and cons of webrtc
	- pros
		- uses UDP thus fast
		- great for real time communication such as
			- live video, chat….
	- cons
		- again used UDP thus not reliable
			- udp doesn't validate data
		- no built in signaling
			- this is up to us…and this where we can use websockets
- what exactly is sent between the two clients and how is it sent?
	- SDP: session description protocol
		- information about your network and how to connect to you
	- ICE candidates: a public ip address and port that could potentially be an address that receives data
		- ip + port to receive data
		- to get this information you need to ask stun servers, which can be a free google server or one you have to provide
- The steps to initializing webrtc connection
	- A sends an SDP session to B
		- A -> hey!, i want to connect to you B and this is my SDP
	- B acknowledges and sends a response SDP
		- B -> ok we can connect A, and here is my SDP
	- A then asks stun servers for its public ip address(ICE information)
		- A -> hey stun server what is my ip address
		- then sends it to B
	- finally, B as well asks it's stun server for ICE information and sends it to A
	- Data can now start to transfer
