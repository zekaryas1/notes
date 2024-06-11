---
tags: [string, set]
date created: Wednesday, August 17th 2022, 10:14:23 am
date modified: Wednesday, August 17th 2022, 10:26:56 am
title: 128 Longest Consecutive Sequence
---

# 128 Longest Consecutive Sequence

## Solution

- We can sort and count the increasing sequences, which will be O(nlogn)

```python
class Solution:
    def longestConsecutive(self, nums):
        if not nums:
            return 0

        nums.sort()

        longest_streak = 1
        current_streak = 1

        for i in range(1, len(nums)):
            if nums[i] != nums[i-1]:
                if nums[i] == nums[i-1]+1:
                    current_streak += 1
                else:
                    longest_streak = max(longest_streak, current_streak)
                    current_streak = 1

        return max(longest_streak, current_streak)
```

- We need O(N) solution
	- ex: `nums = [4,3,2,1]`
	- First turn the list to set, so we get O(1) time in lookup
		- `set(nums)`
	- For each element, we check if it is the first sequence,
		- `4 is not a first sequence since 3 is also in the set`
		- `1 is a first sequence because 0 is not in the set`
	- For all first sequences, count how long we can go up(curr + 1, curr + 2, curr+n)
		- `i.e for 1 we can go 1 -> 2 -> 3 - 4, total length = 4`
		- Stop when the next step (elt +1) is not in the set

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        memo = set(nums)
        res = 0
        
        for elt in nums:
            if (elt - 1) in memo:  #not beg of a sequence
                continue
            
            local_res = 1
            local_elt = elt
            while (local_elt + 1) in memo: #count the no of hops we can get
                local_res += 1
                local_elt += 1
            
            res = max(res, local_res)
            
        return res
```
