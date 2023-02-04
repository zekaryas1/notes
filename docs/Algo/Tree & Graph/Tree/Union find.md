---
date created: Sunday, July 24th 2022, 1:23:21 pm
date modified: Saturday, February 4th 2023, 2:37:19 pm
title: Union Find
---

# Union Find

- A [_disjoint-set data structure_](http://en.wikipedia.org/wiki/Disjoint-set_data_structure) is a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.
- A [_union-find algorithm_](http://en.wikipedia.org/wiki/Disjoint-set_data_structure) is an algorithm that performs two useful operations on such a data structure.
- <iframe title="Union Find in 5 minutes — Data Structures &amp; Algorithms" src="https://www.youtube.com/embed/ayW5B2W9hfo?start=200&amp;feature=oembed" allowfullscreen="" allow="fullscreen" height='200' width='354'></iframe>

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
	Parent[find(y)] = find(x)
```

```python
#Example check whether or not the elments x and y are in the same components
def connected(x,y):
	return find(x) == find(y)
```

## Union Find Path Compression

> The previous operation on worst case performs O(n) since we will need to hop n times to reach the root.

- <iframe src="https://www.youtube.com/embed/VHRhJWacxis?list=PLDV1Zeh2NRsBI1C-mR6ZhHTyfoEJWlxvq" height='200' width='354' allowfullscreen="" allow="fullscreen"></iframe>

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
```

## Application of Union Find

- Solved problems
	- [1061 Lexicographically Smallest Equivalent String](Algo/Coding%20Practice/Tree/1061%20Lexicographically%20Smallest%20Equivalent%20String.md)
	- <https://leetcode.com/problems/find-if-path-exists-in-graph>
	- <https://leetcode.com/problems/regions-cut-by-slashes/>
- Check whether an un-directed graph contains cycle or not
- Find Number of components
- Find common ancestor in trees

## Template for Union Find

```python
Parent = {}  #use dictionary to store parent -> child relationship

def findParent(x):
	#initially parent of elt it is iteself
	#setdefault only set elt if key doesn't exist
	Parent.setdefault(x, x)  
	
	root = x
	while root != Parent[root]:
		root = Parent[root]

	#perform path compression(...optional)
	while x != root:
		Parent[x], x = root, Parent[x]

	return root


def union(x1, x2):
	parentX1, parentX2 = findParent(x1), findParent(x2)
	Parent[parentX1] = Parent[parentX2]
```
