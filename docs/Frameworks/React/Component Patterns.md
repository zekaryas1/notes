---
title: Component Patterns
date created: Monday, November 3rd 2025, 1:35:50 pm
date modified: Thursday, November 6th 2025, 10:43:55 am
---

# Component Patterns

## Component Composition

### Compound Components

- Compound Components are a pattern where a parent component manages shared state or logic, and child components (the "compounds") communicate with that parent implicitly via React’s context or props — rather than passing a lot of props manually.
- Think of how `<Select>`, `<Select.Option>`, and `<Select.Label>` work in libraries like Radix UI or React Aria — that’s the pattern.

#### Problem

- **Problems:**
	- The user cannot easily customize the internal layout.
	- You must expose more and more props for customization (`buttonText`, `labelColor`, `layout`, etc.).
	- The API becomes rigid and bloated.

```jsx
//usage
<Toggle 
  on={isOn} 
  onToggle={() => setIsOn(!isOn)} 
  onLabel="Light Mode" 
  offLabel="Dark Mode" 
/>

function Toggle({ on, onToggle, onLabel, offLabel }) {
  return (
    <div>
      <span>{on ? onLabel : offLabel}</span>
      <button onClick={onToggle}>Toggle</button>
    </div>
  );
}
```

#### Solution

- Instead, we make a parent `<Toggle>` that holds the logic (state), and child components that access that logic automatically using React Context.
- Step 1: Create the parent component with context
	- `<Toggle>` that holds the logic (state), and child components that access that logic automatically using React Context.

```jsx
import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext(null);

export function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggleContext() {
  const context = useContext(ToggleContext);
  if (!context) throw new Error("Toggle compound components must be used inside <Toggle>");
  return context;
}
```

- Step 2: Create the Compound Components
	- Now the parent manages logic, and children “just work” without passing props around. You can rearrange, style, or extend them freely.

```jsx
export function ToggleOn({ children }) {
  const { on } = useToggleContext();
  return on ? children : null;
}

export function ToggleOff({ children }) {
  const { on } = useToggleContext();
  return !on ? children : null;
}

export function ToggleButton() {
  const { on, toggle } = useToggleContext();
  return (
    <button onClick={toggle}>
      {on ? "Switch Off" : "Switch On"}
    </button>
  );
}
```

- Step 3: Compose them better
	- The parent doesn’t expose tons of props.
	- Children automatically access shared state (no prop drilling).
	- Consumers can rearrange the internal structure however they want.
	- New sub-components can be added easily (`<Toggle.Icon>`, `<Toggle.Label>`, etc.).

```jsx
export default function App() {
  return (
    <Toggle>
      <ToggleOn>Light Mode</ToggleOn>
      <ToggleOff>Dark Mode</ToggleOff>
      <ToggleButton />
    </Toggle>
  );
}
```

### Prop-Based Composition

- You pass React elements as props into a parent component.
- This gives the parent component control over layout or logic, while allowing users to customize certain sections.
- When to use
	- When the layout is fixed, but you want to inject custom parts (e.g., header, footer, icons).
	- Common in Cards, Modals, Layouts, etc.

```tsx
type CardProps = {
  title: string;
  body: string;
  footer?: React.ReactNode; // Custom footer passed as prop
};

export function Card({ title, body, footer }: CardProps) {
  return (
    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 8 }}>
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
      <Text>{body}</Text>
      {footer && <View style={{ marginTop: 10 }}>{footer}</View>}
    </View>
  );
}

// Usage
<Card
  title="Welcome"
  body="This is your dashboard."
  footer={<Button title="Continue" onPress={() => console.log("Clicked")} />}
/>
```

#### Children Prop Composition

- The parent defines a container or structure and uses props.children to render whatever is passed inside.
- When to use
	- When the parent component doesn’t need to know the children’s structure.
	- Great for layouts, wrappers, providers, cards, etc.

```tsx
type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 8 }}>
      {children}
    </View>
  );
}

// Usage
<Card>
  <Text style={{ fontWeight: "bold" }}>Welcome</Text>
  <Text>This is your dashboard.</Text>
  <Button title="Continue" />
</Card>

```

### Render Props

- A render prop is a function prop that returns JSX.
- It allows a component to expose internal state to whatever is passed in — giving the caller control over rendering.
- When to use
	- When you want to share logic (like hover, fetch, or toggle) but give full control over rendering.

#### Render Props Based: Considered Old Syntax

```jsx
const DataFetcher = ({ render }) => {
  const data = "Fetched data!";
  return render(data);
};

const App = () => (
  <DataFetcher render={(data) => <p>{data}</p>} />
);

```

#### Children-As-A-Function Based: Considered Modern Syntax

```tsx
const DataFetcher = ({ url, children }) => {
  const data = "Fetched data";
  return children(data);
};

// Usage
<DataFetcher url="https://api.example.com/users">
  {(data) => (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  )}
</DataFetcher>


```

## Encapsulate Component's State

- Source [Encapsulate as much state as possible in your component](https://blacksheepcode.com/posts/encapsulate_as_much_state_as_possible)
- The idea of “Encapsulate as much state as possible in your component” is a React design principle and pattern that encourages keeping state localized (private) inside components rather than lifting it unnecessarily to parents or external stores.
- By contrast, encapsulated state:
	- keeps components self-contained
	- prevents unnecessary re-renders up the tree
	- simplifies the mental model (each component handles itself) and increases re-usability.

### Example 1: Button

- You click the button, it transitions to a loading state, then it transitions to either a success or error state.
- Whereby every bit of state that component could be in, is controlled by the parent and passed in as props.

```tsx
type SpecialButtonProps = {
    onClick: () => void;
    state: "loading" | "error" | "success" | "pending";
};

export function SpecialButton(props: SpecialButtonProps) {
    return <button onClick={props.onClick} disabled={props.state === "loading"} className={`special-button ${props.state}`}>
        {props.state === "loading" && <span>Loading...</span>}
        {props.state === "error" && <span >Error!</span>}
        {props.state === "success" && <span >Success!</span>}
        {props.state === "pending" && <span>Click Me</span>}
    </button>
}
```

- one that encapsulates the state transitions internally

```tsx
type SpecialButtonProps = {
    onClick: () => Promise<{ success: boolean }>;
};

export function SpecialButton2(props: SpecialButtonProps) {
    const [state, setState] = useState<"loading" | "error" | "success" | "pending">("pending");

    const handleClick = async () => {
        setState("loading");
        try {
            const result = await props.onClick();
            setState(result.success ? "success" : "error");
        } catch (error) {
            setState("error");
        }
    };

    return <button onClick={handleClick} disabled={state === "loading"} className={`special-button ${state}`}>
        {state === "loading" && <span>Loading...</span>}
        {state === "error" && <span>Error!</span>}
        {state === "success" && <span>Success!</span>}
        {state === "pending" && <span>Click Me</span>}
    </button>
}
```

- usage

```tsx
const mockAsyncOperation = async () => {
		await new Promise((res) => setTimeout(res, 100));
		return { success: true };
	}

return <SpecialButton2 onClick={mockAsyncOperation} />
```

### Example 2: Autocomplete

- Before encapsulating state

```tsx
export function Interactive() {

    //States and effects

    return <>
        <Autocomplete
            searchValue={searchValue}
            onChangeSearchValue={async (str) => {
                setSearchValue(str);
                if (searchValue.length < 3) {
                    setAvailableOptions([]);
                    return;
                }
                setIsLoading(true);
                try {
                    const result = await searchFn(searchValue, 1);
                }
                catch {
                    setAvailableOptions([]);
                }
                finally {
                    setIsLoading(false);
                }
            }}
            onSelectValue={(value) => {
                setSelectedValue(value);
                setSearchValue(value.name);
                setAvailableOptions([]);
            }}
            renderItem={(v) => { return <div>{v.name}</div> }}
            isLoading={isLoading}
            availableOptions={availableOptions}
        />
    </>
}
```

- after encapsulating
	- in the future , if you want to add debouncing, cancelling, pagination logic, all of that is encapsulated, hidden away inside, the parent component - the consumer does not need to think about, it's all taken care of for them.

```tsx
export function Interactive() {
    return (
        <div>
            <Autocomplete
                searchFn={searchFn}
                renderItem={(item) => <div>{item.name} - {item.description}</div>}
                itemKey="id"
                selectedValueDisplayStringFn={(item) => item.name}
            />
        </div>
    );
}
```
