---
tags: [heap]
date created: Thursday, August 4th 2022, 4:28:04 pm
date modified: Friday, November 18th 2022, 1:36:17 pm
title: Merge K Sorted Lists
---

# Merge K Sorted Lists

## Intro to K-way Merge

- [Source](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed)
- K-way Merge helps you solve problems that involve a set of sorted arrays.
- Whenever you’re given ‘K’ sorted arrays, you can use a Heap to efficiently perform a sorted traversal of all the elements of all arrays.
- You can push the smallest element of each array in a Min Heap to get the overall minimum. After getting the overall minimum, push the next element from the same array to the heap. Then, repeat this process to make a sorted traversal of all elements.
- ![](https://hackernoon.com/_next/image?url=https%3A%2F%2Fcdn.hackernoon.com%2Fimages%2FG9YRlqC9joZNTWsi1ul7tRkO6tv1-4hwy3w8x.jpg&w=828&q=75)
- The steps involved to solve this kind of problem will be
	- Insert the first element of each array in a Min Heap.
	- After this, take out the smallest (top) element from the heap and add it to the merged list.
	- After removing the smallest element from the heap, insert the next element of the same list into the heap.
	- Repeat steps 2 and 3 to populate the merged list in sorted order.

```python
l1 = [2,6,8]
l2 = [3,6,7]
l3 = [1,3,4]

q = PriorityQueue()
q.put([l1[0],0, a])
q.put([l2[0],0, b])
q.put([l3[0],0, c])

res = []
while not q.empty():
	elt, index, arr = q.get()
	res.append(elt)

	if index != len(arr)-1:
		index += 1
		q.put([a[index], index, arr])
return res
```

- Pythonic way of merging sorted list
	- [Merge Sorted Array with Heapq](Algo/Python%20Tips%20&%20Tricks/More%20on%20heapq.md#Merge%20Sorted%20Array%20with%20Heapq)
