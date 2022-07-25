---
date created: Monday, July 25th 2022, 9:05:02 pm
date modified: Monday, July 25th 2022, 9:05:46 pm
title: 424 Longest Repeating Character Replacement.py
---

# 424 Longest Repeating Character Replacement.py

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
