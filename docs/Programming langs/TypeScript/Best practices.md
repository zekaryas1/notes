---
title: Best Practices
date created: Saturday, February 25th 2023, 1:21:38 pm
date modified: Sunday, February 26th 2023, 10:41:47 am
---

# Best Practices

## Harden Type-checking with Configurations

- using typescript configuration we can make type-checking strict, making it easy to stop bugs.

```json
//tsconfig.json
{
	"compilerOptions": {
		"noImplicitAny": true
	}
}
```

- Turn on *noImplicitAny* unless you are transitioning a JavaScript project to Typescript.
- Use *strictNullChecks* to prevent “undefined is not an object”- style runtime errors.
- Aim to enable *strict* to get the most thorough checking that Typescript can offer.
