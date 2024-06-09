---
title: Next 13 - WIP
date created: Thursday, September 21st 2023, 12:39:07 pm
date modified: Sunday, March 17th 2024, 11:12:36 am
---

# Next 13 - WIP

- New rendering options
	- Static site generation
	- Incremental static site generation
	- Server side rendering
	- Client side rendering
	- What is possible C > S, or S > C
- Navigation
	- don't ues `<a>` tag, instead use the `Link` component for navigation
- Data fetching
	- Caching
- Layout
- Translation
- Authentication and Authorization
	- both client and server side
- Server Actions

## Migration

- Migration doc to transfer knowledge from next 12 to 13
	- [Upgrading: App Router Migration | Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

## Rendering

### Server Side Rendering(Dynamic rendering)

- By default every page inside app folder is Server component
- Limitation of server components, is it can not
	- listen to browser events
	- use interactive react `apis`
		- `useeffect`, `usestate`…
	- access browser `apis`
- A Server component can't have a client(interactive) component directly
	- this means you can not use state elts(useState) inside server components
	- however you can extract the client elt to client component('use client') and add that to server component
- when you use fetch with no-cache configuration, next will consider it as server side and return new content for each request.
	- `const data = await fetch('url', { cache: 'no-store' });`
- You can use client side components inside Server components such as Third-part libraries, Context…however
	- they must use 'use client' decoration inside their definition
		- if the component/resource you're using doesn't have that you can create a new file that exports the component with 'use client' string
		- *no need to worry about this when working client side*

### Static Rendering

- when you use default fetch without any cache configuration, next will consider it as static site and build it at build time.
	- `const data = await fetch('url');`

### Combining Static and Dynamic Rendering

- Start with Static rendering
	- on your fetch data, you only include certain/popular results
	- next.js will render them at build time
	- When next.js finds pages that are not included in our fetch(not so popular result) it will switch to dynamic rendering

### Client Side Rendering

> `"use client"` doesn't need to be defined in every component that needs to be rendered on the client. Once you define the boundary, all child components and modules imported into it are considered part of the client bundle.

- Passing server components to client component as props
	- it is not supported to use Server components directly inside client components like you do with server components
		- you are free to add Client components inside Server components
	- however there is a pattern to pass Server Components to client, which is by using Props

```js
'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

```js
//page.js
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

## Data Fetching

- Client side
	- useState + useEffect
	- React query
- Server side
	- how to
		- make component async
		- directly call and use from your api
	- caching
		- only works with next fetch api, ex: doesn't work with axios yet
		- types:
			- default
				- no cache option passed
					- still has request time cache, same request won't be sent twice during request time, *cache are cleared after render is done*
				- next will consider as static site rendering
			- cache: 'no-store'
				- don't cache -> Frequently changing data
			- next: `{ revalidate: 10 }`
				- `revalidate` every 10 second

```tsx
cons UsersPage = async ()=>{
	const data = await fetch('url');

	return <ShowData data={data} />
}
```

```ts
const data = await fetch('url'); //static site rendering
const data = await fetch('url', { cache: 'no-store' });  //server side rendering
const data = await fetch('url', { next: { revalidate: 10 } }); //incremental static site rendering
```

## Styling Options

- Global styles
	- for entire application
	- with `global.css`
- CSS modules
	- for a single component, doesn't clash with other styles
	- name has to be [name].module.css
	- inside the module css avoid
		- using -(hyphen) as it cause issues with js

```js
//name.module.css
.card{
	//..
}

//name.js
import styles from './name.module.css'

return <div classname={styles.card}><div>
```

## Server Actions

- When you have codes that you want to run on server
	- ex: saving form data, performing an action when button is clicked
- use the keyword `use server` inside a function to create server actions
- Server actions can be used in two ways
	- server side
		- inside the same file
		- or imported from normal file
	- client side
		- only imported from a normal file
- you have access to cookies in server action where you can CRUD cookies
- when using server actions in client side you also have access to
	- loading state with `useFormState()`
	- error state
	- optimistic update with `useOptimisticUpdate()`

```ts
async function saveFormData(formData){
	'use server'
	const name = formData.get("name").valueOf();

	// revalidateTag('users');  //revalidate cache using tag
	// revalidatePath('/');  //revalidate entire path
	// redirect(`/user/${name}`);  //redirect at the end
}
```

### Prevent Client Side Usage

- To prevent environment variables from leaking to public
	- use non-public env definition
	- *if a client used the env variable they will get empty value*
- To prevent modules or files from client side usage use 'server-only' package
	- *if a client used the module/file they will get a build time error*

```js
import 'server-only'
 
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}
```

## Routing Hooks

- Hooks
	- only available from server side
		- useRouter
			- imported from next/navigation
			- for programmatic navigation from client side
		- usePathname
		- useSearchParams
			- get query
- Link
	- for navigation from both client and server side

## Rendering + Data Fetching

- server side rendering
	- no cache, each request handled at runtime
	- same as `getServerSiderProps`
	- must include 'no-store'
	- you can access headers and cookies inside server side components

```ts
// `app` directory
 
// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()
 
  return projects
}
 
export default async function Dashboard() {
  const projects = await getProjects()
 
  return <ProjectList projects={projects} />
}

//cookies and header inside server side 
import { cookies, headers } from 'next/headers'
 
async function getProjects() {
  const authHeader = headers().get('authorization')
 
  return '...'
}


//passing dynamic params data
///projects/[id]/page.tsx
export default async function Dashboard({ params }) {
  const projects = await getProjectsById(params.id);

}
 
```

- server side rendering with Streaming
	- Imagine you have a page with multiple extensive data to show and you are using server side rendering
	- With default setup the page will take time to show content as fetching associated data takes time, you might consider two solution for this in next 13
		- 1. show loading state, with next 13 you can create a file called `loading.js` inside a module/folder to show loading state to user
			- however this will let the user know something is happening but it still takes time can we do better yes
		- 2. Streaming: **Streaming** allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client.
			- when we have a large data to show such as combination of `recommendedFeed`, `trendingFeed`… we can use streaming to display part of user's page sooner without waiting for all data to load before any UI can rendered

```ts
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <RecommendedFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <TrendingFeed />
      </Suspense>
    </section>
  )
}
```

- static site generation
	- similar to `getStaticProps`
	- default fetch mechanism, requests are cached until invalidated

```ts
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()
 
  return projects
}
 
export default async function Index() {
  const projects = await getProjects()
 
  return projects.map((project) => <div>{project.name}</div>)
}
```

- static site generation with dynamic paths
	- similar to getstaticPaths
	- requests are cached
	- new api is called `generateStaticParams`
	- for params outside of `generateStaticParams` you have two options to configure with `dynamicParams`
		- dynamicPrams = true(default),
			- dynamic params not included in `getnerateParams` are rendered on ser on demand and cached
		- dynamiParams = false
			- params not included will return 404

```ts
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}
 
async function getPost(params) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  return post
}
 
export default async function Post({ params }) {
  const post = await getPost(params)
 
  return <PostLayout post={post} />
}
```

```ts
export const dynamicParams = true;
 
export async function generateStaticParams() {
  return [...]
}
 
async function getPost(params) {
  ...
}
 
export default async function Post({ params }) {
  const post = await getPost(params);
 
  return ...
}
```

- incremental static site generation
	- use fetch with re-validate option, which will cache the request for the specified amount of seconds

```ts
async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()
 
  return data.posts
}
 
export default async function PostList() {
  const posts = await getPosts()
 
  return posts.map((post) => <div>{post.name}</div>)
}
```
