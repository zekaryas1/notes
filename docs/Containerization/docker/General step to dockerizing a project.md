---
date created: Thursday, June 9th 2022, 9:33:15 pm
date modified: Thursday, June 9th 2022, 9:48:47 pm
title: General Step to Dockerizing a Project
---

# General Step to Dockerizing a Project

- Create a dockerfile
- Create dockerignore to make docker ignore some files such as node_modules
	- By this step you can build and run the container
- If multiple docker need to be coupled together add docker-compose.yml
	- By this step you can run multiple containers

# How to Run a Docker Project

1. Build the image

```bash
docker image build -t zekaryas/projectName .
#docker image build -t{tag or name} name_of_the_image .{where the dockerfile is}
# . means in the current directory
```

2.  Run the image

```bash
docker container run -d -p 80:8080 zekaryas/projectName
# -d = detached: run in the background
# -p = port mapping public_port:container_exposed_port
```

3. Manage the container

Once we have container we can stop/start/restart it using its id

```bash
docker stop [container_id]
docker restart [contaier_id]
docker start [container_id]
```

```bash
# list containers and their information {id, state{running, exited},name}
docker ps
```
