---
date created: Sunday, July 24th 2022, 1:23:21 pm
date modified: Sunday, July 24th 2022, 2:53:25 pm
title: Union Find
---

# Union Find

- A [_disjoint-set data structure_](http://en.wikipedia.org/wiki/Disjoint-set_data_structure) is a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.
- A [_union-find algorithm_](http://en.wikipedia.org/wiki/Disjoint-set_data_structure) is an algorithm that performs two useful operations on such a data structure:

## The Two Useful Operations

![](https://algs4.cs.princeton.edu/15uf/images/quick-union-overview.png)

- Find Operation:  O(N)
	- Used to find which component a particular element belongs to
	- Find the root of the component by following the parent nodes until a self loop is reached(a node who's parent is itself)
		- On the picture you can see [8 is paired with 8], [1 is paired with 1]

```python
def find(x):
	if Parent[x] != x:  #not self-loop
		return find(Parent[x])
	return x
```

- Union Operation:  O(N)
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

- Check whether an un-directed graph contains cycle or not
- Find Number of components
- Find common ancestor in trees

## References

- [Union find](https://www.youtube.com/watch?v=ayW5B2W9hfo&t=200s&ab_channel=PotatoCoders)
- [Path compression](https://youtu.be/VHRhJWacxis?list=PLDV1Zeh2NRsBI1C-mR6ZhHTyfoEJWlxvq)
