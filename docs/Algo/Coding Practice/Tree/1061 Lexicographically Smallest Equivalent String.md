---
tags: [tree, union_find]
title: 1061 Lexicographically Smallest Equivalent String
date created: Saturday, February 4th 2023, 11:32:46 am
date modified: Saturday, February 4th 2023, 11:53:55 am
---

# 1061 Lexicographically Smallest Equivalent String

## Solution

- [Related to: Union find](Algo/Tree%20&%20Graph/Tree/Union%20find.md)
- iterate over the two strings, we can use zip for this
- union the two strings, but when merging the parents, chose the smallest to be the parent.
- finally based on the `basetStr`, iterate over each string and find the parent for that, and that will be your answer.

```python
class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        
        Parent = {}

        def findParent(x):
            Parent.setdefault(x, x)
            
            root = x
            while root != Parent[root]:
                root = Parent[root]
            
            while x != Parent[x]:
                Parent[x], x = root, Parent[x]

            return root

        
        def union(x1, x2):
            parentX1, parentX2 = findParent(x1), findParent(x2)

            if parentX1 > parentX2:
                Parent[parentX1] = parentX2
            else:
                Parent[parentX2] = parentX1

        
        for elt1, elt2 in zip(s1, s2):
            union(elt1, elt2)

        
        res = []
        for elt in baseStr:
            res.append(findParent(elt))
        
        return "".join(res) 
```
