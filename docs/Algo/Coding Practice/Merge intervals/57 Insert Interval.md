---
date created: Friday, August 5th 2022, 11:51:20 am
date modified: Sunday, August 7th 2022, 3:31:26 pm
title: 57 Insert Interval
---

# 57 Insert Interval

#merge_intervals

## Solution

- First create a new list and add both intervals and the new intervals in sorted order.
- Next run merge intervals [56 Merge intervals](Algo/Coding%20Practice/Merge%20intervals/56%20Merge%20intervals.md)

```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        if len(intervals) == 0:
            return [newInterval]
        
        # add all elts in to new array in sorted order
        new_intervals = []
        once = True
        for elt in intervals:
            if newInterval[0] <= elt[0] and once:
                once = False
                new_intervals.append(newInterval)
            new_intervals.append(elt)
	    
	    # the new interval can be the last elt
        if once:
            new_intervals.append(newInterval)
        result = [new_intervals[0]]

		# run merge interval
        for i in range(1, len(new_intervals)):
            elt = new_intervals[i]
            last = result[-1]
            if elt[0]>=last[0] and elt[0]<=last[1]:
                result[-1][1] = max(elt[1], last[1])
            else:
                result.append(elt)
        return result
```
