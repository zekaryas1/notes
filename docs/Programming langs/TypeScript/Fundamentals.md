---
title: Fundamentals
date created: Monday, December 12th 2022, 8:37:20 pm
date modified: Saturday, April 29th 2023, 2:34:54 pm
---

# Fundamentals

- Sources
	- <https://www.typescriptlang.org/cheatsheets>
	- <https://www.typescriptlang.org/>
	- [Typescript for react](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)

## Why and What of Typescript

- ![typescript is a super-set of JavaScript](https://www.typescripttutorial.net/wp-content/uploads/2020/05/what-is-typescript-typescript-and-js.png)
- The goal of TypeScript is to be a static typechecker for JavaScript programs
	- in other words, a tool that runs before your code runs (static) and ensure that the types of the program are correct (typechecked).
- TS = JavaScript + Types
	- *basically Typescript provides types for JavaScript, and understanding these types is the key to mastering Typescript.*

## Basic Types

- ![](https://d3n0h9tb65y8q.cloudfront.net/public_assets/assets/000/002/543/original/Typescript-primitive-types.png?1642578765)
- All JavaScript types
	- Primitive types
		- string
		- number
			- bingint
		- boolean
		- null & undefined
			- By default null and undefined are subtypes of all other types. That means you can assign null and undefined to something like number.
		- void & symbol
	- Object types
		- Array, Functions, Classes, enum and interfaces…

```ts
//primitive-types
let name: string = "zack";
let age: number = 23;
let planets: bigint = 10n;
let isDeveloper: boolean = true;
```

```ts
const keys: number[] = [2, 4, 8, 16];  //array
const map: Map<string, {name: string}> = new Map();  //map
const set: Set<number> = new Set();
const square: (x: number) => number =  x => x*x;  //function definition
```

> Never use uppercase, String, Number or Object, it's recommended to use lowercase, string, number and object.

## More Types

### Any Type

- The any type is a powerful way to work with existing JavaScript, allowing you to gradually opt-in and opt-out of type checking during compilation.

```ts
let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();
```

> Type safety is one of the main motivations for using Typescript and you should try to avoid using any when not necessary.

### Literal Types

- using literal types you can allow an exact value which a string, number, or boolean must have.

```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";
const animation: Easing = 'ease-in';


//rolling a dice any number of times will only result in 1-6 so we can define our function with literal typea
type DiceRollResult = 1 | 2 | 3 | 4 | 5 | 6;
function rollDice(): DiceRollResult {
	return (Math.floor(Math.random() * 6) + 1) as DiceRollResult
	//returning any number out side [1,6] is an error
}
const result = rollDice();
```

```ts
interface FontConf {
	fontName: string;
	fontWeight: number;
	fontSize: 12 | 14 | 16 | 18;
}

let myFontConf: FontConf = {fontName: 'Roboto', fontWeight: 400, fontSize: 14}; 
```

### Unions Types

- A union type allows you to store a value of one or several types in a variable.

```ts
function movie(title: string, rating: string | number){
	if(typeof param2 === "string"){
		//...
	}else{
		//..
	}
}

movie('Movie1', 'N/A');
movie('Movie2', 7.8);
movie('Movie2', true); //error
```

### Intersection Types

- An intersection type combines two or more types to create a new type that has all properties of the existing types.

```ts
interface Identity {
    id: number;
    name: string;
}

interface Contact {
    email: string;
    phone: string;
}

type Employee = Identity & Contact; 

const e: Employee = { 
	id: 100, 
	name: 'John Doe', 
	email: 'john.doe@example.com', 
	phone: '(408)-897-5684' 
};
```

### Tuple Type

- Tuples satisfy two things
	- The number of elements in the tuple is fixed.
	- The types of elements are known, and need not be the same.

```ts
//tuples
let name_age: [string, number] = ["zack", 23];
//error => name_age = [12, "zack"]; //type error
```

### Void Type

- type for functions that do not return a value

```ts
function warn(message: string): void{
	log.warn(message)
}
```

### Object Type

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

//we can also do
interface Point{
	x: number; 
	y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

## Type Assertion

- A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data.

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

```ts
const user = {} as User;

//similarly
const user = <User>{};
```

## Typing Functions

```ts
function login(email: string, password: string): boolean {
	//send post request
	return true
}

let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
	return x + y;
};

//we don't have to explcitly define type as Typescript can infer the types
let myAdd = function (x: number, y: number): number {
	return x + y;
};

//or
let myAdd: (x: number, y: number) => number = function (x, y) {
	return x + y;
};
```

### Default-initialized Parameters

- default-initialized parameters can be seen as an optional parameters with a default value
	- if user didn't provide a value or provided a null/undefined value the default value will be used

```ts
function buildName(firstName: string, lastName = "Smith") {
	return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined); // still works, also returns "Bob Smith
let result3 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
```

### Rest Parameters

- used to work with multiple parameters as a group

```ts
function buildName(firstName: string, ...restOfName: string[]) {
	return firstName + " " + restOfName.join(" ");
}
// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie")
```

## Optional Properties

- Use the parameter?: type syntax to make a parameter optional.

> Use the expression typeof(parameter) !== 'undefined' to check if the parameter has been initialized.

### Optional Parameters

```ts
function findUserBy(email: string, username?: string): User{
	if(typeof username != undefined){
		return db.findUserBy({email: email, username: username});
	}else{
		return db.findUserBy({email: email});
	}
}
```

### Optional Property

```ts
//the above example with interface
interface User{
	username?: string;
	email: string;
	//...more properties
}

function findUserBy(user: User): User{
	if(typeof user.username != undefined){
		return db.findUserBy({email: user.email, username: user.username});
	}else{
		return db.findUserBy({email: user,email});
	}
}
```

```ts
//Optional tuple elements
let bgColor, headerColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5];
headerColor = [0, 255, 255];
```

## Readonly Properties

- Some properties should only be modifiable when an object is first created.
	- You can specify this by putting `readonly` before the name of the property:

```ts
interface Point {
	readonly x: number;
	readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error! Cannot assign to 'x' because it is a read-only property.
```

### ReadonlyArray

- Typescript comes with a ReadonlyArray type that is the same as Array with all mutating methods removed, so you can make sure you don't change your arrays after creation.

```ts
let my_heros: ReadonlyArray<string> = ['Ali', 'Mike', 'Alferd'];

my_heros[0] = 'Tyson' //error! cannot assign to readonly
my_heros.push('Paul') //error! doesn't exist on readonly type
```

## OOP

### Classes

```ts
class Greeter {
	greeting: string;
	
	constructor(message: string) {
		this.greeting = message;
	}
	
	greet() {
		return "Hello, " + this.greeting;
	}
}

let greeter = new Greeter("world");
```

### Inheritance

```ts
class Animal {
	name: string;

	constructor(theName: string) {
		this.name = theName;
	}

	move(distanceInMeters: number = 0) {
		console.log(`${this.name} moved ${distanceInMeters}m.`);
	}
}

class Snake extends Animal {
	
	constructor(name: string) {
		super(name);
	}

	move(distanceInMeters = 5) {
		console.log("Slithering...");
		super.move(distanceInMeters);
	}
}
let sam = new Snake("Sammy the Python");
sam.move();
```

### Interfaces

- interfaces are a useful tool to define the structure of our or external data.

```ts
interface HomeComponentProps{
	title: string,
	description: string
	callBack?: (x: string, b: string) => void
}

function HomeComponent(props: HomeComponentProps){
	console.log(props.title);
}

//function HomeComponent({title, description}: Props) { ... }

let my_props: HomeComponentProps = {title: "Avatar", description: "Blue people in outer space"}

HomeComponent(my_props)
//<HomeComponent ...props />
```

#### Indexed Signatures

```ts
interface SquareConfig {
	color?: string;
	width?: number;
	[propName: string]: any;
}
```

- Here we're saying a SquareConfig can have any number of properties, and as long as they aren't color or width, their types don't matter.

#### Implementing Interfaces

```ts
interface ClockInterface {
	currentTime: Date;
	setTime(d: Date): void; //or setTime: (d: Date) => void
}
```

```ts
class Clock implements ClockInterface {
	currentTime: Date = new Date();
	
	setTime(d: Date) {
		this.currentTime = d;
	}
	
	constructor(h: number, m: number) {}
}
```

#### Extending Interfaces

- Like classes, interfaces can extend each other. This allows you to copy the members of one interface into another

```ts
interface Shape {
	color: string;
}

interface Square extends Shape {
	sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

### Enums

```ts
enum Color{
	Red,
	Green,
	Blue
}
let favColor: Color = Color.Red;

//use it in a function
function draw(color: Color, pattern: ...) {...}
```

### More OOP Concepts to cover…

- access control with protected, private and public
- getters and setters
- static properties
- abstract classes
- method overloading
	- <https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads>

## Generics

### Generic Function/interfaces

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

firstElement<string>(['apple', 'box', 'break']);
firstElement<number>([120, 1]);
firstElement([]); //undefined
```

```ts
interface Box<Type> {
  contents: Type;
}

const box: Box<string> = {contents: 'Movie'};
```

### Constraints

- A tool we can use to limit the kinds of types that a type parameter can accept.
- *in the example below we're saying the type passed to this function must have a property called length*

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```
