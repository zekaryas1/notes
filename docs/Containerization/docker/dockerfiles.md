---
date created: Thursday, June 9th 2022, 9:54:18 pm
date modified: Thursday, June 9th 2022, 11:52:59 pm
title: Parts of Dockerfile
---

# Parts of Dockerfile

```bash
add sample docker file
```

## From

- The OS/framework used. Common is alpine, debian, ubuntu

```bash 
FROM UBUNTU:18:04
FROM node:latest
FROM node:14
```

## ENV

Environment variables

```bash
env = production
```

## RUN

Run commands/shell scripts, etc

```bash
RUN npm install
```

## EXPOSE

Ports to expose

```bash
EXPOSE 8080
```

## CMD

Final command run when you launch a new container from image

```bash
CMD ["node", "app.js"]
```

## WORKDIR

Sets working directory (also could use 'RUN cd /some/path')

```bash
WORKDIR /app
```

```bash
FROM nginx:latest # Extends nginx so everything included in that image is included here

WORKDIR /usr/share/nginx/html

COPY index.html index.html
```

## COPY

Copies files from host to container

```bash
COPY package*.json . #copy package to container
COPY . . #copy everything to container
```


# Build the docker into image
[[images#Build Your Own Image]]