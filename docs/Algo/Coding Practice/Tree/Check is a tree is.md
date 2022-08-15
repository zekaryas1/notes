---
date created: Sunday, August 14th 2022, 12:01:05 pm
date modified: Sunday, August 14th 2022, 12:32:37 pm
title: Check is a Tree is
---

# Check is a Tree is

## Sample Code

```python
def count_nodes(node):
	if not node:
		return 0
	else:
		return 1 + count_nodes(node.left) + count_nodes(node.right)
```

## Binary Search Tree

## 958 Complete Binary Tree

- ![](https://scaler.com/topics/images/array-representation-of-a-complete-binary-tree-one.webp)
- Notes on complete binary tree
	- complete binary tree can easily be represented with array
	- nodes are inserted from left to right
	- in respect to parent node index
		- left child = `2*parent_index + 1`
		- right child = `2*parent_index + 2`
- The point is following the above index guideline
	- The last node in complete binary tree will be equal to the size of the array or tree,
	- however for non-complete tree this guideline will be violated, a certain node index will be greater than the size of the tree/array

```python
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        
        def count_nodes(node):
	        if not node:
		        return 0
	        else:
		        return 1 + count_nodes(node.left) + count_nodes(node.right)
        
        
        def isComplete(node, index, length):
            if not node:
                return True
                
            if index >= length:
                return False
            
            return isComplete(node.left, index*2+1, length) and isComplete(node.right, index*2+2, length)
        
        
        length = count_nodes(root)
        return isComplete(root, 0, length)
```

https://www.programiz.com/dsa/full-binary-tree

## Full Binary Tree

## Perfect Binary Tree
