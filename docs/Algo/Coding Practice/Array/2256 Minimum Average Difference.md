---
tags: [prefix_sum, prefix]
title: 2256. Minimum Average Difference
date created: Sunday, December 4th 2022, 5:22:11 pm
date modified: Thursday, July 6th 2023, 11:16:45 am
---

# 2256. Minimum Average Difference

- Solution
	- if you think about the brute force solution
		- we would need to calculate the sum before and after each index, and take the average
		- this would cost us O(N^2^) time complexity
			- it is O(N^2) because we iterate over each index of the input array and at each index, and again we iterate on all elements to calculate averages of two parts, which takes O(n)\*O(n) time.
	- taking the brute force a step forward, if we can know the left and right sum before hand it will reduce our time complexity down to O(n).
		- the formula will be `abs(left_sum/n - right_sum/m)`
		- the technique we can use to pre-calculate left and right sums will be Prefix Sum
```python
from collections import defaultdict
class Solution:
    def minimumAverageDifference(self, nums: List[int]) -> int:
        left = defaultdict(int)
        right = defaultdict(int)

		#prefix sum
        res = 0
        index = 1
        for num in nums:
            res += num
            left[index] = res
            index += 1

		#suffix sum
        res = 0
        index = len(nums)
        for num in reversed(nums):
            res += num
            right[index] = res
            index -= 1            
        
        res = [float("inf"), 0]
        for key in left:
            left_value = left[key]
            right_value = right[key+1]
            
            
            left_av = left_value // key
            right_av = 0 if right_value==0 else right_value // (len(nums)-key)
            
            curr_av = abs(left_av-right_av)
            
            if curr_av < res[0]:
                res = [curr_av, key-1]
            elif curr_av == res[0]:
                res = [curr_av, min(key-1, res[1])]
            
        return res[1]
            
```
