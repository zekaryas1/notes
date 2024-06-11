---
tags: [stack, monotonic_stack]
date created: Friday, August 5th 2022, 12:20:39 pm
date modified: Wednesday, August 10th 2022, 11:17:03 am
title: 739 Daily Temperatures
---

# 739 Daily Temperatures

## Solution

- [Use Monotonic queue](Algo/Fundamental%20Algorithms/Misc/Monotonic/Monotonic%20queue.md)

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        
        result = [0]*len(temperatures)
        stack = []
        
        for index, elt in enumerate(temperatures):
            
            while stack and temperatures[stack[-1]] < elt:
                result[stack[-1]] = index - stack[-1]
                stack.pop()
            
            stack.append(index)
        
        return result
```
