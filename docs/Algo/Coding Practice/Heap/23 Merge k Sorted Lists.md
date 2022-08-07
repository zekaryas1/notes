---
date created: Thursday, August 4th 2022, 4:28:04 pm
date modified: Sunday, August 7th 2022, 3:27:16 pm
title: 23 Merge K Sorted Lists
---

# 23 Merge K Sorted Lists

## Solution

- [Source](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed)

### Intro to K-way Merge

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
head = point = ListNode(0)
q = PriorityQueue()

#insert the first elt of each list
for l in lists:
    if l:
        q.put((l.val, l))
        
while not q.empty():
    val, node = q.get()  #take out the smallest elt
    point.next = ListNode(val)
    point = point.next
    node = node.next
    if node:
        q.put((node.val, node)) # insert the next elt from same list
return head.next
```
