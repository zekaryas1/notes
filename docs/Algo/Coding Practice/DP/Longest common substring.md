---
date created: Sunday, August 7th 2022, 3:36:00 pm
date modified: Sunday, August 7th 2022, 3:59:53 pm
title: Longest Common Sub-string
---

# Longest Common Sub-string

## Solution

![](https://www.techiedelight.com/wp-content/uploads/Longest-common-substring.png)

- The values for the cells are usually what you’re trying to optimize. In this case, the values will probably be a number: the length of the longest sub-string that the two strings have in common.
- The Formula
	- If the letters match, the value will be {1 +  top-left neighbor}
	- if the letters do not match, the value is zero

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = defaultdict(int)
        
        for r in range(len(text1)):
            for c in range(len(text2)):
                if text1[r] == text2[c]:
                    dp[(r,c)] = 1 + dp[(r-1,c-1)]
        
        return max(dp.values())
```
