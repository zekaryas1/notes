---
date created: Thursday, June 9th 2022, 9:54:18 pm
date modified: Saturday, June 11th 2022, 11:57:09 pm
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

> The `EXPOSE` instruction does not actually publish the port. It functions as a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published.
> <mark style="background: #CACFD9A6;">It simply is a message for the developer on which port to use, but also the developer can use whichever port it want at runtime.</mark>

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

# Build the Docker into Image

[[images#Build Your Own Image]]

# Examples

## Nodejs Dockerfile

```bash
FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]
```

> it is a best practice to define a .dockerignore file for your images

```bash
#.dockerignore
node_modules
```

## Spring Boot Dockerfile

```bash
FROM openjdk:16-alpine3.13

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]
```
