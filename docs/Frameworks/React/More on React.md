---
title: More on React
date created: Sunday, October 2nd 2022, 4:31:59 pm
date modified: Sunday, December 7th 2025, 4:24:26 pm
---

# More on React

## Learn

### Server Function

- Server Functions enable **Client Components** to invoke async operations executed on the server.
- Defining a Server Function (`use server`)
	- **Directive**: Add the `use server` directive to the beginning of a function or a file to mark it as a Server Function.
	- **Where to Define**:
	    1. **Inside a Server Component**:
	        - Create the function with the `use server` directive.
	        - Pass it as a prop to Client Components or use it with a form.
	    2. **Inside a Server File** (file starting with `use server`):
	        - Define the function in the file and import it as needed.
- Guidelines for Using Server Functions:
	- **Call Context**:
		- Server Functions must be called within a [useTransition](#useTransition).
	    - When used with `<form action>` or `formAction`, they are automatically called in a transition.
	    - Transitions allow you to display a loading state during execution.
	- **Async Requirement**:
		- Server Functions must be asynchronous (`async`).
- Server Functions vs. Server Actions:
	- Server Actions are essentially Server Functions invoked via form actions.
	- This section focuses on using Server Functions **without forms**.
	    For using Server Actions, refer to the [With Server Function](https://chatgpt.com/c/e4cac5b8-41ed-4c04-914e-5dd8c7059c6e#Forms#With%20Server%20Function) section.

---
- Server component can create server function
	- you can access server resources inside a server function i.e. file resource, cookies, and database…

```jsx
function EmptyNote () {
  async function createNoteAction() {
    // Server Function
    'use server';
    
    await db.notes.create();
  }

  return <Button onClick={createNoteAction}/>;
}
```

```jsx
"use client";

export default function Button({ onClick }) {
  const [isPending, startTransition] = useTransition();
  console.log(onClick);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}
  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await onClick();
        });
      }}
    >
      Create Empty Note
    </button>
  );
}

```

- Client can import server functions from a server file

```jsx
"use server";

export async function createNote() {
  await db.notes.create();
}
```

```jsx
"use client";
import { createNote } from "./actions";

export default function Button({ onClick }) {
  const [isPending, startTransition] = useTransition();
  console.log(onClick);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}
  return (
    <button
	  disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await onClick();
        });
      }}
    >
      Create Empty Note
    </button>
  );
}

```

### Forms

#### Actions

- **Using Functions as Actions for Form Submissions**:
	- Automatic Handling form states, like reset or cleaner submission handling.
	- Actions can also be converted into **Server Functions**, making them **Server Actions**.
	    - Ensure Server Functions are:
	        - Defined within a Server Component.
	        - Or extracted into a server file and imported where needed.

```tsx
function Form() {
  const action = async (formData: FormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    const email = formData.get("email");

    console.log(formData.get("email"));
  };

  // action can also be Server Function
  const action = async (formData: FormData) => {
    "use server";
    await new Promise((res) => setTimeout(res, 1000));
    const email = formData.get("email");

    console.log(formData.get("email"));
  };

  return (
    <form action={action}>
      <input name="email" type="email" required />
      <button type="submit">Sign up</button>
    </form>
  );
}

```

- We can also have multiple submissions using `formAction`

```tsx
import { useActionState } from "react";

function Form() {
  const subscribeAction = async (formData: FormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    const email = formData.get("email");

    console.log(formData.get("email"));
  };

  const unSubscribeAction = async (formData: FormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    const email = formData.get("email");

    console.log(formData.get("email"));
  };

  return (
    <form action={subscribeAction}>
      <input name="email" type="email" required />
      <button type="submit">Sign up</button>
      <button formAction={unSubscribeAction}>Sign up</button>
    </form>
  );
}

```

- Using functions as actions is powerful, but we can enhance them further by leveraging React hooks to add additional functionality, such as:
	- Validation: Ensure inputs meet required criteria.
	- Last Response: Track and display the result of the last action.
	- Disabling Submit Button: Prevent multiple submissions while processing.
	- Server-Side Submission: Handle actions on the server for better performance and security.

#### Action State and Form Status

- `useActionState` to track the state of the form such as pending, action responses(messages).
	- [useActionState – React](https://react.dev/reference/react/useActionState) is a Hook that allows you to update state based on the result of a form action.
- Alternate to using the pending state from `useActionState` we can also use `useFormStatus` for showing loading state
	- [useFormStatus – React](https://react.dev/reference/react-dom/hooks/useFormStatus) is a Hook that gives you, status information of the last form submission.
	- `useFormStatus` is a client side hook thus you need to separate it to a new file and use `use client`
	- `useFormStatus` needs to have a parent form and cannot be placed alongside a form.

```tsx
"use client";
import { useActionState } from "react";

function Form() {
  const action = async (prev, formData: FormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    const email = formData.get("email");
    if (notEmail(email)) {
      return {
        error: "not valid email",
      };
    }
    console.log(formData.get("email"));
    //operation success, do redirect or sth
  };

  const [msg, actionState, pending] = useActionState(action, null);

  return (
    <form action={actionState}>
      <input name="email" type="email" required />
      <span>{msg?.error}</span>
      <button type="submit" disabled={pending}>
        Sign up
      </button>
    </form>
  );
}

```

```jsx
"use client"
import { useFormStatus } from "react-dom";
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

//now we can replace the parent form submit button with <Submit/>
```

#### With Server Actions

- Another way to handle forms is to use `Server Function` (a function marked with 'use server')
- Passing a Server Function to `<form action>` allow users to submit forms without JavaScript enabled or before the code has loaded.
	- This is beneficial to users who have a slow connection, device, or have JavaScript disabled and is similar to the way forms work when a URL is passed to the action prop.

```js
"use server";
export const action = async (prev, formData: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  const email = formData.get("email");

  if (notEmail(email)) {
    return {
      error: "not valid email",
    };
  }
  if (db.alredyExists(email)) {
    return {
      error: "email alredy exists thank you",
    };
  }
  console.log(formData.get("email"));
  //operation success, do redirect or sth
};

```

```jsx
"use client";
import { useActionState } from "react";
import { action } from "./action";

function Form() {
  const [msg, actionState, pending] = useActionState(action, null);

  return (
    <form action={actionState}>
      <input name="email" type="email" required />
      <span>{msg?.error}</span>
      <button disabled={pending}>Sign up</button>
    </form>
  );
}

```

### React Apis

#### Use

- [use – React](https://react.dev/reference/react/use) is a React API that lets you read the value of a resource like a Promise or context.
- Unlike React Hooks, use can be called within loops and conditional statements like `if`.
	- Like React Hooks, the function that calls use must be a Component or Hook.

```jsx
import { use } from 'react';

function MessageComponent({ messagePromise }) {
    const message = use(messagePromise);
    const theme = use(ThemeContext);
    // ...
}
```

- Unlike useContext, use can be called in conditionals and loops like if to access context data.

```jsx
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}
```

- Read [Suspense section](#Suspense) for more detail and examples.

#### Cache

- [cache – React](https://react.dev/reference/react/cache#noun-labs-1201738-(2)) **Purpose**:
    - Caches the result of a data fetch or computation.
    - The cache lasts the lifetime of a server request until the React component tree has finished rendering.
 - How to Define and Use `cache`
	1. **Define the Cache Outside the Component**:
	    - The cache can wrap a regular or async function.
	2. **Use the Cache Inside Components**:
	    - React determines whether to return cached values based on the inputs.
	    - For objects, React uses `Object.is` to compare inputs (inputs act as the cache key).
- Example
	- If multiple components (e.g., `AnimatedWeatherCard` and `MinimalWeatherCard`) request data for the same city, they will receive the same cached data.
	- If different city arguments are supplied, the data fetch will occur twice, and each component will receive distinct data.

```jsx
import {cache} from 'react';
import {fetchTemperature} from './api.js';

//1. define the cache outside component
const getTemperature = cache(async (city) => {
	return await fetch(`.../{city}`);
});

async function AnimatedWeatherCard({city}) {
    //2. use the cache inside component
	const temperature = await getTemperature(city);
	// ...
}

async function MinimalWeatherCard({city}) {
	//3. if the cache key: city is the same you get cached value
	const temperature = await getTemperature(city);
	// ...
}
```

- difference with memo, useMemo and next.js fetch API.
	- memo and useMemo only work on the client side
		- useMemo caches the result of an expensive function on the client side
		- memo caches a component considering the passed props
	- cache:
		- works on the server side too memoize work that can be shared across components.
	- next.js fetch
		- similar to next.js fetch, but you can use cache to manually memoize data requests for use cases when the fetch API is not suitable.
			- For example, some database clients, CMS clients, or GraphQL clients.

### Concurrent React

 - react without concurrency
	 - updates are rendered in a single, uninterrupted, synchronous transaction. With synchronous rendering, once an update starts rendering, nothing can interrupt it until the user can see the result on screen.
 - react with concurrency
	 - [Concurrent React Made Easy Youtube - Henrique Inonhe](https://www.youtube.com/watch?v=ssYDhx5ld7o)
	 - react may start rendering an update, pause in the middle, then continue later. It may even abandon an in-progress render altogether. React guarantees that the UI will appear consistent even if a render is interrupted.
	 - allows for more responsive user interfaces by breaking down the rendering work into smaller chunks and prioritizing which parts of the UI to render first.
 - concurrent features
	 - **Suspense**: Efficiently handles asynchronous rendering, showing fallback UIs during data fetching or lazy-loading.
	 - **useTransition**: Prioritizes urgent updates while deferring less critical ones for smoother interactions.
	 - **useDeferredValue**: Delays updating non-urgent UI elements to keep the app responsive during intensive operations.

#### Suspense

- What is [Suspense – React](https://react.dev/reference/react/Suspense)?
	- Suspense allows you to display a fallback UI while waiting for its children to load.
	- It works seamlessly with suspense-enabled data sources(ex: `use` Api) and is closely tied to React's Concurrent Mode.
	- Components can suspend rendering while waiting for asynchronous data, improving the user experience.
- When to Use Suspense
	1. **Client-Side Data Fetching** (e.g., React.js):
	    - Use the `use` hook to read cached promises.
	    - With libraries like React Query, you can use `useSuspenseQuery` as a replacement for React’s `use` hook.
	2. **Server-Side Data Fetching** (e.g., Next.js):
	    - Suspense works with asynchronous data fetching, as demonstrated in [Next.js sequential data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#sequential-data-fetching).
- Key Features
	- **Fallback UI**: Suspense displays a fallback (e.g., a loading spinner) until the data or child components are ready.
	- **Streaming**: Allows parts of the UI to render incrementally as they become ready, instead of waiting for the entire UI or page to load.
	    - [Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#what-is-streaming) works particularly well when using multiple Suspense components.
- Client side data fetching
	- Can be seen as a alternative to the pattern of loading data using useEffect on mount.
	- Caveat:
		- Promises created in Client Components are recreated on every render.
		- Promises passed from a Server Component to a Client Component are stable across re-renders

```jsx
<Suspense fallback={<Loading />}>
	<Albums artistId={artist.id} />
</Suspense>
```

```jsx
'use client'
export default function Albums({ artistId }) {
  const albums = use(async () => {
	const res = await fetch(`/albums/${artistId}`);
	return await res.json();
  });
  
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

- Server side data fetching
	- Example
		- The note content is important data for the page to render, so we await it on the server.
		- The comments are below the fold and lower-priority, so we start the promise on the server, and wait for it on the client with the `use` API.
		- This will Suspend on the client, without blocking the note content from rendering.

```jsx
async function Page({ id }) {
  // Will suspend the Server Component.
  const note = await db.notes.get(id);

  // NOTE: not awaited, will start here and await on the client.
  const commentsPromise = db.comments.get(note.id);
  return (
    <div>
      {note}
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}

// Client Component
"use client";
import { use } from "react";

function Comments({ commentsPromise }) {
  // NOTE: this will resume the promise from the server.
  // It will suspend until the data is available.
  const comments = use(commentsPromise);
  return comments.map((commment) => <p>{comment}</p>);
}

```

- Error handling when promise fall
	- Use `ErrorBoundary`, you need to wrap the suspense with ErrorBoundary and provide fallback to it.

```jsx
export function MessageContainer({ messagePromise }) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Suspense fallback={<p>⌛Fetching message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

- Using suspense with lazy loading
	- you can use Suspense with lazy loading to show loading when using Heavy components i.e. Map and Markdown

```jsx
const MarkdownPreview = lazy(() => delayForDemo(import('./MarkdownPreview.js')));

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('Hello, **world**!');
  return (
    <>
	  <Suspense fallback={<p>loading markdown...</p>}>
        <h2>Preview</h2>
        <MarkdownPreview markdown={markdown} />
      </Suspense>
    </>
  );
}
```

- Difference between client side Suspense and Server side Suspense

| Concept                               | **Code 1 (Inline)**                                             | **Code 2 (External)**                                                      |
| ------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Where the data promise comes from** | From an inline async function you define right in the component | From a promise created elsewhere (server component, module, or parent)     |
| **Who performs the fetch**            | The **client browser**                                          | Usually the **server** (or parent already fetched it)                      |
| **When it runs**                      | Runs when the component mounts on the client                    | Runs before render — the component just suspends until it resolves         |
| **Ideal for**                         | Small, client-side only data                                    | Server-rendered or pre-fetched data (RSC pattern)                          |
| **Caching**                           | None by default                                                 | Possible, if fetched server-side with React cache or Next.js fetch caching |
| **Performance**                       | Client fetches → slower initial load                            | Server fetches → faster SSR, less client work                              |

#### useTransition

- What is [useTransition – React](https://react.dev/reference/react/useTransition)?
	- A React Hook that allows you to render part of the UI in the background.
	- It enables you to mark certain state updates as non-blocking, keeping the UI responsive during the transition.
- Purpose
	- The primary goal of `useTransition` is to prioritize user interactions over less critical tasks by making certain tasks interruptible.
- **Examples:**
	1. **Chart Update Scenario**:
	    - If a chart component is being updated as part of a transition, and the user types into an input, React will pause the chart update to prioritize the input interaction.
	2. **Tab Navigation Scenario**:
	    - When a user clicks on a tab (handled with `startTransition`) and quickly switches to another tab, React will prioritize the most recent click, interrupting the ongoing update for the earlier click.
- Returned Values
	1. **`isPending`**:
	    - A flag indicating whether there is a pending transition in progress.
	2. **`startTransition`**:
	    - A function used to mark updates as part of a transition.
	    - Actions (functions) executed within `startTransition` are considered interruptible.
- Caveats
	- **State Updates after Async Requests**:
	    - Any state updates following an async operation must be wrapped in a new `startTransition` call to mark them as part of a transition.
	- **Not Suitable for Controlling Text Inputs**:
	    - Transitions are interruptible, making them unsuitable for controlling text input fields where real-time updates are required.

```tsx
import React, { useState, useTransition } from "react";

const ITEMS = ["Apple", "Banana", "Cherry"];

const SearchExample: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Use startTransition to mark this state update as non-blocking
    startTransition(() => {
      const filtered = ITEMS.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredItems(filtered);
    });
  };

  const handleSearchAsync = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // To access the pending state of a transition,
    // call startTransition again.
    startTransition(async () => {
      const filtered = await getFilteredItems(inputValue);
       setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <h1>Search Example</h1>
      <input
        type="text"
        placeholder="Search for items..."
        value={query}
        onChange={handleSearch}
      />
      {isPending && <p>Loading...</p>}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchExample;
```

- More
	- if you don't need to pending state, you can import startTransition from React and not the useTransition hoot.
	- you can pass the action(the function that goes inside the startTransition) as props
		- [Exposing action prop from components ](https://react.dev/reference/react/useTransition#exposing-action-props-from-components)
	- you can combine Transition with suspense to prevent already revealed content from hiding or indicate a transition is happening
		- [Displaying a pending visual state ](https://react.dev/reference/react/useTransition#displaying-a-pending-visual-state)

#### `useDeferedValue`

- What is `useDeferredValue`?
	- [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) is a React Hook that lets you defer updating a part of the UI until more critical updates are completed.
- Comparison with `useTransition`
	- **Commonalities:**
		- Both aim to keep the UI responsive by deferring updates to less critical parts of the interface.
		- If an update is already inside a `startTransition`, `useDeferredValue` simply returns the new value without spawning a separate deferred render.
	- **Differences:**
		- **Scope:**
		    - `useDeferredValue` wraps values (state values or props) instead of setter functions (`setState`).
		- **Use Case:**
		    - `useDeferredValue` is ideal for scenarios where you need to defer updates to props or global state values that you cannot directly control or set.
- Comparison with Debouncing and Throttling
	- **Similarities:**
		- `useDeferredValue` behaves like a built-in debounce mechanism by deferring updates to less critical computations or renders.
	- **Differences:**
		1. **No Fixed Delay:**
		    - Unlike debouncing or throttling, `useDeferredValue` does not rely on a preset delay.
		    - On faster devices, deferred updates occur almost instantaneously. On slower devices, updates "lag" in proportion to available resources.
		2. **Interruptibility:**
		    - Deferred renders using `useDeferredValue` are interruptible, allowing React to prioritize urgent user interactions over background updates.

```jsx
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);


  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
	     <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

- showing loading screen

```jsx
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const isStale = query !== deferredQuery;

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
	    <div classname={isStale ? "animate-blink" : "animate-none"}>
	        <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

### Other Useful Hooks & Concepts

#### useRef

- It can be used to store a mutable value that does not cause a re-render when updated.
	- For states that shouldn't cause re-render
- It can also be used to access a DOM element directly.
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

> In the above example, If we tried to count how many times our application renders using the useState Hook(inside the useEffect hook), we would be caught in an infinite loop since this Hook itself causes a re-render.

- DOM manipulation using useRef

```tsx
import React, { useRef } from 'react';

const InputFocusExample: React.FC = () => {
    // Create a ref to store a reference to the input element
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocusClick = () => {
        // Access the DOM element using the ref and focus it
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <h1>Focus Input Example</h1>
            <input
                type="text"
                placeholder="Type something..."
                ref={inputRef} // Attach the ref to the input element
            />
            <button onClick={handleFocusClick}>Focus Input</button>
        </div>
    );
};

export default InputFocusExample;
```

#### useContext

- what is react-context or `useContext` ?
	- `useContext` is a hook in React that enables components to consume context values created by a parent component and passed down through the component tree.
	- It is an alternative to the prop drilling technique used to pass down data through several layers of components.
- How to use `useContext`
	- create context
	- provide the context at parent with modifier `Context.provide`
	- use the context in child components with `useContext`

```js
//create the context
const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

```js
//provide it at the parent, root/parent layout
const App = ({children}) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
export default App;
```

```js
//use it inside a child
function Button() {
  const { theme, toggle } = useTheme();
  return <Pressable onPress={toggle}>Current theme: {theme}</Pressable>;
}
```

#### useOptimistic

- The useOptimistic hook lets you:
	- Keep a temporary optimistic state (e.g., adding a new item before the API confirms it).
	- Revert to the real state if the operation fails.
	- Avoid flickers and spinners for fast, confident UIs.

```tsx
"use client";

import { useState, useOptimistic, startTransition } from "react";


export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "This is the first comment" },
  ]);

  // --- useOptimistic manages the temporary optimistic state
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newComment: Comment) => [...currentComments, newComment]
  );

  async function handleAddComment(formData: FormData) {
    const text = formData.get("text") as string;

    // Create a temporary comment (not yet confirmed by backend)
    // Immediately show the optimistic comment
    addOptimisticComment({
      id: Math.random(), // temporary client ID
      text,
    });

    // Now a network call to save it
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const saved = await res.json();
      
      // Update the *real* list
      startTransition(()=>{
		setComments((prev) => [...prev, saved]); 
      });
      
    } else {
      alert("Failed to save comment!");
    }
  }

  return (
    <div>
      <h2>Comments</h2>

		//
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>

      <form action={handleAddComment}>
        <input type="text" name="text" placeholder="Add comment..." />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

```

#### useReducer

- Components with many state updates spread across many event handlers can get overwhelming.
	- For these cases, you can consolidate all the state update logic outside your component in a single function, called a reducer.
- Comparison to useState:
	- Both have the same functionality can be used exchangeably but useReducer can be a better alternative when you have large state logic and scalable solution
		- useReducer can help cut down on the code if many event handlers modify state in a similar way.
		- useReducer lets you cleanly separate the how of update logic from the what happened of event handlers.
		- userReducer is easier to test as it has central place of logic handling
	- Note Just like useState, Reducers must be pure.

```jsx
export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return //show task...
}
```

- To convert from useState to useReducer:
	- Dispatch actions from event handlers.
		- Each action should describes a single user interaction.
	- Write a reducer function that returns the next state for a given state and action.
	- Replace useState with useReducer.

```jsx
export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return   return //show task...
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

#### Custom Hooks

- Encapsulate logic (state, effects, data fetching, subscriptions, etc.) into reusable functions that start with use.

```jsx
function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url).then(res => res.json()).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}

function UserList() {
  const { data, loading } = useFetch("/api/users");
  if (loading) return <Text>Loading...</Text>;

  return data.map((user) => <Text key={user.id}>{user.name}</Text>);
}

```

### React Web Workers

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

### Different Ways to Write CSS in React

#### Import Styles

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

#### Write Inline Styles

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

#### Use CSS Modules

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
import styles from "./styles.module.css"; //you have to import it like this
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

## Best Practices

### Use Typescript

- [How to add types to react](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)

### State

#### State Should Be Immutable

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

> [How to use Readonly to enforce state immutability](Programming%20langs/TypeScript/More%20on%20TypeScript.md#Readonly)

#### Avoid Props in Initial States

> Don't initialize state with props which can be changed later. Instead, use props directly in the component.

```jsx
//before
function EditPanelComponent({applyCoupon}) {
	const [applyCoupon, setapplyCoupon] = useState(applyCoupon)
    
    return (
	    <div>
            {applyCoupon && <CuuponInput placeholder={"enter cupon"}/>}
        </div>
    );
}
```

- If the props are changed without the refreshing the component,
	- the new prop value will never be assigned to the state’s `applyCoupon`.
- This is because the constructor function is only called when `EditPanelComponent` is first created.

```js
//after
function EditPanelComponent({applyCoupon}) {
    
    return (
	    <div>
            {applyCoupon && <CuuponInput placeholder={"enter cupon"}/>}
        </div>
    );
}
```

### React Compiler

- React Compiler is a new build-time tool that automatically optimizes your React app. It works with plain JavaScript, and understands the Rules of React, so you don’t need to rewrite any code to use it.
- [React Compiler](https://react.dev/learn/react-compiler/introduction)

> The following re-render optimization methods might not be required in most cases, but still relevant for some neat cases.

#### React Memoization

- There are three ways we can achieve memorization in react
	- Pure-Component for memorizing Class-Based components
		- *no discussed since class components are no longer recommended*
	- React.memo for memorizing functional components
		- `useCallback` for memorizing function instance
	- useMemo for memorizing heavy functions result

##### React.memo : Memorize React Components

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

> You should always use React.memo LITERALLY, as comparing the tree returned by the Component is always more expensive than comparing a pair of props properties

##### useMemo : Memorize Function Result

```js
const multiply = (x,y) => {
  return x*y
}

const cachedValue = useMemo(() => multiply(x, y), [x, y])

return <p>{ cachedValue(12,12) }</p>
```

- The computed result is stored in the `cachedValue` variable and `useMemo()` Hook will return it each time unless the inputs are changed.

### Avoid Inline Function inside Render

- Since functions are objects in JavaScript `({} !== {})`, the inline function will always fail the prop diff when React does a diff check.
- An arrow function will create a new instance of the function on each render if it's used in a JSX property.
	- This might create a lot of work for the garbage collector.

```js
//before
<Comment onClick={(e)=> setState({elt: e})} comment={comment} key={comment.id}/>


//after
onCommentClick = (event) => {
	setState({elt:event}) 
}

<Comment onClick={onCommentClick} comment={comment} key={comment.id}/>
```

### Spreading Props on DOM Elements

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
