---
date created: Sunday, July 24th 2022, 1:23:21 pm
date modified: Sunday, February 25th 2024, 12:13:40 pm
title: Union Find
---

# Union Find

- A [_disjoint-set data structure_](http://en.wikipedia.org/wiki/Disjoint-set_data_structure) is a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.
- A [_union-find algorithm_](http://en.wikipedia.org/wiki/Disjoint-set_data_structure) is an algorithm that performs two useful operations on such a data structure.
- [Union Find in 5 minutes — Data Structures & Algorithms - YouTube](https://www.youtube.com/embed/ayW5B2W9hfo)

## The Two Useful Operations

![](https://algs4.cs.princeton.edu/15uf/images/quick-union-overview.png)

- Find Operation: O(N)
	- Used to find which component a particular element belongs to
	- Find the root of the component by following the parent nodes until a self loop is reached(a node who's parent is itself)
		- On the picture you can see [8 is paired with 8], [1 is paired with 1]

```python
def find(x):
	if Parent[x] != x:  #not self-loop
		return find(Parent[x])
	return x
```

- Union Operation: O(N)
	- Used to unify two elements
	- Find which are the root nodes of each component and if the root nodes are different make one of the root nodes be the parent of the other.

```python
def union(x,y):
	root_x, root_y = find(x), find(y):
	if root_x != root_y:
		Parent[find(y)] = find(x)
```

```python
#Example check whether or not the elments x and y are in the same components
def connected(x,y):
	return find(x) == find(y)
```

## Optimizing Find Operation: Union Find Path Compression

> The previous operation on worst case performs O(n) since we will need to hop n times to reach the root.

- [Union Find Path Compression - YouTube](https://www.youtube.com/embed/VHRhJWacxis)

![](https://hideoushumpbackfreak.com/algorithms/images/union-find-path-compression.png)

![](https://courses.cs.washington.edu/courses/cse326/00wi/handouts/lecture18/img035.gif)

- Path compression
	- The idea is to flatten the tree when _find()_ is called.
	- Path compression is to make the found root as parent of x so that we don’t have to traverse all intermediate nodes again.
	- If x is root of a subtree, then path (to root) from all nodes under x also compresses.

```python
def find(x):
	root = x
	while Parent[root] != root:
		root = Parent[root]

	while x != root:
		Parent[x], x = root, Parent[x]
	return root

# or with recusion
def find(x):
	if self.par[x] != x:
		self.par[x] = self.find(self.par[x])
	return self.par[x]
```

## Optimizing Union Operation: Union by Rank

- Union by rank optimizes the union operation in Union-Find.
	- It ensures the tree with fewer nodes is attached to the root of the tree with more nodes.
	- This optimization aims to keep the overall height of the tree minimal.
	- It improves the efficiency of both union and find operations.
	- The rank of a tree serves as an upper bound on its height.
	- During union, the tree with lower rank is attached to the root of the tree with higher rank.
	- This prevents the tree from becoming unbalanced, maintaining performance.
	- Union by rank helps reduce the worst-case time complexity of find operations to nearly constant time.
	- Overall, it enhances the efficiency and effectiveness of the Union-Find data structure.
- ![union by rank](https://algocoding.files.wordpress.com/2014/09/uf4_union_by_rank.png)

## Template for Union Find

```python
class UF:
    def __init__(self, n):
        self.par = {i:i for i in range(n)}
        self.rank = [1] * n
    
    def find(self, x):
        if self.par[x] != x:
            self.par[x] = self.find(self.par[x]) #path compression
        return self.par[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return

		# union by rank
        if self.rank[px] < self.rank[py]:
            self.par[px] = py
            self.rank[py] += self.rank[px]
        else:
            self.par[py] = px
            self.rank[px] += self.rank[py]

	# additional: optional functions
	def connected(self, x, y):
		return self.find(x) == self.find(y)
```

## Application of Union Find

- Solved problems
	- [Lexicographically Smallest Equivalent String](https://leetcode.com/problems/lexicographically-smallest-equivalent-string/)
	- [find-if-path-exists-in-graph](https://leetcode.com/problems/find-if-path-exists-in-graph)
	- [regions-cut-by-slashes](https://leetcode.com/problems/regions-cut-by-slashes/)
- Check whether an un-directed graph contains cycle or not
- Find Number of components
- Find common ancestor in trees
