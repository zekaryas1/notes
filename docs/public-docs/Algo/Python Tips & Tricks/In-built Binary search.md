---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Saturday, January 20th 2024, 9:16:30 pm
title: In-built Binary Search
---

# In-built Binary Search

## Binary Search **bisect_left**

- If the elt is in the array returns first index of the elt otherwise the meaningful insertion point of x in a sorted list.

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
i = bisect_left(a, 7) # returns the index
if a[i] == 7:
	print("elt found at index", i)
else:
	print("elt not found but can be inserted at ", i)
```

### Binary Search **bisect_right** or Bisect

- If the elt is in the array returns (last index of the elt + 1) otherwise the meaningful insertion point of x in a sorted list.
- `bisect.bisect() == bisect.bisect_right()`

```python
import bisect
from bisect import bisect_right
a = [2, 4, 6, 8, 8, 8, 10, 12, 14] #sorted array
i = bisect_right(a, 8) # returns the last index + 1 or [bisect.bisect(a,8)]
j = bisect_right(a, 3) # returns where the elt fits in the array
print(i)
print(j)
```

### Search and Insert

```python
import bisect

sorted_list = [1, 3, 5, 7, 9]
bisect.insort(sorted_list, 4)

print(sorted_list) # Output: [1, 3, 4, 5, 7, 9]
```
