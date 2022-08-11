---
tags: [stack, monotonic_stack]
date created: Friday, August 5th 2022, 12:13:39 pm
date modified: Wednesday, August 10th 2022, 11:19:36 am
title: Next Greater Elt
---

# Next Greater Elt

## Question

- Given a list of number find the next greater elt for each elts

```
Input: nums = [4,7,1,6,5]
Output: [7,-1,6,7,-1]

for 4 -> the next greater elt is 7
for 7 -> no greater elt thus -1
for 1 -> the next greater elt is 6
...
```

## Solution

- Use [Monotonic decreasing Stack](Algo/Fundamental%20Algorithms/Linked%20List/Monotonic%20decreasing%20Stack.md)

```python
class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        
        stack = []
        result = [-1] * len(nums)
        
        for index, elt in enumerate(nums):
            while stack and elt > nums[stack[-1]]:
                result[stack[-1]] = elt
                stack.pop()
                
            stack.append(index)
                
        return result
```
