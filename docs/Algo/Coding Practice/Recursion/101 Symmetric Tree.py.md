---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 16th 2022, 2:49:50 pm
title: 101 Symmetric Tree.py
---

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def check(node1, node2):
            if not node1 and not node2:
                return True
            elif not node1 or not node2:
                return False
            elif node1.val == node2.val:
                return check(node1.left, node2.right) and check(node1.right, node2.left)
            else:
                return False
        return check(root.left, root.right)
```
