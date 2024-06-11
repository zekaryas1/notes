---
title: 14 - DESIGN YOUTUBE
date created: Sunday, December 10th 2023, 3:30:42 pm
date modified: Sunday, March 17th 2024, 4:09:14 pm
---

# 14 - DESIGN YOUTUBE

## Step 1: Scope the System, Be Curious

- The end result can be, design a YouTube like app with the following features
	- Ability to upload videos fast
	- Smooth video streaming
	- Ability to change video quality
	- Low infrastructure cost
	- High availability, scalability, and reliability requirements
	- Clients supported: (mobile, web and TVs)
	- Can leverage "Cloud services" such as AWS, AZURE or GCP

### Need to Understand Concepts

1. **Video Streaming Protocol:**
	- **Definition:** A video streaming protocol is a set of rules and conventions that define how video data is transmitted over the internet for playback.
	- **Function:** It manages the communication between the server (where the video is stored) and the client (the device that plays the video).
	- **Examples:** HTTP Live Streaming (HLS), Dynamic Adaptive Streaming over HTTP (DASH), Real-Time Messaging Protocol (RTMP), and Smooth Streaming.
2. **Video Format:**
	- **Definition:** A video format refers to the container or file format that holds both the video and audio streams. It encompasses how the data is stored, organized, and presented.
	- **Function:** It includes information about the video resolution, frame rate, audio codec, subtitles, and other metadata.
	- **Examples:** MP4 (MPEG-4 Part 14), WebM, AVI, MKV, and MOV.
3. **Codec (Coder-Decoder):**
	- **Definition:** A codec is a software or hardware tool that compresses (encodes) and decompresses (decodes) video and audio data. It determines how the video and audio information is represented and transmitted.
	- **Function:** Codecs are crucial for reducing file sizes for efficient storage and transmission without sacrificing too much quality.
	- **Examples:** H.264 (AVC), H.265 (HEVC), VP9, AV1, AAC (Advanced Audio Codec), and MP3.

### Step 1.2 Back of the Envelope Estimation

- This information can be info you get on Step 1, or from further communication
	- DAU = 5 mil
	- 10% of DAU upload 1 video per day
	- average video length = 300 MB
	- Storage per day
		- (5 mil * 10%) * 300 MB = 150 TB/day
	- CDN cost
		- when a cloud CDN serves a video, you are charged for the data transferred out of the CDN.
		- For system this size, CDN cost can increase significantly and providing custom solution or optimizing your approach might be optimal.

## Step 2: High Level Design

- Since cloud services are allowed, we will focus on two services:
	- CDN
	- blob storage
- What other services do we might need?
	- API servers, for handling everything else beside video streaming:
		- feed recommendation
		- generating video URL
		- storing video metadata(description, likes, num_comments)
		- info storage(comment, user_info, stats)
		- Video Trans-coder:
			- converts a video to a format which best suits the user's device, ex: MPEG, HLS
- Explain the two main flows
	- Video uploading flow
		- a user sends a video
		- user original video is stored in "original video" blob storage
		- a trans-coder server picks a new video from original video storage
			- converts the video to different formats
			- once done(converting) does three requests
				- send task completion request to a separate server, which in intern stores the trans-coded video metadata(file-size, filename) and sends notification to user
				- stores the trans-coded video to "Trans-coded video" storage blob
				- CDN picks new videos from trans-coded video storage
	- Video ingestion/streaming flow
		- instead of loading the whole video, streaming means your device continuously receives portion of a video from remote source.
		- streaming protocol
			- a standard way to control data transfer for video streaming
			- popular protocols
				- MPEG-DASH
				- Apple HLS(HTTP Live streaming)
		- Videos are streamed from CDN directly.
			- The edge server closest to you will deliver the video.

## Step 3 - Design Deep Dive

- we will follow the two component as before, and focus on important sub-components
	- video uploading flow
	- video streaming flow

### Video Trans-coding

- why do we need video trans-coding
	- mobile devices have special requirement due to their(size, processing power, network conditions, ram)
	- users in different region can have different bandwidth potential(high speed, low speed)
	- device compatibility, a video format for TV might not as well be suitable for mobile devices
- what should be our strategy?
	- for mobiles
		- prepare videos with lower bit rate
		- send lower resolution video that take lower bandwidth
	- prepare different video format for each different platforms
	- switch either automatically or manually to different video quality depending on users's bandwidth

### System Optimization

- speed optimization
	- don't upload a whole video rather break it down and upload in chunks
	- have upload location closer to users, same as having CDN
	- use parallelism everywhere: use queue to store tasks and multiple servers to process that task, with this approach we can handle video trans-coding, thumbnail generation…
- safety optimization
	- don't have a single upload URL for everyone to use, generate a "pre-signed URL" for authenticated people to use
		- a user sends api request to get "upload url"
		- server authenticate and sends "upload url"
		- user uploads using the url
	- implement DRM(digital rights management) system, protect peoples/organization content from copyright issues
		- system accepts copyright issues and take down videos that violate the policy
		- can automatically detect copyrighted videos and take down
- cost optimization
	- from popular services we can learn that, most video views come from popular videos,
		- from this we can make the cost optimization step of storing only most popular videos(videos getting more views) to CDN and video with less views to our in-house servers(servers with decent capacity)

### Error Handling

- Here are some takes
	- if video trans-coding fails, re-try a few more times, then if not successful send error code to the client
	- API server down: since api servers are stateless requests can be sent to other servers
	- metadata cache server down: replicate data multiple times(master-slave pattern)
		- if master is down: promote one of the slaves to master
		- if slave is down: use other slaves for reads and bring a new database server to replace the dead slave.

## Readme

- [System design youtube course by neetcode](https://www.youtube.com/watch?v=jPKTo1iGQiE)
- [How Video streaming works youtube video](https://www.youtube.com/watch?v=7AMRfNKwuYo)
