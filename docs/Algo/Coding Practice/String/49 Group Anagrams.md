---
date created: Monday, July 25th 2022, 9:03:44 pm
date modified: Monday, July 25th 2022, 9:04:20 pm
title: 49 Group Anagrams
---

# 49 Group Anagrams

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        
        def findKey(elt):
            memo = [0] * 26
            for e in elt:
                memo[ord(e)-97] += 1
            return memo
            
        
        dic = defaultdict(list)
        
        for elt in strs:
            dic[tuple(findKey(elt))].append(elt)
        
        return dic.values()
```
