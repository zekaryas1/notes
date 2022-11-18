---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, July 3rd 2022, 11:38:27 am
title: Sorting in Python
---

# Sorting in Python

- Two type of sort
	- Sorting in place
	- Sorting out of place

```python
a = [5,4,3,2,1]
b = sorted(a) #return a new list not in place
a.sort() # sort in place
print(b)
print(a)
```

## Sort by Key

- When you have a 2D or > 1D list D = Dimension

```python
a = [[5,4], [4,3], [3,2], [2,1]]
a.sort(key = lambda x: x[1]) #sort by the second key
print(a)
```

- To get the sorted output in reverse {decreasing}

```python
a.sort(key=lambda x: x[1], reverse=True)
```
