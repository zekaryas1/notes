---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 23rd 2022, 4:56:54 pm
title: General Step to Dockerizing a Project
---

[Online Tool to test docker quickly](https://labs.play-with-docker.com/)

# General Step to Dockerizing a Project

- Create a `dockerfile`
- Create `.dockerignore` to make docker ignore some files such as `node_modules`
	- By this step you can build and run the container
- If multiple docker need to be coupled together add `docker-compose.yml`
	- By this step you can run multiple containers
	- [docker compose](docker%20compose.md)

# How to Run a Docker Project

1. Build the image

```bash
docker image build -t zekaryas/projectName .
#docker image build -t{tag or name} name_of_the_image .{where the dockerfile is}
# . means in the current directory
```

```bash
#list images we have
docker image ls
```

2.  Run the image

```bash
docker container run -d -p 80:8080 zekaryas/projectName
# -d = detached: run in the background
# -p = port mapping public_port:container_exposed_port
```

```bash
# list containers and their information {id, state{running, exited},name}
docker ps
```

3. Manage the container

Once we have container we can stop/start/restart it using its id

```bash
docker stop [container_id]
docker restart [contaier_id]
docker start [container_id]
```

# How to Run a Docker-Compose Project

1. Build the image(s)

```bash
docker-compose up -d --build

# -d = detached background
# --build = build images
```

```bash
docker-compose ps
# Lists containers and their state 
```

2.  Managing docker-compose

```bash
docker-compose stop
docker-compose start
docker-compose restart
```

3. Remove docker-compose containers and their contents
	-  Stops containers and removes containers, networks, volumes, and images created by `up`.

```bash
docker-compose down
```

