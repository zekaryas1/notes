---
date created: Sunday, August 14th 2022, 10:58:12 am
date modified: Sunday, August 14th 2022, 12:00:42 pm
title: 222 Count Complete Tree Nodes
---

# 222 Count Complete Tree Nodes

## Solution

- We can use `DFS` or `BFS` but that will be O(N), we need an algorithm better than that

```python
def count_nodes(node):
	if not node:
		return 0
	else:
		return 1 + count_nodes(node.left) + count_nodes(node.right)
```

- What is a complete binary tree
	- A complete binary tree is **a binary tree in which all the levels are completely filled except possibly the lowest one, which is filled from the left to right**.
	- ![](https://www.techiedelight.com/wp-content/uploads/Complete-Binary-Tree.png)
- What is a perfect binary tree
	- A perfect binary tree is a type of binary tree in which every internal node has exactly two child nodes and all the leaf nodes are at the same level.
	- ![](https://cdn.programiz.com/sites/tutorial2program/files/perfect-binary-tree-rec.png)
	- What is the formula to find the number of nodes in a full binary tree
		- `2**N - 1`, where N is the number of levels
		- in The above image for instance tree-3 has `2**3-1 = 7` nodes, 3 is the number of levels
		- In a perfect binary tree, every node is also another sub-perfect binary tree
		- Given a perfect tree, the hops to reach the left-most node it also the same as the hops to reach the right most node
			- For tree-2 for instance, it takes two hops to reach both leftmost and rightmost nodes `{assume initial hop as 1}`
			- With this understanding we can update our formula above, given a perfect binary tree, we first count the hops to reach the leftmost or rightmost nodes and return `2**hops-1`

- With the above thought we can come up with an algorithm that is better than O(N), note that
	- Every perfect tree is also a complete tree
	- A complete tree can be composed of perfect subtrees.
	- At every note we check if the hops to reach the leftmost and rightmost node is the same, if so we return `2**hops - 1` as the total nodes, otherwise recurs to right and left nodes
		- Whenever we find a perfect binary tree we're saving time since we will not search all nodes under that tree.
		- Eventually we will reach to a leaf node which is a perfect binary tree.

```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        
        
        def traverseLeft(node):
            res, n = 0, node
            while n:
                res += 1
                n = n.left
            return res
        
        def traverseRight(node):
            res, n = 0, node
            while n:
                res += 1
                n = n.right
            return res
        
        def my_count_nodes(node):
            left_count = traverseLeft(node)
            right_count = traverseRight(node)
            
            if left_count == right_count:
                return 2**left_count - 1
            else:
                return 1 + my_count_nodes(node.left) + my_count_nodes(node.right)
        
        return my_count_nodes(root)
```
