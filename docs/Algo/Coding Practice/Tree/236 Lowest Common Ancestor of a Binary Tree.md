---
tags: [tree, dfs]
date created: Wednesday, August 3rd 2022, 9:11:12 pm
date modified: Wednesday, August 10th 2022, 11:11:28 am
title: 236 Lowest Common Ancestor of a Binary Tree
---

# 236 Lowest Common Ancestor of a Binary Tree

## Solution

- [Source](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/)
- Traverse the tree in a depth first manner.
- The moment you encounter either of the nodes `p` or `q`, return some boolean flag.
- The flag helps to determine if we found the required nodes in any of the paths.
- The least common ancestor would then be the node for which both the sub-tree recursions return a `True` flag.
	- It can also be the node which itself is one of `p` or `q` and for which one of the sub-tree recursions returns a `True` flag.

```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        self.ans = None
        def dfs(node):
            if not node:
                return False
            
            left = dfs(node.left)
            right = dfs(node.right)
            
            mid = node == p or node == q
            
            if left+right+mid >= 2:
                self.ans = node
            
            return left or right or mid
        
        dfs(root)
        return self.ans
```
