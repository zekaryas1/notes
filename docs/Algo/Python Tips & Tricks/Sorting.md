---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Saturday, January 20th 2024, 9:24:01 pm
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

- To get the sorted output in reverse(decreasing)

```python
a.sort(key=lambda x: x[1], reverse=True)
```

## Maintaining Sort Order

- What do we mean by maintaining sort order?
	- Maintaining a sorted list refers to the process of keeping a list of elements in a particular order(`ASC` or `DESC`).
	- This allows for efficient querying, insertion, and deletion of elements while preserving the sorted order.
- Maintaining a sorted list in Python can be achieved using various data structures and libraries.
	- This can depend on either we have sorted list or unsorted list(stream of unknown inputs)

### Given Sorted List

- binary search to find the index and adding the element there,
	- finding the position is `Ologn`, but the insertion will force us to shift all the left elements one step backward witch is `On`, thus overall `Onlogn`
- heap to propagate the number up to the right position, `Ologn`

```python
import bisect

sorted_list = [1, 3, 5, 7, 9]
bisect.insort(sorted_list, 4)

print(sorted_list) # Output: [1, 3, 4, 5, 7, 9]
```

```python
sorted_list = [1, 3, 5, 7, 9]
position = bisect.bisect(sorted_list, 4)
sorted_list.insert(position, 4)

print(sorted_list) # Output: [1, 3, 4, 5, 7, 9]
```

```python
import heapq

sorted_list = [1, 3, 5, 7, 9]
heapq.heappush(sorted_list, 4)

print(sorted_list) # Output: [1, 3, 4, 5, 7, 9]
```

### If We Don't Have Sorted List

- Use Python List but After every impotent operation do in-place sort, `nlogn`
- Use specific data structure to cover your use-case
	- Binary search tree
		- Keep a binary search tree to maintain your sort order
		- inorder traversal to get all elements in sorted order
		- with balanced BST, CRUD, operations can be `logn`
	- Maintain Heap
		- min heap to store values with sort order
			- CUD(add, update, delete) `logn`
		- pop all elements to get sorted list `nlogn`
	- [p] SortedList python library
		- It maintains sorted order and efficiently supports insertions, deletions, and indexing.
			- All CRUD operations have `logn` cost
		- Already present in some coding websites i.e `Leetcode`
		- This library works with
			- List
			- Dict
			- Set

```python
list = [1, 9, 5, 7, 3]
list.append(4)
list.sort()

print(list) # Output: [1, 3, 4, 5, 7, 9]
```

```python
from sortedcontainers import SortedList

sl = SortedList()
sl.add(10)
sl.add(12)
sl.add(45)
sl.add(2)

sl.remove(45) #remove by elt
sl.pop(0) #remove by index
sl.index(45) #find index of elt

# other useful methods
sl.count
sl.bisect_right
sl.bisect_left
```
