---
title: Best Practices
date created: Sunday, October 2nd 2022, 4:31:59 pm
date modified: Monday, October 3rd 2022, 12:32:00 am
---

# Best Practices

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

## Memoization

### React.memo : Memorize React Components

>  if a component attribute is less likely to change, or it is either static or stateless use memorization

```js
const UserDetails = ({user, onEdit}) =>{
    const {title, full_name, profile_img} = user;

    return (
        <div className="user-detail-wrapper">
            <img src={profile_img} />
            <h4>{full_name}</h4>
            <p>{title}</p>
        </div>
    )
}

export default React.memo(UserDetails)
```

### useMemo : Memorize Function Result

```js
const multiply = (x,y) => {
  return x*y
}

const cachedValue = useMemo(() => multiply(x, y), [x, y])
```

- The computed result is stored in the `cachedValue` variable and `useMemo()` Hook will return it each time unless the inputs are changed.
- ![](https://pbs.twimg.com/media/DqaQy-7VAAEc-u5.jpg)

### useCallback

- The React useCallback Hook returns a memoized callback function.
- This allows us to isolate resource intensive functions so that they will not automatically run on every render.
- The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.

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

### Depdendeny Array

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
- [Web Worker](Javascript.md#Web%20Worker)

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
