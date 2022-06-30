---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 16th 2022, 11:55:19 am
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
