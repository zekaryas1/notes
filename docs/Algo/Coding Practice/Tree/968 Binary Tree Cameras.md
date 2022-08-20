---
tags: [tree, dfs]
date created: Monday, July 25th 2022, 9:07:22 pm
date modified: Saturday, August 20th 2022, 12:24:34 pm
title: 968 Binary Tree Cameras
---

# 968 Binary Tree Cameras

## Solution

- [Video Source](https://youtu.be/2Gh5WPjAgJk)

```python
class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        #0:- not covered
        #1:- covered with camera
        #2:- has camera
        cam = 0
        def dfs(node):
            nonlocal cam
            if node:
                left = dfs(node.left)
                right = dfs(node.right)
                
                if left==0 or right ==0:
                    cam += 1
                    return 2
                elif left == 2 or right == 2:
                    return 1
                return 0
                
            else:
                #left node
                return 1
        
        return cam+1 if dfs(root)==0 else cam


```

```python
# Other decent solution                  
memo = set()
memo.add(None)
cam = 0
        
def dfs(node,parent):
	nonlocal cam
	if node:
		dfs(node.left, node)
		dfs(node.right, node)
                
		# if node is root or node middle node::: add camera
		if (not parent and node not in memo) or (node.left not in memo or node.right not in memo):
				memo.add(node)
				memo.add(parent)
				memo.add(node.left)
				memo.add(node.right)
		        cam += 1

dfs(root, None)
return cam
```
