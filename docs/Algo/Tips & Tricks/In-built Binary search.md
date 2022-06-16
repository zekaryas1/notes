# Binary Search **bisect_left**

- Returns index of the elt or the leftmost insertion point of x in a sorted list.

```python
from bisect import bisect_left
a = [4,5,6,7,8,9] #sorted array
i = bisect_left(a, 7) # returns the index
j = bisect_left(a, 3) # returns where the elt fits in the array
print(i)
print(j)
```

## Check Elt Exists with bisect_left

```python
from bisect import bisect_left
a = [4,5,6,7,8,9] #sorted array
i = bisect_left(a, 7) # returns the index
if a[i] == 7:
	print("elt found at index", i)
else:
	print("elt not found but can be inserted at ", i)
```
