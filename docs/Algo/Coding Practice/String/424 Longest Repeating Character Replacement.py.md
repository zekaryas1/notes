---
date created: Monday, July 25th 2022, 9:05:02 pm
date modified: Wednesday, August 10th 2022, 10:58:53 am
title: 424 Longest Repeating Character Replacement
---

# 424 Longest Repeating Character Replacement

#string

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        l = 0
        dic = defaultdict(int)
        maxRes = 0
        
        maxF = 0
        for r in range(len(s)):
            dic[s[r]] += 1
            maxF = max(maxF, dic[s[r]])
            
            length = r-l + 1
            if length - maxF > k:
                dic[s[l]] -= 1
                l += 1
            
            maxRes = max(maxRes, r-l+1)
        return maxRes
```
