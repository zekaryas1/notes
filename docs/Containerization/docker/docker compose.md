---
date created: Thursday, June 9th 2022, 9:55:32 pm
date modified: Sunday, June 12th 2022, 3:52:10 pm
title: What is Docker Compose?
---

# What is Docker Compose?

- Compose is a tool for defining and running multi-container Docker applications.
- With Compose, you use a YAML file to configure your application’s services.
	- Then, with a single command, you create and start all the services from your configuration.

```bash
version: "3.7" 
services: 
	... 
volumes: 
	... 
networks: 
	...
```

# Docker-compose's Three Steps

1. Define your app's environments with a `Dockerfile`
2. Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
3. Run `docker compose up` to start and run your apps,

```bash
version: '3.8'

services:
 notes:
  build: .   #path to where the docker-file is ex: ./dir/src/
  ports:
   - 8000:8000
   - 9229:9229
  environment:
   - SERVER_PORT=8000
   - CONNECTIONSTRING=mongodb://mongo:27017/notes
  volumes:
   - ./:/app

 mongo:
  image: mongo:4.2.8
  ports:
   - 27017:27017
  volumes:
   - mongodb:/data/db
   - mongodb_config:/data/configdb

volumes:
 mongodb:
 mongodb_config:
```

# Declaring the Dependencies

- We need to create a dependency chain between our services, so that some services get loaded before (and unloaded after) other ones.
- We can achieve this result through the _depends_on_ keyword

```bash
services:
  kafka:
    image: wurstmeister/kafka:2.11-0.11.0.3
    depends_on:
      - zookeeper
    ...
  zookeeper:
    image: wurstmeister/zookeeper
    ...
#First zookeeper starts then kafka starts
```

> We should be aware, however, that Compose will not wait for the _zookeeper_ service to finish loading before starting the _kafka_ service: it will simply wait for it to start.

# Docker-compose Commands

## Build

- Builds images in the `docker-compose.yml` file. The job of the `build` command is to get the images ready to create containers,
- So if a service is using the prebuilt image, it will skip this service.

```bash
docker-compose build
```

## Start

- Starts existing containers for a service.

```bash
docker-compose start
```

## Restart

- Restarts all stopped and running services.

```bash
docker-compose restart
```

## Stop

- This command stops the running containers of specified services.

```bash
docker-compose stop
```

## Up

- It builds the images if they are not located locally and starts the containers.
- If images are already built, it will fork the container directly.
- If there are existing containers for a service, and the service’s configuration or image was changed after the container’s creation, 
	- `docker-compose up` picks up the changes by stopping and recreating the containers (preserving mounted volumes).

```bash
docker-compose up

docker-compose up -d  #-d detached /background

docker-compose up -d --build
#build the images
#And then start the containers
```

## PS

- This command list all the containers in the current `docker-compose` file. They can then either be running or stopped.

```bash
docker-compose ps
```

## Down

- Stops containers and removes containers, networks, volumes, and images created by `up`.
	- Networks and volumes defined as `external` are never removed.

```bash
docker-compose down
```
