---
tags: [stack, monotonic_stack]
date created: Friday, August 5th 2022, 12:20:39 pm
date modified: Sunday, June 16th 2024, 1:28:10 pm
title: 739 Daily Temperatures
---

# 739 Daily Temperatures

## Solution

- [Monotonic Sequence](Algo/Fundamental%20Algorithms/Misc/Monotonic/Monotonic%20Sequence.md)

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
