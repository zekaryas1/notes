---
date created: Thursday, July 21st 2022, 8:54:35 pm
date modified: Sunday, December 29th 2024, 4:19:48 pm
title: You Should Know JavaScript
---

# You Should Know JavaScript

## JS Map and Set

- [Source from JavaScript-info](https://javascript.info/map-set)

### Map

- Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.
- *Avoid using `map[key]=value` or `map[key]` to set and get value from a map, instead use set and get methods*

```txt
new Map() 
	– creates the map.
map.set(key, value) 
	– stores the value by the key.
map.get(key) 
	– returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) 
	– returns true if the key exists, false otherwise.
map.delete(key) 
	– removes the element (the key/value pair) by the key.
map.clear() 
	– removes everything from the map.
map.size 
	– returns the current element count.
```

```js
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
console.log(map.get(1)); // 'num1'
console.log(map.get('1') ); // 'str1'

console.log(map.size); // 3
```

#### Map Vs Object

- For js object key must be string, otherwise it will be converted to string, however in map key can be anything(object, primitives)

```js
const obj = {};

obj[12] = 'number of columns';
obj[{name: 'John'}] = 450;

console.log(obj);  //{ '12': 'number of columns', '[object Object]': 450 }
```

```js
const m = new Map();

m.set(12, 'number of columns');
m.set({name: 'John'}, 450);

console.log(m);  //Map(2) { 12 => 'number of columns', { name: 'John' } => 450 }
```

#### Iteration

```js
const priceMap = new Map([
	['mac', 2400],
	['iphone', 1200],
	['samsung', 900]
]); //map can be created with array

for (let brand of priceMap.keys()) {
  console.log(brand, priceMap.get(brand));
}


//or
priceMap.forEach((value,key, map) => {
	console.log(key, value);
})
```

### Set

- A Set is a special type collection – “set of values” (without keys), where each value may occur only once.
- *Like map key can be any js type(number, boolean, array, object…)*

```txt
new Set([iterable]) 
	– creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
    
set.add(value) 
	– adds a value, returns the set itself.
	
set.delete(value) 
	– removes the value, returns true if value existed at the moment of the call, otherwise false.
	
set.has(value) 
	– returns true if the value exists in the set, otherwise false.
	
set.clear() 
	– removes everything from the set.
	
set.size 
	– is the elements count.
```

```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
//set.add([1,2,34]);
set.add(john);
set.add(mary);

// set keeps only unique values
console.log( set.size ); // 3

for (let user of set) {
  console.log(user); // John (then Pete and Mary)
}
```

#### Iteration

```js
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) console.log(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  console.log(value);
});
```

## Higher Order Functions

> A function which takes another function as an argument or returns a function is known as a higher order function.

### Filter

- Returns a new array with any elements for which the callback function returns `true`.

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
```

### Map

- **Creates a new array** populated with the results of calling a provided function on every element in the calling array.
- The original array does not get altered

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

### Foreach

- Executes a callback function on each of the elements in an array in order.

```js
const numbers = [28, 77, 45, 99, 27];  
  
numbers.forEach(number => {    
  console.log(number);  
});
```

### Reduce

- Iterates through an array and returns a single value

```js
const arrayOfNumbers = [1, 2, 3, 4];  
  
const sum = arrayOfNumbers.reduce((accumulator, currentValue) => {    
  return accumulator + currentValue;  
});
```

- We can pass initial value

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
```

### Find

- Returns the first element in the provided array that satisfies the provided testing function.
- If no values satisfy the testing function, [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is returned.

```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
```

### FindLast

- Returns the value of the last element in an array that satisfies the provided testing function.
- If no elements satisfy the testing function, [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is returned.

```js
const array1 = [5, 12, 50, 130, 44];

const found = array1.findLast((element) => element > 45);

console.log(found);
// expected output: 130
```

### Every

- The **`every()`** method tests whether all elements in the array pass the test implemented by the provided function.
- It returns a Boolean value.

```js
const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(val => val < 40));
// expected output: true
```

### Some

- The **`some()`** method tests whether at least one element in the array passes the test implemented by the provided function.
- It returns a Boolean value.

```js
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

### FindIndex

- Returns the index of the first element in an array that satisfies the provided testing function.
- If no elements satisfy the testing function, -1 is returned.

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

### FindLastIndex

- Returns the index of the last element in an array that satisfies the provided testing function.
- If no elements satisfy the testing function, -1 is returned.

```js
const array1 = [5, 12, 50, 130, 44];

const isLargeNumber = (element) => element > 45;

console.log(array1.findLastIndex(isLargeNumber));
// expected output: 3  (of element with value: 30)
```

## Data Manipulation Snippets for JS/React

```js
let data = {
	todos: []
};
//const [state, setState] = useState(data);

//add
data = { todos: [...data.todos, newData] }
//setState(data)

//remove by id
data = { todos: data.todos.filter(todo => todo.id !== id) }

//update by id
data = { todos: data.todos.map(todo => {
	if(todo.id === id){
		todo.status = 'updated';
	}
	return todo;
}) };

//add new entry
data = {...data, notes: []}
```

## Named Export Vs Default Export in ES6/React

### Named Export: (export)

- Can have multiple named exports per file.
- You import the specific exports you want surrounded in braces
- The name of imported module has to be the same as the name of the exported module. Or you need to use `as`

```js
// exports from ./MyComponent.js file  
export const MyComponent = () => {}  
export const MyComponent2 = () => {}
```

```js
// imports  
// ex. importing a single named export  
import { MyComponent } from "./MyComponent";// ex. importing multiple named exports  
import { MyComponent, MyComponent2 } from "./MyComponent";

import * as MainComponents from "./MyComponent";  
// use MainComponents.MyComponent and MainComponents.MyComponent2 here
```

```js
// ex. giving a named import a different name by using "as":  
import { MyComponent2 as MyNewComponent } from "./MyComponent";
```

> Named exports are useful to export several values. During the import, one will be able to use the same name to refer to the corresponding value.

### Default Export: (export default)

- One can have only one default export per file.
- When we import we have to specify a name.

```js
const MyComponent = () => {}
export default MyComponent;
```

```js
// import
import MyDefaultComponent from "./MyDefaultExport";
```

## Web Worker

- [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface.
- What you can and can't inside web workers
	- You can run whatever code you like inside the worker thread, with some exceptions.
		- For example, you can't directly manipulate the `DOM` from inside a worker, or use some default methods and properties of the window object
	- You can use a large number of items available under window, including `WebSockets`, and data storage mechanisms like `IndexedDB`.

### Create a Web Worker

```js
const worker = new Worker('worker-file.js');
```

### Send Message & Responses

- Both the client and server use `postMessage` to send messages & responses to each other
	- The client uses it to send request
	- The server uses it to send response

```js
const worker = new Worker('worker-file.js');
myWorker.postMessage([first.value, second.value]);
```

### Receive Message & Response

- Both client and server respond to messages via the `onmessage` event handler
	- The message is contained within the message event's data attribute.
	- The data is copied rather than shared.

```js
//webworker.js
//receive message from server side
onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');  //send the message to client
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);  //send the message to client
  }
}
```

```js
const worker = new Worker('worker-file.js');
myWorker.postMessage([first.value, second.value]);

//client can receive response with onmessage
myWorker.onmessage = function(e) {
	result.textContent = e.data;
	console.log('Message received from worker');
}
```

## JS Sorting

> Sorting is in-place in JavaScript

- Sort linear array

```js
const array = [5,4,3,2,1];
array.sort()
console.log(array)
```

- Sort objects by
	- String
	- Numeric value

```js
const array = [
	{
		id: 4,
		name: "Zeku"
	},
	{
		id: 1,
		name: "Abel"
	}
]


//sort by string value
array.sort((a,b) => a.name.localeCompare(b.name));
console.log(array)
```

```js
const array = [
	{
		id: 4,
		name: "Zeku"
	},
	{
		id: 1,
		name: "Abel"
	}
]


//sort by numberic value
array.sort((a,b) => a.id - b.id);
console.log(array)
```

### Slice Vs Splice

#### Slice

> Syntax => slice(start, end), end is not included

- Return portion of an array

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(0, 2));
```

#### Splice

> Syntax => splice(start_index, number_of_elts_to_remove, …list_of_elts_to_add)

- Remove elets with Splice

```js
let array = [1,2,3,4,5];

array.splice(3, 1); //removes number 4
console.log(array)
```

- Add elements with slice

```js
let array = [1,2,3,4,5];

array.splice(3, 0, 'A', 'B', 'C'); //Add A,B,C
console.log(array)
```

## What is the Difference Between Var, Let, Const

- There are 3 type of scopes
	- global
	- local
	- lexical scope or block scope

> Variables declared with var are either function-scoped or global-scoped, depending on whether they are declared within a function or outside a function. variables declared with either const or let are block scope

- let & const
	- block scope {}
- var
	- function scope or global scope
- const
	- can not be re-initialized

## What is Closure Ins JavaScript?

- [Closures - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- A closure gives you access to an outer function's scope from an inner function.

```js
function makeFunc() {
  var name = "Mozilla"; // name is a local variable created by init
  return function displayName() {
    // displayName() is the inner function, that forms the closure
    console.log(name); // use variable declared in the parent function
  }
}
const res = makeFunc();
res();
```

- Code explanation
	- In some programming languages, the local variables within a function exist for just the duration of that function's execution.
	- Once makeFunc() finishes executing, you might expect that the name variable would no longer be accessible. However, because the code still works as expected, this is obviously not the case in JavaScript.

```js
function add(x) {
  return function (y) {
    return x + y;
  };
}

const res = add(14)(14) //res = 14
```

- Real world example of using closures
	- [Closures - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#practical_closures)
