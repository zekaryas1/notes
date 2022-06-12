---
date created: Friday, June 10th 2022, 12:07:12 am
date modified: Saturday, June 11th 2022, 11:14:59 pm
title: Volumes
---

# Volumes

## Why We Need Volumes

- By default, all the changes inside the container are lost when the container stops. If we want to keep data between runs, Docker volumes and bind mounts can help.
- Usually used with database systems such as MySQL, MongoDB…

# What Are Volumes

- The purpose of using Docker volumes is to persist data outside the container so it can be backed up or shared.
- Multiple containers can mount the same volume.
- There are main 2 ways of doing this
	- Bind mount
		- Bind to local folder Managed by user
	- Named volumes
		- Bind to volume managed by docker

# Bind Mounts

- Connection from the container to a directory on the host machine. 
- **It allows the host to share its own file system with the container**, which can be made read-only or read-write.
- Absolute path is required when using bind volumes with docker run. aka ==pwd== is required
	- However, We can use relative path when using with docker-compose

```bash
docker run -it --name nginx -p 8080:80 -v $(pwd)/target:/usr/share/nginx/html nginx
```

```bash 
#docker-compose.yml
version: "3.2"
services:
  web:
    image: nginx:latest
    ports:
      - 8080:80
    volumes:
      - ./target:/usr/share/nginx/html  #relative path being used
```

# Named Volumes

- Unlike bind mount, where you can mount any directory from your host, volumes are stored in a single location
	- (most likely `/var/lib/docker/volumes/` on unix systems)
- Greatly facilitates managing data (backup, restore, and migration). Docker volumes can safely be shared between several running containers.

```bash
docker run -it --name nginx -p 8080:80 -v demo:/usr/share/nginx/html nginx

#if the path{demo} is a name, Docker recognizes it as a named volume and tries to create it if it doesn't exist
```

- With `docker-compose`, volumes must be declared at the same level as `services`. Then you can refer to them by their name.

```bash 
#docker-compose.yml
version: "3.2"
services:
  web:
    image: nginx:latest
    ports:
      - 8080:80
    volumes:
      - html_files:/usr/share/nginx/html
volumes:
  html_files:
```

# List Volumes

```bash
docker volume ls
```

# Create Volume

Volumes are created automatically if they don't exist but can also be explicitly created.

```bash
docker volume create --name jupiter-riding
```

- How to use the above volume

```bash
docker run -it --name nginx -p 8080:80 -v jupiter-riding:/usr/share/nginx/html nginx
```

```bash
#need to use external: true when using explicit volumes with docker-compose
version: "3.2"
services:
  web:
    image: nginx:latest
    ports:
      - 8080:80
    volumes:
      - jupiter-riding:/usr/share/nginx/html
 
volumes:
  jupiter-riding:
    external: true  #if the volume doesn't exist docker will throw an error
```

## Remove a Volume

```bash
docker volume rm jupiter-riding
```

# Remove Unused Volume

```bash
docker volume prune
```

# Volume Detail

Use the `docker volume inspect` command to view the data volume details.

```bash
docker volume inspect [volume_name]
```

# Docker-compose & Volumes
