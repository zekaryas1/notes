---
title: Best Practices
date created: Sunday, October 2nd 2022, 4:31:59 pm
date modified: Sunday, April 30th 2023, 2:18:03 pm
---

# Best Practices

## Use Typescript

- [How to add types to react](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)

## State

### State Should Be Immutable

> React state should be treated as immutable. We should never mutate this.state directly, as calling setState() afterward may replace the mutation you made.

```js
addNewUser = () =>{
   /**
	*  OfCourse not correct way to insert
	*  new user in user list
	*/
   const users = this.state.users;
   users.push({
	   userName: "robin",
	   email: "email@email.com"
   });
   setState({users: users});
}
```

- The concern here is that we are pushing new users onto the variable users, which is a reference to `this.state.users`.

```js
//for array
addNewUser = () => {
   setState(state => ({
	 users: [...state.users, {newdata}]
   }));
};

//for object
addNewUser = () => {
   setState(state => ({
	 users: {...state.users, age: newdata}
   }));
};
```

> [How to use Readonly to enforce state immutability](Programming%20langs/TypeScript/More%20on%20Typescript.md#Readonly)

### Avoid Props in Initial States

> Don't initialize state with props which can be changed later. Instead, use props directly in the component.

```js
//before
class EditPanelComponent extends Component {
    
    constructor(props){
        super(props);

        this.state ={
            isEditMode: false,
            applyCoupon: props.applyCoupon
        }
    }

    render(){
        return <div>
                    {this.state.applyCoupon && 
                    <>Enter Coupon: <Input/></>}
               </div>
    }
}
```

- If the props are changed without the refreshing the component,
	- the new prop value will never be assigned to the state’s `applyCoupon`.
- This is because the constructor function is only called when `EditPanelComponent` is first created.

```js
//after
class EditPanelComponent extends Component {
    
    constructor(props){
        super(props);

        this.state ={
            isEditMode: false
        }
    }

    render(){
        return <div>{this.props.applyCoupon && 
         <>Enter Coupon:<Input/></>}</div>
    }
} 
```

## Use Memoization

- There are three ways we can achieve memorization in react
	- Pure-Component for memorizing Class-Based components
		- *no discussed since class components are no longer recommended*
	- React.memo for memorizing functional components
		- `useCallback` for memorizing function instance
	- useMemo for memorizing heavy functions result

### React.memo : Memorize React Components

- Memo allows us to implement memorization in functional components
- It will only force the component to re-render if the props are changed.

```js
const UserDetail = ({title, full_name, profile_img}) =>{

    return (
        <div className="user-detail-wrapper">
            <img src={profile_img} />
            <h4>{full_name}</h4>
            <p>{title}</p>
        </div>
    )
}

export default React.memo(UserDetail);

//usage in parent component
return (
	<>
		<p>{counter}</p>
		<UserDetail 
			title="Mr." 
			full_name="Zack" 
			profile_img="image.png"
			/>
		//other components
	</>
);

```

- in the above examples, `UserDetail` will not re-render as long as it's props aren't changes even if the other components re-render, however React.memo has one limitation
	- it is unable to handle functional props, if we introduce callback functions to `userDetail` component its behavior will change

```js
//..prev code

//usage in parent component
const updateProfile = () => {
	//...
}
return (
	<>
		<p>{counter}</p>
		<UserDetail 
			title="Mr." 
			full_name="Zack" 
			profile_img="image.png"
			onUpdateClick={updateProfile}
			/>
		//other components
	</>
);

```

- based on the above new code, if you somehow we change `counter variable i.e using setCounter` `UserDetail` will `re-render` even tough its props hasn't changed, how can we fix this
	- `useCallback` is typically used to optimize the performance of child components that depend on a function prop.
	- By `memoizing` the function using `useCallback`, we can prevent unnecessary re-renders of the child components that use the function, even if the function's dependencies change.

```jsx
//..prev Code
//usage in parent component

const updateProfile = useCallback(() => {
	//...
}, []);

// if we have a function with parameters
// const updateProfile = useCallback((a,b) => {
//	//...
//}, [a,b]);

return (
	<>
		<p>{counter}</p>
		<UserDetail 
			title="Mr." 
			full_name="Zack" 
			profile_img="image.png"
			onUpdateClick={updateProfile}
			/>
		//other components
	</>
);
```

> You should always use React.memo LITERALLY, as comparing the tree returned by the Component is always more expensive than comparing a pair of props properties [Source](When should you NOT use React memo? - Stack Overflow](<https://stackoverflow.com/a/63405621)>

### useMemo : Memorize Function Result

```js
const multiply = (x,y) => {
  return x*y
}

const cachedValue = useMemo(() => multiply(x, y), [x, y])

return <p>{ cachedValue(12,12) }</p>
```

- The computed result is stored in the `cachedValue` variable and `useMemo()` Hook will return it each time unless the inputs are changed.
- ![](https://pbs.twimg.com/media/DqaQy-7VAAEc-u5.jpg)

## Other Useful Hooks & Concepts

### useRef

- It can be used to store a mutable value that does not cause a re-render when updated.
	- For states that shouldn't cause re-render
- It can be used to access a DOM element directly.
- value is stored inside current property, `{current: $value}`

```jsx
function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <h1>Render Count: {count.current}</h1>
    </>
  );
}
```

- In the above example, If we tried to count how many times our application renders using the useState Hook{inside the useEffect hook}, we would be caught in an infinite loop since this Hook itself causes a re-render.

### useContext

- what is react-context or `useContext` ?
	- `useContext` is a hook in React that enables components to consume context values created by a parent component and passed down through the component tree.
	- It is an alternative to the prop drilling technique used to pass down data through several layers of components.
- How to use `useContext`
	- create context
	- provide the context at parent with modifier `Context.provide`
	- use the context in child components with `useContext`

```js
//create the context
import React from "react";
const CountContext = React.createContext();

export default CountContext;
```

```js
//provide it at the parent
import React, { useState } from "react";
import Child from "./Child";
import CountContext from "./context";

const App = () => {
  const [count, setCount] = useState(0);

  const countHandler = () => {
    setCount(count + 1);
  };

  return (
    <CountContext.Provider value={{ count, countHandler }}>
      <Child />
      <h2>{count}</h2>
    </CountContext.Provider>
  );
};

export default App;
```

```js
//use it inside a child
import { useContext } from "react";
import CountContext from "./context";

const Child = () => {
  const { countHandler } = useContext(CountContext);

  return (
    <div>
      <button onClick={countHandler}>Increment</button>
    </div>
  );
};
export default Child;
```

## Avoid Inline Function Definition in the Render Function.

- Since functions are objects in JavaScript `({} !== {})`, the inline function will always fail the prop diff when React does a diff check.
- An arrow function will create a new instance of the function on each render if it's used in a JSX property.
	- This might create a lot of work for the garbage collector.

```js
//before
<Comment onClick={(e)=> this.setState({elt: e})} comment={comment} key={comment.id}/>


//after
onCommentClick = (event) => {
	this.setState({elt:event}) 
}

<Comment onClick={this.onCommentClick} comment={comment} key={comment.id}/>
```

## Spreading Props on DOM Elements

> You should avoid spreading properties into a DOM element as it adds unknown HTML attribute, which is unnecessary and a bad practice.

```js
<div {...props}>
	{props.text}
</div>
```

- Instead of spreading props, you can set specific attributes:

```js
<div witdth={props.width} hight={props.hight}>
	{props.text}
</div>
```

## React Web Workers

- [Popular react web worker library](https://www.npmjs.com/package/@shopify/react-web-worker)
- [Web Worker](Programming%20langs/JavaScript/You%20Should%20Know%20JavaScript.md#Web%20Worker)

```js
import React, {useEffect} from 'react';
import {Page} from '@shopify/polaris';
import {createWorkerFactory, useWorker} from '@shopify/react-web-worker';

// assume ./worker.ts contains
// export function hello(name) {
//  return `Hello, ${name}`;
// }

const createWorker = createWorkerFactory(() => import('./worker'));

function Home() {
  const worker = useWorker(createWorker);
  const [message, setMessage] = React.useState(null);

  useEffect(() => {
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!
      const webWorkerMessage = await worker.hello('Tobi');
      setMessage(webWorkerMessage);
    })();
  }, [worker]);

  return <Page title="Home"> {message} </Page>;
}
```

## Different Ways to Write CSS in React

### Import Styles

```jsx
import "./Components/css/App.css"; //imported styles
function App() {
  return (
    <div className="main">
    </div>
  );
}
export default App;
```

### Write Inline Styles

```jsx
<div className="main" style={{color:"red"}}>
```

- or construct an object of styles

```jsx
function App() {
  const styles = {
    main: {
      backgroundColor: "#f1f1f1",
      width: "100%",
    },
    inputText: {
      padding: "10px",
      color: "red",
    },
  };
  return (
    <div className="main" style={styles.main}>
      <input type="text" style={styles.inputText}></input>
    </div>
  );
}
export default App;
```

### Use CSS Modules

- CSS Modules allows us to use the same class name in multiple files without clashes since each class name is given a unique programmatic name.
- This is especially useful in larger applications. Every class name is scoped locally to the specific component in which it is being imported.
- rule
	- create a file ending with .module.css

```css
/* styles.module.css */
.font {
  color: #f00;
  font-size: 20px;
}
```

```jsx
import styles from "./styles.module.css";
function App() {
  return (
    <h1 className={styles.heading}>Hello World</h1>
  );
}
export default App;
```

- Other relevant methods
	- TailwindCSS
	- Styled-components
