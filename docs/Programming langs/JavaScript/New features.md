---
title: From State of Js 2022
date created: Thursday, March 9th 2023, 5:18:19 pm
date modified: Saturday, December 21st 2024, 7:53:32 pm
---

# New Features

## 2022

### Awaits

#### Shorthand for try/catch

```js
async function f4() {
  try {
    const z = await promisedFunction();
  } catch (e) {
    console.error(e); // 30
  }
}
```

- You can handle rejected promises without a try block by chaining a catch() handler before awaiting the promise.

```js
const response = await promisedFunction().catch((err) => {
  console.error(err);
  return "default response";
});
// response will be "default response" if the promise is rejected
```

#### Top Level Await

- This means that modules with child modules that use await will wait for the child modules to execute before they themselves run, while not blocking other child modules from loading.
- how can we use top level await?
	- to load necessary configs bootstrapping before executing a logic
	- module needs to wait for language files to load before it can proceed

```js

const user = async () => {
	  const url = 'api/users';
	  const response = await fetch(url);
	  return await response.json();
}

export default await user;
```

```js

import user from user.js

//by this time user id defined and available

function render(){
	
	return {
		data: {
			 time: "",
			 ...user
		}	
	}
}
```

### At

- The at() method is equivalent to the bracket notation when index is non-negative.
	- However if provided a negative value it will index array from the back, *just like python*

```js
const array1 = [5, 12, 8, 130, 44];

console.log(array1.at(0))  //5
console.log(array1.at(-1)) //44
```

### Proxy

- The Proxy object allows you to create an object that can be used in place of the original object, but which may redefine fundamental Object operations like getting, setting, and defining properties.
	- Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get(target, prop, receiver) {
    return "world";
  },
};

const proxy2 = new Proxy(target, handler2);

console.log(proxy2.message1); // world
console.log(proxy2.message2); // world
```

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler3 = {
  get(target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
```
