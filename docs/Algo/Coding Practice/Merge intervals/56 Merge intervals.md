---
date created: Friday, August 5th 2022, 11:33:39 am
date modified: Sunday, August 7th 2022, 3:31:20 pm
title: 56 Merge Intervals
---

# 56 Merge Intervals

## Intro to Merge Interval

- The Merge Intervals pattern is an efficient technique to deal with overlapping intervals. In a lot of problems involving intervals, you either need to find overlapping intervals or merge intervals if they overlap.
- The pattern works like this:
	- Given two intervals (‘a’ and ‘b’), there will be six different ways the two intervals can relate to each other:
- ![](https://hackernoon.com/_next/image?url=https%3A%2F%2Fcdn.hackernoon.com%2Fimages%2FG9YRlqC9joZNTWsi1ul7tRkO6tv1-8mh13wm9.jpg&w=828&q=75)

## Solution

- The first thing is to sort the input, so we can sequentially process the stream of data.
- ![](https://www.interviewbit.com/blog/wp-content/uploads/2021/11/merge-overlapping-intervals-951x1024.png)
- We start from the second input and check
	- If the start of the second input is inside the last input, if true, we will merge them as [start_of_last_input, max(current_end, last_end)]
	- if they don't overlap we can treat them as a separate sequence.

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        result = []
        
        intervals.sort(key= lambda x : x[0])
    
        result.append(intervals[0])
        
        
        for i in range(1, len(intervals)):
            elt = intervals[i]
            lastInterval = result[-1]
            if elt[0] >= lastInterval[0] and elt[0]<=lastInterval[1]:
                result[-1][1] = max(elt[1], result[-1][1])
            else:
                result.append(elt)
        return result
```
