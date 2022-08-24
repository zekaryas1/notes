---
tags: [sub_sequence, string, two_pointers]
date created: Wednesday, August 24th 2022, 11:09:27 am
date modified: Wednesday, August 24th 2022, 11:40:16 am
title: 392 Is Sub-sequence
---

# 392 Is Sub-sequence

## Solution 1: Two Pointers

 - Two pointers
	 - we want to check every `elt` in s is also in t, but also preserving initial order
	 - initialize two pointers on word s and t
	 - if the two pointers match increment both
		 - if pointer at t doesn't match with pointer at s
			 - increment pointer at t only
	 - stop when one of them is out of bound
		 - if every `elt` in s is a sub-sequence, pointer at s will be out of bound
	 - complexity:
		 - Time: O(n)
		 - Space: O(1)

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:        
        i = 0
        j = 0
        
        while i<len(s) and j<len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
            
        return i == len(s)
```

## Solution 2: Python Iter

- [Read about iter](Algo/Tips%20&%20Tricks/built-in%20functions.md#iter)
- Just testing whether all characters in s are also in t (in order).

```python
def isSubsequence(self, s, t):
    t = iter(t)
    for elt in s:
        if elt not in t:
            return False
    return True
```

```python
def isSubsequence(self, s, t):
    t = iter(t)
    return all([elt in t for elt in s])
```
