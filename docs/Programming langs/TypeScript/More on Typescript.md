---
title: More on Typescript
date created: Monday, January 23rd 2023, 2:41:42 pm
date modified: Sunday, March 17th 2024, 11:47:46 am
---

# More on Typescript

## Type Narrowing

- Type narrowing is just what it sounds like narrowing down a general type into something more precise.

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

> readonly can be useful when working with react -> hooks, to inform states being immutable

```ts
export function EditEvent() {
  const [event, setEvent] = useState<Event>()
  
  event.title = 'Sth' //not error, but bad practice	
  setEvent(event);	
}
```

```ts
export function EditEvent() {
  const [event, setEvent] = useState<Readonly<Event>>()

  event.title = 'Sth' //error, cannot assign to readonly

  //better, do
  setEvent({...event, title: event.target.value})
}
```

#### DeepReadonly

- consider the following code where readonly doesn't meet our need.

```ts
type Event = {
	title: string,
	body: string,
	members: string[]
}

const readonlyEvent: Readonly<Event> = {
	title: 'event title',
	body:  'event body',
	members: ['m1', 'm2']
}

//since readonly we can't edit title and body of readonlyEvent
readonlyEvent.title = 'event title 2' //error

//but we can update, members
readonlyEvent.memebers.push('m3');
```

- This is because
	- Readonly only applies to top level properties of an object. We can still mutate nested properties and arrays without errors.
	- To prevent this use DeepReadonly, *which is a custom snippet not found in typescript utility types*

```typescript
export type DeepReadonly<T> =
  T extends Primitive ? T :
  T extends Array<infer U> ? DeepReadonlyArray<U> :
  DeepReadonlyObject<T>

type Primitive = 
  string | number | boolean | undefined | null

interface DeepReadonlyArray<T> 
  extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
```

```ts
const readonlyEvent: DeepReadonly<Event> = {
	title: 'event title',
	body:  'event body',
	members: ['m1', 'm2']
}

//since readonly we can't edit title and body of readonlyEvent
readonlyEvent.title = 'event title 2' //error

//but we can update, members
readonlyEvent.memebers.push('m3'); //error
```

### `Record<Keys, Type>`

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

### `Pick<Type, Keys>`

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

### `Omit<Type, Keys>`

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

### ReturnType

- To grab the type returned from a function, we can use the ReturnType utility
	- *this is useful when the library/package we're using doesn't provide typescript types*

```ts
function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = ReturnType<typeof add>;
// type AddReturnType = number;
```

```ts
async function featchData(a: number, b: number): Promise<number> {
  return //...;
}

type AddReturnType = ReturnType<typeof featchData>;
// type AddReturnType = Promise<number>;
```

### Awaited

- now in the above second [ReturnType](#ReturnType) example the `featchData` type was an async function.
	- *the return type will be promise, which we don't want*
	- to fix this we can use the Awaited type to unwrap the promise and get the type of what the promise resolves to:

```ts
function featchData(a: number, b: number): Promise<number> {
  return //...;
}

type AddReturnType = Awaited<ReturnType<typeof featchData>>
// type AddReturnType = number;
```

### Parameters

- Same as [ReturnType](#ReturnType), we can use `Parameters` to get the parameter types of a function.
- Parameters gives you a tuple of the argument types, and you can pull out a specific parameter type by index like so:

```ts
function sum(a: number, b?:number){
	//...
}

type SumParams = Parameters<typeof sum>
[number, number | undefined]

type param1 = SumParams[0]; //param1 is now type number
type params2 = SumParams[1]; //param2 is now type number | undefined
```

### NonNullable

- in the above example [Parameters](#Parameters), what if we want params2 to be type number not `number | undefined`
- we can use the NonNullable utility type, to exclude any null or undefined values from a union type.

```ts
type params2 = NonNullable<SumParams[1]>; //param2 is now type number

//or
type params2 = NonNullable<Parameters<typeof Sum>[1]>
```

```ts
type NullableString = string | null | undefined;

type NonNullableString = NonNullable<NullableString>;
// type NonNullableString = string;
```
