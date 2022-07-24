---
date created: Thursday, July 21st 2022, 8:54:35 pm
date modified: Sunday, July 24th 2022, 3:18:45 pm
title: Javascript
---

# Javascript

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

-  Iterates through an array and returns a single value

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
