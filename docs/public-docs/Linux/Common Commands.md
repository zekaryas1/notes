---
date created: Sunday, July 24th 2022, 9:29:35 pm
date modified: Sunday, July 24th 2022, 11:36:50 pm
title: Common Commands
---

# Common Commands

## CD

- Change directory

```shell
cd folder-name
cd ~ #go to root directory
cd path/to/folder
cd ..
```

## PWD

- Print working directory

```shell
pwd
```

## Touch

- Creates a file

```shell
touch index.html
```

```shell
touch file{1..100} #created a files named file1..upto..file100
```

## CP

- Copy file or folder to other location

```shell
cp source.py destination.py  # cp=copy  
cp -r source-dir/  destination-dir/  #copy everything (-r = recursively)
```

## Rm

- Remote file or folder

```shell
rm file.py  # rm = remove  
rm -r directory  # remove empty folder(s) recursively  
rm -rf directory_with_content # remove directory with contents inside
```

## MV

- Move content to another location

```shell
mv source.py destination-dir/  
mv /home/usr/  ./   # move everything in /usr/ to here(./)  
mv /home/usr/doc.py /home/zack/docs/  # move file from usr to zack  
mv hello.py hello-world.py # rename a file with move
```

## Shutdown

```shell
shutdown  # shutdown computer after 1 minute  
shutdown -h now # shutdown immediately  
shutdown 20:14 # shutdown at 20:40  
shutdown -c # stop last shutdown request
```

## Cat, Tail and Head

- Commands to view file content

```shell
cat smallFile.tx  # view content of files  
tail longFile.txt  # prints the last 10 lines  
tail -n 4 longfile.txt # prints only the last four lines
```

```shell
head longFile.txt # print the first 10 lines  
head -n 4 longfile.txt # prints only the first four lines
```

```shell
less longFile.txt  # read long file part by part
```

## Whatis, Whoami, and Passwd

```shell
passwd  # use to change user password  
whoami  # get the logged in user  
whatis python # print one line description of a command
```

## Which

- Used to locate the executable file associated with the given command by searching it in the path environment variable.

```shell
which python
```

![](https://media.geeksforgeeks.org/wp-content/uploads/which-main.png)

## Piping

- Echo a content into a file, usually used to save the output of a program into a file.

```shell
echo "hello world" >> log.txt**
```

## Chmod

- Change file permission

```shell
#check file permission
ls -l filename
```

```shell

chmod 777 filename-or-folder #Assign full(read, write, and execute) permission to everyone

chmod -R 777 /app/http/ #the current user can do anything on http folder

chmod +x hello.py   #Makes hello.py executable

chmod -x filename #Remove the execution permission of any file
```

## Date

- Display current date and time

```shell
date
#Sun Jul 24 11:01:53 PM EAT 2022
```

## Find Public Ip Address

```shell
curl ifconfig.me  
#ifconfig.me is a website to get public ip address
```

### Ifconfig

- Display the IP and Mac Address of the system

```shell
ifconfig
```

## History

- Print a history list of all commands

```
history
```

## W

- Display currently logged in users in the system

```shell
w
#23:07:20 up 1 day, 12:00,  1 user,  load average: 1.16, 1.01, 1.01
#USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
#zekaryas :1       :1               Sat11   ?xdm?   2:06m  0.00s /usr/libexec/gd
```
