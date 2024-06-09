---
title: 10 - DESIGN A NOTIFICATION SYSTEM
date created: Friday, March 24th 2023, 2:37:48 pm
date modified: Sunday, March 17th 2024, 4:08:45 pm
---

# 10 - DESIGN A NOTIFICATION SYSTEM

## Intro

- There are 3 types of notifications
	1. mobile push notification
	2. SMS message
	3. Email

## Step 1 - Scope the System

- Design a scalable system that sends out millions of notifications a day
	- supports push notification, SMS and email
	- it is eventual real-time system
	- notifications can be triggered by client applications. they can also be scheduled on the server-side
	- 10 mil mobile push notifications, 1 min sms and 5 mil emails per day

## Step 2 - High Level Design

- The application can be structured as follows
	- different types of notifications
	- contact info gathering flow
	- notification sending/receiving flow

### Different Types of Notification

- ios notification
	- ios notification is handled by APNS: application push notification service
	- we need three parts to send an ios push notification
		1. provider: one sending the notification to APNs
		2. APNs
			1. A remote service provided by apple to propagate push notifications to ios devices
		3. ios device: one receiving the notification
- android push notification
	- android notification is handled mostly by FCM: Firebase cloud messaging
- SMS message
	- handled by third party service like: Twillo or Nexmo
- Email
	- Can be commercial or company owned, mostly handled by third part service like: Sendgrid or Mailchimp

### Contact Info Gathering

- To send a notifications, we need to gather
	- mobile device token => for push notifications
	- phone number => SMS
	- email address => EMAIL
- After user signs up -> api servers collect user contact info and stores it in database.
- table structure
	- user
		- a user can have multiple devices
	- device
		- device_token, user_id, and last_logged_in_time

### Notification Sending and Receiving Flow

1. A service calls APIs provided by notification servers to send notifications.
	1. A service is our applications such as website, mobile that triggers notification
2. Notification servers fetch metadata such as user info, device token, and notification setting from the cache or database.
	1. these information are stored when user first registered
	2. A notification server needs to be decoupled from Cache and DB so to scale them separately
3. A notification event is sent to the corresponding queue for processing. For instance, an iOS push notification event is sent to the iOS APN queue.
	1. Time taking tasks should be handled with queue, without affecting the notification server.
4. Workers pull notification events from message queues.
5. Workers send notifications to third party services.
6. Third-party services send notifications to user devices.

## Step 3 - Design Deep Dive

- We will explore the following in deep dive
	- Reliability
	- Additional component and considerations
		- notification template
		- notification settings
		- rate limiting
		- retry mechanism
		- security in push notifications
		- monitor queued notifications
		- and event tracking

### Reliability

- How to prevent data loss?
	- notifications can usually be delayed or re-ordered, but never lost.
	- To satisfy this requirement the notification system persists notification data in a database and implements a retry mechanism.
- Will recipients receive a notification exactly once?
	- The short answer is no. Although notification is delivered exactly once most of the time, the distributed nature could result in duplicate notifications.
	- To handle this we can implement has_seen_before service which checks notification info to see if it has been processed before if yes discard otherwise forward to notification service.

### Additional Components and Considerations

- notification template
	- a similar format for different category of messages
	- templates are introduced to avoid building every notification from scratch
	- can be html/xml… with unique style, links…
- Notification setting
	- give users fine-grained control over notification settings
	- before any notification is sent to a user, we first check if a user is opted-in to receive this type of notification.
- Rate limiting
	- To avoid overwhelming users with too many notifications and upset them, we can limit the number of notifications a user can receive.
- Security:
	- AppKey/appSecret pair is used to ensure only verified clients can send notifications.
- Events tracking
	- Notification metrics, such as open rate, click rate, and engagement are important in understanding customer behaviors
	- monitoring and tracking systems are added for system health checks and future improvements.

## Readme

- [You Cannot Have Exactly-Once Delivery – Brave New Geek](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/)
- [Mobile push security - IBM Cloud Docs](https://cloud.ibm.com/docs/services/mobilepush?topic=mobile-pushnotification-security-in-push-notifications)
- [https://www.youtube.com/watch?v=bBTPZ9NdSk8](https://www.youtube.com/watch?v=bBTPZ9NdSk8)
