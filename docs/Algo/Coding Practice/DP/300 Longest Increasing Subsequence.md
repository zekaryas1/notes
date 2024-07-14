---
tags: [dp, sub_sequence, binary_search, dfs]
date created: Thursday, August 4th 2022, 11:13:57 am
date modified: Sunday, July 14th 2024, 10:52:09 pm
title: 300 Longest Increasing Sub-sequence
---

# 300 Longest Increasing Sub-sequence

## DFS + Memo

```python
memo = {}
length = len(nums)

def dfs(i):
    if i == length-1:
        return 1
    if i in memo:
        return memo[i]
    
    res = 1
    for j in range(i, length):
        if nums[j] > nums[i]:
            res = max(res, 1+dfs(j))
    
    memo[i] = res
    return memo[i]

for i in range(length):
    dfs(i)
return max(memo.values()) if memo else 1
```

## DP O(n2)

```python
length = len(nums)
dp = [1]*length

for i in range(length-1, -1, -1):
    for j in range(i+1, length):
        if nums[i] < nums[j]:
            dp[i] = max(dp[i], 1+dp[j])
return max(dp)
```

## Binary Search O(nlogn)

- We can use binary to actually build the increasing sequence itself
- The logic is if the current number is greater than what we have seen before add it to the sequence
- If it is not find which index to replace it with

```python
tail = []

for num in nums:
    if not tail or num > tail[-1]:
        tail.append(num)
    else:
        tail[bisect_left(tail, num)] = num
    print(tail)

return len(tail)
```

- [Read about binary search before continuing](Algo/Fundamental%20Algorithms/Searching%20algos/1.%20Binary%20search.md)

```
[10,9,2,5,3,7,101,18]

10 -> [10]  #The tail is empy so add 10
9 -> [9]    #9 is not greater than 10, so replace it with index 0
2 -> [2]    #2 is not greater than 9, so replace it with index 0
5 -> [2, 5] #5 is greater than 2, add to tail
3 -> [2, 3] #3 is not greater than 5, so replace it with index 1
7 -> [2, 3, 7]
101 -> [2, 3, 7, 101]
18 -> [2, 3, 7, 18]

# Lets say there we have a new elt 4, the result will be
4 -> [2,3,4,18] #4 is not greater than 18, so replace it with index 2
```
