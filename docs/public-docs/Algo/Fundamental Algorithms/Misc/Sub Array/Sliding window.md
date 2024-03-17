---
title: Sliding Window
date created: Thursday, July 6th 2023, 10:36:16 am
date modified: Saturday, January 20th 2024, 9:27:38 pm
---

# Sliding Window

## Introduction

The sliding window algorithm is a technique used to efficiently solve problems that involve finding patterns or subarrays in a given array or string. It involves maintaining a window (a subarray or substring) that "slides" or moves through the input data, usually from left to right.

## How to Solve with Sliding Window

Here's a simple explanation of the sliding window algorithm pattern:

1. Initialize two pointers, typically named `start` and `end`, at the beginning of the array or string.
2. Expand the window by moving the `end` pointer to the right, adding elements to the window as needed.
3. Check if the current window satisfies the desired condition or pattern. If it does, perform any necessary operations or record the result.
4. If the condition is not satisfied, start shrinking the window by moving the `start` pointer to the right, removing elements from the window as needed.
5. Repeat steps 2-4 until the entire array or string is traversed.

By using the sliding window technique, you avoid unnecessary computations by efficiently adjusting the window size based on the problem's requirements.

> It can be particularly useful when dealing with problems that involve finding a maximum or minimum subarray, substring, or satisfying certain conditions within a contiguous section of the input data.

## Template

### Sliding Window Fixed Size

```python
def sliding_windo_fixed(nums, k):
	L = 0
	for R in range(len(nums)):
		if R-L+1 == K:
			#size is fit, do task now
			L += 1
```

### Sliding Window Variable Sizes

```python
def sliding_window(nums):
    # Initialize the start and end pointers
    start = 0

    # Initialize any required variables
    #ex: maxRes = -float("inf")
    
    for end in range(len(nums)):
        # Expand the window by moving the end pointer
        # Update any necessary variables or calculations

        while condition_not_satisfied:
            # Shrink the window by moving the start pointer
            start += 1
            # Update any necessary variables or calculations
            #ex: currVal -= nums[start]
			
        # Check if the current window satisfies the desired condition or pattern
        #ex: maxRes = max(maxRes, currVal)
        # Perform any necessary operations or record the result


    return result
```

## Recommended Leetcode Exercises

### Fixed Size

- Given an array, return true if there are k consecutive elements that are the same.

```python
def isThereDuplicate(nums, k):
	L = 0
	
	for R in range(len(nums)):
		if R-L+1 == k:
			window = set(nums[L:R+1])
			if len(window) == 1:
				return True
			L += 1
	return False

print(isThereDuplicate([1,2,3,3,3], 3))
```

### Variable Size

- [LeetCode - maximum-average-subarray](https://leetcode.com/problems/maximum-average-subarray-i)

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:

        maxAvg = float("-inf")
        pSum = 0
        start = 0

        for end in range(len(nums)):
            pSum += nums[end]

            while (end - start + 1) == k:
                maxAvg = max(maxAvg, pSum / k)
                pSum -= nums[start]
                start += 1

        return maxAvg
```

- [LeetCode - longest-subarray-of-1s-after-deleting-one-element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/)

```python
class Solution:
    def longestSubarray(self, nums):
        # Number of zeroes in the window.
        zeroCount = 0
        longestWindow = 0
        # Left end of the window.
        start = 0
        
        for i in range(len(nums)):
            zeroCount += 1 if nums[i] == 0 else 0
            
            # Shrink the window until the zero counts come under the limit.
            while zeroCount > 1:
                zeroCount -= 1 if nums[start] == 0 else 0
                start += 1
            
            longestWindow = max(longestWindow, i - start)
        
        return longestWindow

```
