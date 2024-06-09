---
date created: Wednesday, July 27th 2022, 11:08:39 pm
date modified: Sunday, October 23rd 2022, 4:57:29 pm
title: Monotonic Stack
---

# Monotonic Stack

- The word "monotonic" means a list or a function is either always increasing, or always decreasing.
	- In that case, a "monotonic stack" or a "monotonic deque" is a stack or a deque that has this property.
- Monotonic stack is like a regular stack with one key distinction in the push operation:
	- Before we push a new element onto the stack, we first check if adding it breaks the monotonic condition.
	- If it does, then we pop the top element off the stack until pushing the new element no longer breaks the monotonic condition.
- ![](https://miro.medium.com/max/1400/1*HC8mM4Kv66ms3iFevERzIg.png)

## Monotonic Decreasing Stack Code Template

```python
def mono_stack(nums):
    n = len(nums)
    stack = []
    result = [-1] * n
    
    for index, elt in range(n):
        while stack and nums[stack[-1]] < elt:
            result[stack[-1]] = elt
            stack.pop()
        
        stack.append(index)
    
    return result
```

## Application of Monotonic Stack

- We can use this technique to find the next smaller or greater `elt` by iterating from start-end
	- Or we can use it to find the previous smaller or greater `elt` by iterating from end - front
- Next Largest or Smallest Element in a List
	- [Get the next greater element for every array element](https://leetcode.com/problems/next-greater-element-i/)
	- [daily-temperatures](https://leetcode.com/problems/daily-temperatures/)
	- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water)
	- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram)
	- [Steps to Make Array Non-decreasing](https://leetcode.com/problems/steps-to-make-array-non-decreasing)
- Maximum or Minimum Element in a Sliding Window
