---
title: More on List
date created: Friday, November 18th 2022, 1:45:19 pm
date modified: Friday, November 18th 2022, 1:51:23 pm
---

# More on List

## Different Ways of Copying a List

- There are a number of ways to clone or copy a list in python
	- using slice operator
	- using copy method
	- deep coping
	- …for more [python-cloning-copying-list](https://www.geeksforgeeks.org/python-cloning-copying-list)

### Using the Slicing Technique: Fastest Way

```python
a = [1,2,3,4,4]
b = a[::] #same as a[:]
#b = a[::-1] #to copy and reverse
a[-1] = 5
print(a)
print(b)
```

### Using the copy() Method

```python
a = [1,2,3,4,4]
b = a.copy()
a[-1] = 5
print(a)
print(b)
```
