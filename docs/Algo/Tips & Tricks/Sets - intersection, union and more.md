---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, July 3rd 2022, 11:01:34 am
title: 'Sets - Intersection, Union and More'
---

# Sets - Intersection, Union and More

- Set is a Collection of Unique Elements
	-  More interesting operations on set
		-   setA & setB == intersection…(find items common to both)
		-   setA | setB = union…all the items in one place
		-   setA – setB = all elements in A that aren’t in B

```python
a = set(['A', 'B', 'C','D'])
b = set(['C', 'D', 'E', 'F'])
print(a & b)
print(a | b)
print(a - b)
```

## Check if a word is without repeating characters

```python
def isUnique(word):
	return len(word) == len(set(word))

print(isUnique("set"))
print(isUnique("element"))
```