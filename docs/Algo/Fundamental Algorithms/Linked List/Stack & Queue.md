---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 16th 2022, 11:54:42 am
title: Stack LAST IN FIRST OUT
---

# Stack LAST IN FIRST OUT

- Unlike an array, a stack does not offer constant-time access to the nth item. However, it does allow constant time adds and removes, as it doesn't require shifting elements around.

![](https://cdn.programiz.com/sites/tutorial2program/files/stack.png)

```python
#regular list can be used as stack
stack = []
stack.append(12)
stack.append(45)
print(stack[-1])  #45 last in first out

```

# Queue FIRST IN FIRST OUT

- A queue can also be implemented with a linked list. In fact, they are essentially the same thing, as long as items are added and removed from opposite sides.
- Enqueue = Add, Dequeue(POP)

![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/1200px-Data_Queue.svg.png)

```python
from collections import deque

d = deque()
d.append(12)
d.append(13)

print(d.popleft())  #12 first in first out

```

## Priority Queue

- The **priority queue** is an advanced type of the [Stack & Queue#Queue FIRST IN FIRST OUT](notes/Algo/Fundamental%20Algorithms/Linked%20List/Stack%20&%20Queue.md#Queue%20FIRST%20IN%20FIRST%20OUT.md) data structure. Instead of dequeuing the oldest element, a priority queue sorts and dequeues elements based on their _priorities_.

- Priority queues are used to handle scheduling problems where some tasks are prioritized over others.

```python
# the item with the lowest value is removed first
from queue import PriorityQueue

q = PriorityQueue()

q.put(4)
q.put(2)
q.put(5)
q.put(1)
q.put(3)

while not q.empty():
	next_item = q.get()
	print(next_item)
```

```python
# we can add items alogside the priorite numbers
from queue import PriorityQueue  

q = PriorityQueue()

q.put([4, 'Read'])
q.put([2, 'Play'])
q.put([5, 'Write'])
q.put([1, 'Code'])
q.put([3, 'Study'])
q.put([4, 's'])


while not q.empty():
	next_item = q.get()
	print(next_item)
```

```python
# we can multiply with negative to get the defualt out put in reverse
from queue import PriorityQueue  

q = PriorityQueue()

q.put((-4, 'Read'))
q.put((-2, 'Play'))
q.put((-5, 'Write'))
q.put((-1, 'Code'))
q.put((-3, 'Study'))

while not q.empty():
	next_item = q.get()
	print(next_item)
```

## Priority Queue 2 { Heapq }

- Using [heapq](https://www.geeksforgeeks.org/heap-queue-or-heapq-in-python/)
- `heapify`
	- This function is used to **convert the iterable into a heap** data structure.
- `heappush`
	-  This function is used to **insert the element** mentioned in its arguments into heap.
- `heappop`
	-  This function is used to **remove and return the smallest element** from heap.

```python
import heapq
minHeap = []
minHeap.append(12)
minHeap.append(10)

print(minHeap) #array ordered by index

heapq.heapify(minHeap)

heapq.heappush(minHeap, 1)

print(minHeap) #sorted array

print(heapq.heappop(minHeap))
print(heapq.heappop(minHeap))

```

> [Priority Queue vs Heapq](https://stackoverflow.com/questions/36991716/whats-the-difference-between-heapq-and-priorityqueue-in-python)
