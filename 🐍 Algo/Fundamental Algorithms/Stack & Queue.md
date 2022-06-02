- Unlike an array, a stack does not offer constant-time access to the nth item. However, it does allow constant time adds and removes, as it doesn't require shifting elements around.  

```python
#regular list can be used as stack
stack = []
stack.append(12)
stack.append(45)
print(stack[-1])  #45 last in first out

```
  
- A queue can also be implemented with a linked list. In fact, they are essentially the same thing, as long as items are added and removed from opposite sides.  

```python
from collections import deque

d = deque()
d.append(12)
d.append(13)

print(d.popleft())  #12 first in first out

```