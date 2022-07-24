---
date created: Sunday, July 24th 2022, 11:02:23 pm
date modified: Sunday, July 24th 2022, 11:02:37 pm
title: Shebang (#!)
---

# Shebang (#!)

- The #! shebang is used to tell the kernel which interpreter should be used to run the commands present in the file.
- Example: if we have a file with the following content inside

```shell
#!/bin/bash  
echo "Hello World!"
```

- The text after the shebang(#!) which is (/bin/bash) tells the kernel this file should be run with the command /bin/bash in front.

```shell 
./hello.sh  
# the kernel actually will turn the above command as  
/bin/bash ./hello.sh
```

- Example 2:

```shell
#!/bin/cat  
All the contents of this file will be  
printed in the screen when it's executed 
```

```shell
./hello.sh  
# the kernel will turn it into /bin/cat ./hello.sh  
# the result will be the following output  
#!/bin/cat  
All the contents of this file will be  
printed in the screen when it's executed
```

> For our script header we can first find path of the lang with `which program` and add it on top of the script !#+result-of(which program)
> ex: !#+result-of(which python)

## When to Use Env?

- When the interpreter is within the Linux system such as (cat, ls, bash…) we can use the #!bin/Linux-command format, however, for user-installed interpreters such as (node, python…) we need to use their environment variables

> We can still use #!/path-to-node but that won’t be portable to other machines as the path is dependent on where the user installed node.js.

```shell
#!/usr/bin/env node  
console.log('Hello World from NodeJS');  
  
# now we can run the application as  
./hello.js  
# the kernel will turn it into path-to-node ./hello.js
```
