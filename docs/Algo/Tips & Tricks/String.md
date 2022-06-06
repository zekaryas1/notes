---
date created: Sunday, June 5th 2022, 4:14:21 pm
date modified: Monday, June 6th 2022, 12:48:56 pm
title: Reverse a String
---

# Reverse a String

```python
a = "hello world"
print(a[::-1])
```

# String Concatenation

* In java string concatenation is O(n\**2) thus you should use StringBuilder.
* In python string concatenation is O(n), because the underline cpython handles the string builder.
* In python string is immutable, thus you can not do string replacement in place.
	* Instead convert it into a list.
