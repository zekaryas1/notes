---
date created: Thursday, June 9th 2022, 9:54:36 pm
date modified: Friday, June 10th 2022, 12:03:34 am
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
docker build -t image_name path_to_docker_file
```

```bash
docker build -t zekaryas/hello_world .
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

Tag is an additional name/info we attach to an image to make it more meaningful

# Create an Image with Tag

```bash
docker build -t zekaryas/hello_world .
```

# Give a Tag to Existing Image

```bash
docker pull nginx  #we have image with no tag

docker image tag nginx btraversy/nginx #we have an image with new_image_tag

docker image tag image new_image_tag  #syntax

```
