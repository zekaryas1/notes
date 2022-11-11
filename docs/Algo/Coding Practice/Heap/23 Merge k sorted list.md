---
date created: Wednesday, August 10th 2022, 6:04:10 pm
date modified: Sunday, November 6th 2022, 5:28:49 pm
title: 23 Merge K Sorted List
---

# 23 Merge K Sorted List

- [First read Merge K Sorted Lists](Merge%20K%20Sorted%20Lists.md)

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
