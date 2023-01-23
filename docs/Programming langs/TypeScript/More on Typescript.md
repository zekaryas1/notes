---
title: More on Typescript
date created: Monday, January 23rd 2023, 2:41:42 pm
date modified: Monday, January 23rd 2023, 3:39:12 pm
---

# More on Typescript

## Type Narrowing

- Type narrowing is just what it sounds like—narrowing down a general type into something more precise.

### Typeof for Primitives

```jsx
if(typeof input  === 'string'){
	console.log(input.toUpperCase());
}
```

### instanceOf for Objects

```jsx
if(input instanceOf Array){
	//do sth
}

if(input instanceOf MyClass){
	//do sth
}
```

### Property in Object

```js
const output = getResult(req);
if("error" in output){
	consol.error(output.error)
}
```

## Utility Types

### Partial

- Constructs a type with all properties of Type set to optional.
- This utility will return a type that represents all subsets of a given type.

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

### Required

- Constructs a type consisting of all properties of Type set to required.
- The opposite of [Partial](#Partial).

```ts
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 };  //error => b is required
```

### Readonly

- Constructs a type with all properties of `Type` set to `readonly`, meaning the properties of the constructed type cannot be reassigned.

```ts
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello";  //error cannot reassign
```

### Record<Keys, Type>

- Constructs an object type whose property keys are `Keys` and whose property values are `Type`.
- This utility can be used to map the properties of a type to another type.

```ts
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
 
console.log(cats.boris);
```

### Pick<Type, Keys>

- Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">; //equivalent to => i want just these
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

```

### Omit<Type, Keys>

- Constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals).

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoInfo = Omit<Todo, "completed" | "createdAt">;  //all except this
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
 
todoInfo;
```
