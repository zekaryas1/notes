---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Monday, July 25th 2022, 8:59:53 pm
title: String Operations
---

# String Operations

## Reverse a String

```python
a = "hello world"
print(a[::-1])
```

## String Concatenation

* In java string concatenation is O(n\**2) thus you should use StringBuilder.
* In python string concatenation is O(n), because the underline cpython handles the string builder.
* In python string is immutable, thus you can not do string replacement in place.
	* Instead convert it into a list.

## String Formatting

```python
print(f"The solution to 24 + 24 is {24 + 24}")
```
