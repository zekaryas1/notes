---
title: Kadane
date created: Tuesday, December 19th 2023, 8:34:58 pm
date modified: Tuesday, December 19th 2023, 8:51:42 pm
---

# Kadane

- **Kadane's Algorithm** is a dynamic programming algorithm used to find the maximum contiguous subarray sum in a given array of numbers.
- When to use Kadane
	- when you need to find the maximum sum of a contiguous subarray efficiently.

```python
def kadane(array):
	maxG, maxL = float("-inf"), float("-inf")

	for elt in array:
		maxL = max(elt, elt + maxL)
		maxG = max(maxG, maxL)

	return maxG

print(kadane([4, -1, 2, -7, 3, 4]))
```

## Kadane Subarray

- A variation of kadane, can be used to return the start and end index of sub-array with largest sum

```python
def kadane(array):
	maxSum = float("-inf")
	currSum = 0
	L = 0
	maxL, maxR = 0, 0

	for R in range(len(array)):
		if currSum < 0:
			currSum = 0
			L = R

		currSum += array[R]
		if currSum > maxSum:
			maxSum = currSum
			maxL, maxR = L, R

	return [maxL, maxR]

print(kadane([4, -1, 2, -7, 3, 4]))
```
