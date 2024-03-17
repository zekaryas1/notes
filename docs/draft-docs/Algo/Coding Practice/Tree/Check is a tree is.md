---
tags: [bfs, dfs, tree, introduction_to_tree]
date created: Sunday, August 14th 2022, 12:01:05 pm
date modified: Thursday, July 6th 2023, 11:41:20 am
title: Check is a Tree is
---

# Check is a Tree is

## Basic Example

### Count All Nodes

```python
def count_nodes(node):
	if not node:
		return 0
	else:
		return 1 + count_nodes(node.left) + count_nodes(node.right)
```

### Find Depth or Level of a Tree

```python
def getDepth(node):
	if node is None:
		return 0
	return 1 + max(getDepth(node.left), getDepth(node.right))
```

## Binary Search Tree

- The BST property states that for every node in the tree, all the values in its left subtree should be less than the node's value, and all the values in its right subtree should be greater than the node's value.

```python
def isBST(root):
    def isValidBST(node, min_val=float('-inf'), max_val=float('inf')):
        if not node:
            return True
        
        if node.val <= min_val or node.val >= max_val:
            return False
        
        return (isValidBST(node.left, min_val, node.val) and
                isValidBST(node.right, node.val, max_val))

    return isValidBST(root)
```

## Complete Binary Tree

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

## Full Binary Tree

- To check if a given binary tree is a full binary tree, you need to ensure that every node in the tree satisfies the following conditions:
	1. If a node has children, it must have exactly two children (i.e., both the left and right child should exist).
	2. If a node does not have children (i.e., it is a leaf node), it is considered a full binary tree.

```python
def isFullBinaryTree(root):
    if root is None:
        # An empty tree is considered a full binary tree
        return True

    if root.left is None and root.right is None:
        # A leaf node is considered a full binary tree
        return True

    if root.left is not None and root.right is not None:
        # Recursively check if both left and right subtrees are full binary trees
        return isFullBinaryTree(root.left) and isFullBinaryTree(root.right)

    # If any of the above conditions is not satisfied, it is not a full binary tree
    return False
```

## Perfect Binary Tree

- To check if a given binary tree is a perfect binary tree, you need to ensure
	1. that every internal (non-leaf) node in the tree has exactly two children,
	2. and all leaf nodes are at the same level.

```python
def isPerfectBinaryTree(root):
    def isPerfect(node, depth, level):
        # Base cases
        if node is None:
            return True
        if node.left is None and node.right is None:
            # Leaf node should be at the same level as other leaves
            return depth == level

        # Recursively check left and right subtrees
        return (
            isPerfect(node.left, depth + 1, level)
            and isPerfect(node.right, depth + 1, level)
        )

    # Get the depth of the tree
    def getDepth(node):
        if node is None:
            return 0
        return 1 + max(getDepth(node.left), getDepth(node.right))

    depth = getDepth(root)
    return isPerfect(root, 1, depth)
```
