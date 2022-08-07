---
date created: Sunday, August 7th 2022, 3:20:15 pm
date modified: Sunday, August 7th 2022, 3:41:21 pm
title: 1143 Longest Common Sub-sequence
---

# 1143 Longest Common Sub-sequence

## Solution

![](https://cdn.programiz.com/sites/tutorial2program/files/lcs-Table-4.png)

- The Formula
	- If the letters match, the value will be {1 +  top-left neighbor}
	- if the letters do not match, the value is maximum of left and up neighbors

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = defaultdict(int)
        
        for r in range(len(text1)):
            for c in range(len(text2)):
                if text1[r] == text2[c]:
                    dp[(r,c)] = 1 + dp[(r-1,c-1)]
                else:
                    dp[(r,c)] = max(dp[(r-1,c)], dp[(r,c-1)])
        
        
        return max(dp.values())
```
