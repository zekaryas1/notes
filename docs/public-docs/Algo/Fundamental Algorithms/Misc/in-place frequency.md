---
title: In-place Frequency
date created: Wednesday, July 12th 2023, 9:10:29 pm
date modified: Sunday, July 16th 2023, 2:59:27 pm
---

# In-place Frequency

You can find the frequency of array elements using the array itself by modifying the array in-place while keeping track of the counts. Here's an algorithm to achieve this:

1. Traverse the array and for each element `arr[i]`, decrement it by 1 to make it zero-indexed.
2. For each zero-indexed element `arr[i]`, update the count at the index corresponding to the value of `arr[i]` by adding the length of the array (n) to the value at that index.
3. Traverse the array again and divide each element by the length of the array (n) to get the final count of each element.

Here's the Python code to implement this algorithm:

```python
def find_frequency(arr):
    n = len(arr)
    
    # Make elements zero-indexed
    for i in range(n):
        arr[i] -= 1
    
    # Update counts using the array itself
    for i in range(n):
        arr[arr[i] % n] += n
    
    # Calculate final counts by dividing by the length of the array
    for i in range(n):
        arr[i] //= n
    
    return arr

# Example usage
arr = [3, 3, 4, 2, 4, 4, 2]
freq = find_frequency(arr)
print(freq)  # Output: [0, 2, 2, 3]
```

In the example usage, the input array `arr = [3, 3, 4, 2, 4, 4, 2]` represents the following counts:

- 1 occurs 0 times
- 2 occurs 2 times
- 3 occurs 2 times
- 4 occurs 3 times

Please note that this algorithm modifies the input array in-place. If you'd like to preserve the original array, you can create a copy before performing the frequency calculation.

> This algorithm, only works if all elts in the array are in-range [0-len(array)]

## Problem Related to This

- [first-missing-positive - LeetCode](https://leetcode.com/problems/first-missing-positive/description/)
