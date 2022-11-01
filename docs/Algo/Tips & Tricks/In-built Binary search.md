---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Tuesday, November 1st 2022, 1:06:51 pm
title: In-built Binary search
---

# In-built Binary Search

## Binary Search **bisect_left**

- Returns index of the elt or the leftmost insertion point of x in a sorted list.

```python
from bisect import bisect_left
a = [2, 4, 6, 8, 8, 8, 10, 12, 14] #sorted array
i = bisect_left(a, 8) # returns the index
j = bisect_left(a, 3) # returns where the elt fits in the array
print(i)
print(j)
```

### Check Elt Exists with bisect_left

```python
from bisect import bisect_left
a = [2, 4, 6, 8, 8, 8, 10, 12, 14] #sorted array
i = bisect_left(a, 8) # returns the index
if a[i] == 8:
	print("elt found at index", i)
else:
	print("elt not found but can be inserted at ", i)
```

### Binary Search **bisect_right** or Bisect

- Similar to [`bisect_left()`](https://docs.python.org/3/library/bisect.html#bisect.bisect_left "bisect.bisect_left"), but returns an insertion point which comes after (to the right of) any existing entries of _x_ in _a_.
- `bisect.bisect() == bisect.bisect_right()`

```python
import bisect
from bisect import bisect_right
a = [2, 4, 6, 8, 8, 8, 10, 12, 14] #sorted array
i = bisect_right(a, 8) # returns the index or [bisect.bisect(a,7)]
j = bisect_right(a, 3) # returns where the elt fits in the array
print(i)
print(j)
```
