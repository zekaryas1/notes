---
title: More Heapq
date created: Friday, November 18th 2022, 1:00:20 pm
date modified: Friday, November 18th 2022, 1:37:33 pm
---

# More Heapq

## For Heapq Introduction

- [Priority Queue 2 { Heapq }](Algo/Fundamental%20Algorithms/Linked%20List/Stack%20&%20Queue.md#Priority%20Queue%202%20{%20Heapq%20})

## Merge Sorted Array with Heapq

- Source
	- <https://pythontic.com/algorithms/heapq/merge>
- Python's heapq has a function called merge
- The merge() function takes multiple Python iterables as parameters.
- For the merge() function to work correctly each of the input sequence should be in sorted order.

```python
heapq.merge(*iterables, key=None, reverse=False)
```

```python
# Example Python program that merges multiple sorted sequences
# into one

import heapq

# Create sorted sequences
sequence1 = [1,2,3] # A list
sequence2 = (5,7,9) # A tuple
sequence3 = {6,8,10} # A set

# Merge the sequences
merged = heapq.merge(sequence1, sequence2, sequence3)

# Print the merged sequences
print("The merged sequence:")

for item in merged:
    print(item)
```

- Coding question related to this
	- [Merge K Sorted Lists](Algo/Fundamental%20Algorithms/Misc/Sub%20Array/Merge%20K%20Sorted%20Lists.md)

### Merge Using a Function That Returns a Comparison Key

```python
import heapq

sequence1 = [('a', 1), ('b', 2), ('c', 3)]
sequence2 = [('p', 15), ('q', 20), ('r', 30)]

merged = heapq.merge(sequence1, sequence2, key=lambda x: x[1])

print(list(merged))
```

## Find N Largest or Smallest Elt with Heapq

- Source
	- <https://pythontic.com/algorithms/heapq/nsmallest>
- The nlargest() function of the Python module heapq returns the specified number of largest elements from a Python iterable like a list, tuple and others.
- The function nlargest() can also be passed a key function that returns a comparison key to be used in the sorting.

```python
import heapq

iterable = [6,1,7,9,3,5,4]
largests = heapq.nlargest(3, iterable)

print(largests)
```

```python
import heapq

iterable = [('cat', 4), ('dog', 1), ('fish', 45)]
largests = heapq.nlargest(2, iterable, key = lambda x: x[1])

print(largests)
```

- The nsmallest() method of the Python module heapify returns the specified number of smallest elements from an iterable in sorted order.
- API similar to nlargest()

```python
import heapq

iterable = [6,1,7,9,3,5,4]
largests = heapq.nsmallest(3, iterable)

print(largests)
```
