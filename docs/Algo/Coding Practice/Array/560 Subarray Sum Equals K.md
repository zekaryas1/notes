---
tags: [prefix, prefixSum, subarray]
title: 560 Subarray Sum Equals K
date created: Saturday, February 4th 2023, 2:49:51 pm
date modified: Saturday, February 4th 2023, 3:22:58 pm
---

# 560 Subarray Sum Equals K

## Solution

```example
array  = [5, 5,  2,  3,  7]
prefix = [5, 10, 12, 15, 22]
k = 10
```

- for this problem we will use prefix sum
	- keep adding values to get current prefix
		- store the prefixes at each stage to memo
	- check `current Pref - k` in previous prefixes we saw
		- if yes add +1 to our results
			- or +the number of previous sub array that has `current Pref-k`
		- this works because if we can find `(currPref-k)` in our memo it means there is a `previous Subarray` we can remove/chop to get a sum of k
		- ex: *consider prefix[3] which is 15*
			- we calculate `(currPref-k)` which is 15-10 = 5, is there a subarray sum equal to 5, yes at index 0, if we remove that our value will be k
		- ex2: *consider prefix[2] which is 10*
			- `10 - 10 is zero`, but zero is not in previous prefixes,
			- but we can see from the array, the first two `elts[5,5]` can make up 10
			- for this to work we need to pre-populate our memo with zero
		- how did we get the formula `currPref-k`

```
- at each step we're getting a prefix
	- currPref
- we ask is there a previus portion we can remove from this prefix that can give me k
	- currPref - ? = k
- the portion can be in memo to check that, interchange the above quation to
	- currPref - k = ?
```

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        memo = defaultdict(int)
        memo[0] = 1  #prepopulate memo with zero
        
        res = 0
        curr = 0
        
        for n in nums:
            curr += n  #calculate currPref
            prefix = curr-k  #out formula
            res += memo[prefix]  #+ no previous subarray with desired prefix
            
            memo[curr] += 1  #add curr pref to memo
        return res
```
