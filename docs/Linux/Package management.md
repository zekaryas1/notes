---
date created: Sunday, July 24th 2022, 11:11:54 pm
date modified: Sunday, July 24th 2022, 11:16:09 pm
title: Package Management
---

# Package Management

## Install Package

```shell
apt-get install package-name
```

### Install .deb Package

```shell
dpkg -i packagename.deb
```

## Remove Package

```shell
apt-get remove package-name
apt-get purge package-name
```

### Autoremove

- Remove all unwanted packages on Debian based distributions

```shell
apt-get autoremove
```

## Get Update

```shell
apt-get update
```

## Get Upgrade

```shell
apt-get upgrade  #upgraed all
apt-get upgrade package-name
```
