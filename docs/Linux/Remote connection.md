---
date created: Sunday, July 24th 2022, 11:20:41 pm
date modified: Sunday, July 24th 2022, 11:42:12 pm
title: Remote Connection
---

# Remote Connection

## SSH

- Connect to a remote server
- syntax user@ip-address

```shell
ssh root@198.77.56.221
```

## SCP

- The scp(secure copy) command copies files or directories between a local and a remote system or between two remote systems.

```shell
scp filename root@198.77.56.221:/path/
```

## Rsync

- _Rsync_, which stands for _remote sync_, is a remote and local file synchronization tool.
- It uses an algorithm to minimize the amount of data copied by only moving the portions of files that have changed.

```shell
rsync -av -e ssh --exclude='*.sh' --exclude='*.lock' --exclude='.*' folder-name root@198.58.173.149:/var/www/folder-name
```

- -a = archive
	- This flag syncs recursively and preserves symbolic links, special and device files, modification times, groups, owners, and permissions.
	- recommended than -r
- --exclude = ignore

## Public Key

### Access Public Key

```shell
cat ~/.ssh/id_rsa..pub
```

-  [How do I access my SSH public key? - Stack Overflow](https://stackoverflow.com/questions/3828164/how-do-i-access-my-ssh-public-key) 

### Generate Ssh Key

```shell
ssh-keygen -o
```

- [Git - Generating Your SSH Public Key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)
	
