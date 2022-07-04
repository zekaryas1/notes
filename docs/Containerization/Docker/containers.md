---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Monday, July 4th 2022, 4:54:28 pm
title: What is a Container
---

# What is a Container

- Docker containers are often compared to virtual machines but they are actually just processes running on your host OS.
	- **_A container is an isolated (namespaces) and restricted (cgroups, capabilities, seccomp) process._**
- On Linux you can run ==ps aux== and see the process
- [Detailed explanation on containers](https://iximiuz.com/en/posts/container-learning-path/)

![](https://user-content.gitlab-static.net/1f3ecb847e636cdec7d9db76f7c262e73d836ad9/68747470733a2f2f626c61636b666973682e6769746c61622e696f2f626c61636b666973682f696d616765732f646f636b65722d70726f642e6a7067)

## Run Containers

### Run Containers in the Foreground

```bash
docker container run -it -p 80:80 Nginx
# -it = interactive
# -p = port mapping public_port:continer_exposed_port
```

### What Happens in the Above Command?

- Look for an image called Nginx in the image cache
- If not found in the cache, it looks to the default image repo on Dockerhub
- Pulls it down (latest version), store it in the image cache
- Started it in a new container
- We specified to take port 80 on the host and forward to port 80 on the container
	- We would do ==$ docker container run -d -p 8000:80 nginx== to use port 8000
- We can specify versions like "nginx:1.09"

### Run Container in the Background

```bash
docker container run -d -p 80:80 nginx  
#-d = run in detached mode => no showing log**
```

### Naming Containers

```bash
docker container run -d -p 27017:27017 --name my_awsome_mongo mongo

docker container run -d -p --name my_awsome_mongo 27017:27017 mongo

```

### Run Containers with Environment

```bash
docker container run -d -p 3306:3306 --name mysql --env MYSQL_ROOT_PASSWORD=123456 mysql

#then we would be able to access process.env.MYSQL_ROOT_PASSWORD inside the code
```

## List Containers

### List Only Running Container

```bash
docker ps
```

### List All Containers Either Running or Not Running

```bash
docker ps -a
# -a = all
```

## Stop Container

```bash
docker stop [container_id]
```

### Stop All Running Containers

```bash
docker stop $(docker ps -aq)
```

## Remove Container

> First stop the container as you can not remove a running container

```bash
docker rm [container_id]
```

### Remove Multiple Containers

```bash
docker rm [container_id1] [container_id2]
```

### Force Remove a Running Container

```bash
docker rm -f [container_id]
```

### Remove All Containers

```bash
docker rm $(docker ps -aq)
```

## Journey Inside Containers

```bash
#docker container exec -it [container_name] bash
docker container exec -it MySQL bash
```

## Logs

- Print the last 100 lines of a container’s logs

```bash
docker container logs --tail 100 [container_name]
```
