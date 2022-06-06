---
date created: Sunday, June 5th 2022, 4:14:21 pm
date modified: Monday, June 6th 2022, 12:48:56 pm
title: Set is a Collection of Unique Elements
---

# Set is a Collection of Unique Elements

-   More interesting operations on set
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
