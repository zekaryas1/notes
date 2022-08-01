---
date created: Sunday, July 24th 2022, 11:20:41 pm
date modified: Monday, August 1st 2022, 10:42:47 am
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

- [Source](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories)
- _Rsync_, which stands for _remote sync_, is a remote and local file synchronization tool.
- It uses an algorithm to minimize the amount of data copied by only moving the portions of files that have changed.

```shell
rsync -av -e ssh --exclude='*.env' --exclude='node_modules' local-folder-name root@198.58.173.149:/var/www/folder-name
```

- -a = archive
	- This flag syncs recursively and preserves symbolic links, special and device files, modification times, groups, owners, and permissions.
	- Recommended than -r
- -v = verbose
- -e = specify the remote shell to use
- --exclude = ignore

## Public Key

### Access Public Key

```shell
cat ~/.ssh/id_rsa.pub
```

-  [How do I access my SSH public key? - Stack Overflow](https://stackoverflow.com/questions/3828164/how-do-i-access-my-ssh-public-key) 

### Generate Ssh Key

```shell
ssh-keygen -o
```

- [Git - Generating Your SSH Public Key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)
	

## How To Set Up SSH Key Pair

- [Source](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04)
- Though SSH supports password-based authentication, it is generally recommended that you use _SSH keys_ instead.
- SSH keys are a more secure method of logging into an SSH server, because they are not vulnerable to common brute-force password hacking attacks.

## Steps to SSH Key Pair

- Generate SSH key [Generate Ssh Key](Linux/Remote%20connection.md#Generate%20Ssh%20Key)
- Copy the key to the server you want to connect

```bash
ssh-copy-id username@your_server_address
```

```bash
#if you the key with other name and path
ssh-copy-id -i .ssh/githubKey.pub user@server
```

## Disabling Password-based SSH Authentication (Optional)

```bash
sudo nano /etc/ssh/sshd_config
```

- This command will open up the file within the `nano` text editor. Find the line in the file that includes `PasswordAuthentication` (or create the line if it doesn’t exist), make sure it is not commented out with a `#` at the beginning of the line, and change it to `no`:

```txt
PasswordAuthentication no
```

- Reload the `sshd` service to put these changes into effect

```bash
sudo systemctl reload sshd
```
