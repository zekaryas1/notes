---
title: TIL
date created: Thursday, March 9th 2023, 5:18:19 pm
date modified: Thursday, February 5th 2026, 8:59:52 am
---

# TIL

## Awaits

### Shorthand for try/catch

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

### Top Level Await

- This means that modules with child modules that use await will wait for the child modules to execute before they themselves run, while not blocking other child modules from loading.
- How can we use top level await?
	- To load necessary configs bootstrapping before executing a logic
	- Module needs to wait for language files to load before it can proceed

```js

const user = async () => {
	  const url = 'api/users';
	  const response = await fetch(url);
	  return await response.json();
}

export default await user;
```

```js

import user from "user.js"

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

## Array

### `array.at`

- The at() method is equivalent to the bracket notation when index is non-negative.
	- However, if provided a negative value it will index array from the back, *just like python*

```js
const array1 = [5, 12, 8, 130, 44];

console.log(array1.at(0))  //5
console.log(array1.at(-1)) //44
```

### `array.toSorted()`

- In-place sort or Sort without mutating the original array.

```js
const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]
```

### `array.toReversed()`

- Reverse without mutating the original array.

```js
const items = [1, 2, 3];
const reversedItems = items.toReversed();
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]
```

### `array.findLast()`

```js
const inventory = [
  { name: "bananas", quantity: 0 },
  { name: "fish", quantity: 1 },
  { name: "cherries", quantity: 5 },
];
console.log(inventory.findLast(item => item.quantity <2));
// { name: "fish", quantity: 1 }
```

## Proxy

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

## Nullish Coalescing

- Return first value, or second value if first value is `null` or `undefined`.

```js
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```

## Logical Assignment

- Operators to assign a value to a variable based on its own truthy/falsy status.

```js
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration);
// expected output: 50

a.title ||= 'title is empty.';
console.log(a.title);
// expected output: "title is empty"
```

## string.replaceAll()

- Replace all instances of a string.

```js
const s1 = "foo_bar_baz";
const s2 = s1.replaceAll('_', '-');
```

### Promises

- creating a new promise
- creating a default promise that resolves after few seconds
- promise.all, promise.any, promise.allSettled
