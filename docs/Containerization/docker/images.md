---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 23rd 2022, 4:54:50 pm
title: What is an Image
---

# What is an Image

- Images are app binaries and dependencies with metadata about the image data and how to run the image
- we can have image in two ways
	1. Pull an already made from docker-hub or
	2. Build our own

# Pull Existing Image

```bash
docker pull [image_name]
```

## Example

```bash
docker pull NGINX
docker pull MONGODB
```

> Once we have our image we can run it as [[containers#Run Containers in the Background]]

# Build Your Own Image

> Best to use docker-hub-username/project-name as your image name
- After creating a dockerfile run the following command [[dockerfiles]]

```bash
docker build -t tag_name path_to_docker_file
# -t = tag followd by tag/name
```

```bash
docker build -t zekaryas/hello_world .
```

## The Dockerfile is Not Named Dockerfile

- In the above command docker assumes there is a file called dockerfile in the path specified

```bash
docker build -t awsome_project -f not_named_dockerfile .
```

# List Images We Have

```bash
docker image ls
```

# Remove an Image

```bash
docker image rm [image_name]
```

## Remove All Image

```bash
docker rmi $(docker images -a -q)
```

# Push Image to Docker-hub

> You might need to run ==docker login== for this to work

```bash
docker image push [image_name]
```

```bash
docker image push zekaryas/hello-world
```

# Tagging a Container

- Tag is an additional name/info we attach to an image to make it more meaningful
- The Docker tag command creates a new tag for an image.
- It does not create a new image. The tag points to the same image and is just another way to reference the image.

## Create an Image with Tag

```bash
docker build -t zekaryas/hello_world .
```

## Give a Tag to Existing Image

```bash
docker pull nginx  #we have image with tag: latest

docker image tag nginx zekaryas/nginx #we've the same image with a new tag name zekaryas/nginx

docker image tag nginx nginx:v1:12:12 #we've the same image with a new tag name nginx:v1:12:12

docker image tag prev_tag_name new_tag_name  #syntax

```

# Joining Multiple Docker Images into One

- If you have a project that requires multiple docker images you've two options
	- Use docker-compose, but docker-compose isn't allowed…
		1. Start `From ubuntu` and install & setup the requires procedure
		2. Or use [docker-multi stage](https://docs.docker.com/develop/develop-images/multistage-build/) build where you can combine multiple images to run a project
> The project could be a python project that also has a go code for some tasks…

[Source](https://stackoverflow.com/questions/39626579/is-there-a-way-to-combine-docker-images-into-1-container)

```bash
FROM golang:1.7.3 as backend
WORKDIR /backend
RUN go get -d -v golang.org/x/net/html  
COPY app.go .
RUN  #install some stuff, compile assets....
    
FROM golang:1.7.3 as assets
WORKDIR /assets
RUN ./getassets.sh

FROM nodejs:latest as frontend 
RUN npm install
WORKDIR /assets
COPY --from=assets /asets .
CMD ["./app"] 

FROM alpine:latest as mergedassets
WORKDIR /root/
COPY --from=frontend . /
COPY --from=backend ./backend .
CMD ["./app"]
```