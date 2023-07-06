---
tags: [bfs]
title: 987 Vertical Order Traversal of a Binary Tree
date created: Sunday, September 4th 2022, 1:02:47 pm
date modified: Thursday, July 6th 2023, 11:25:21 am
---

# 987 Vertical Order Traversal of a Binary Tree

## Simpler Version

- ![](https://i2.wp.com/rjp.b44.myftpupload.com/wp-content/uploads/2019/04/image-109.png?resize=286%2C360)
- Get vertical order traversal of a binary tree
	- The trick is to start with 0 at the root
		- left will be last value -1
		- right will be last value +1
	- use dictionary with list to store values based on index

```
-1 -> [4,15]
 0 -> [10,2,12]
 1 -> [19, -2]
```

## A More Challenging Version

- <https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/>
- The two key things to consider is
	- if two nodes are on the same level like [12, 2], store in sorted order [2,12]
	- nodes should be stores in top down manner such as 4 should be stored before 15

```python
class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        
        q = deque()
        q.append([root, 0, 0])
        result = defaultdict(list)
        
        while q:
            node, x, y = q.popleft()
            result[x].append((-y, node.val))
            
            if node.left:
                q.append([node.left, x-1, y-1])
            if node.right:
                q.append([node.right, x+1, y-1])
                
        res = []
        for _, nodes in sorted(result.items(), key=lambda item: item[0]):
            res.append([val for _, val in sorted(nodes)])
            
        return res
```
