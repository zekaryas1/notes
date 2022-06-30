---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 16th 2022, 11:55:43 am
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
