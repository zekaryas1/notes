---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, July 3rd 2022, 11:37:14 am
title: Radix Sort
---

# Radix Sort

- [Division and modulo with 10](Algo/Tips%20&%20Tricks/Division%20and%20modulo%20with%2010.md)
- Runtime: O( kn)
- Radix sort is a fast distribution sorting algorithm that orders keys by examining the individual components of the keys instead of comparing the keys themselves.

![](https://ds055uzetaobb.cloudfront.net/brioche/uploads/IEZs8xJML3-radixsort_ed.png?width=1200)

- For example ,
	- When sorting integer keys, the individual digits of the keys are compared from least significant to most significant.
	- This is a special purpose sorting algorithm but can be used to sort many types of keys, including positive integers, strings, and floating-point values.

```python
from collections import deque as Queue


def radixSort(Array):
    numdigit = len(numDigit(Array))

    holder = []
    for i in range(10):
        holder.append(Queue())
    column = 1

    for i in range(numdigit):
        for key in Array:
            place = (key // column) % 10
            holder[place].append(key)

        i = 0
        for bin in holder:
            while bin:
                Array[i] = bin.popleft()
                i += 1

        column *= 10
    print(Array)


def numDigit(Array):
    return str(max(Array))


if __name__ == '__main__':
    radixSort([10, 23, 51, 18, 4, 31, 5, 13])
```
