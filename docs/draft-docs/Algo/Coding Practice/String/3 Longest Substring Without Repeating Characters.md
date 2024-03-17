---
tags: [string, sliding_window, set]
date created: Wednesday, August 10th 2022, 10:45:23 am
date modified: Wednesday, August 10th 2022, 11:21:55 am
title: 3 Longest Sub-string Without Repeating Characters
---

# 3 Longest Sub-string Without Repeating Characters

## Solution

- We will have a sliding window
	- We keep expanding the window as long as the next element is unique
		- We can use set to check uniqueness
	- If we find a duplicate element we will shrink the window from the start
		- Until the current element is unique
	- The length of the window will be `[end-start+1]`

```
	 0 1 2 3 4 5 6 7
a = [x,a,b,c,a,b,c,d]

1. start,end will be at index 0 or elt x
2. we keep expanding the end up untill next a[4], end = 4
	1. a is not unique
3. we shrink the window from start
	1. remove x, start = 1, a is still inside the window
	2. remove a, start = 2, a is unique
	3. size = [4-2+1] = 3
```

```python
class Solution:
    def solve(self, nums):
        memo = set()
        start = res = 0
        
        for end in range(len(nums)):
            while nums[end] in memo:
                memo.remove(nums[start])
                start += 1
            memo.add(nums[end])
            res = max(res, end-start+1)
            
        return res
```
