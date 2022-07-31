---
date created: Sunday, July 31st 2022, 4:35:16 pm
date modified: Sunday, July 31st 2022, 8:41:59 pm
title: Topological Sort DFS
---

# Topological Sort DFS

- [Video source](https://youtu.be/eL-KzMXSXXI?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P)
- ![](https://i0.wp.com/algorithms.tutorialhorizon.com/files/2018/03/Topological-Sort.png?ssl=1)
- Topological sort algorithm can find a topological ordering in O(V+E)
- A graph with a cycle can not have a valid ordering
	- only works on as-cyclic directed graph/ no cycle
- Topological sort is not unique, there can be multiple ordering.
- Real world application
	- Course scheduling
	- Program dependencies think `npm` libraries
	- During program compilation

## Topological Ordering of a Tree

> Ordering of a tree is basically a reverse BFS/level-search….starting from leaf nodes and going up.

## Topological Sort Algorithm DFS Version

- Pick an un-visited node
- Do DFS on starting with node…visit only un-visited nodes
- On the recursive callback of the DFS. add the current node to the topological ordering in reverse order.

```python
def topsort(graph):

	N = graph.numberOfNodes()
	V = [False]*N
	ordering = [0]*N
	i = N - 1

	for at in range(N):
		if V[at] == False:
			i = dfs(i, at, V, ordering, graph)

	return ordering

def dfs(i, at, V, ordering, graph):
	V[at] = True

	edges = graph.getEdgesOf(at)

	for edge in edges:
		if V[edge.to] == False:
			i = dfs(i, edge.to, V, ordering, graph)

	ordering[i] = at
	return i - 1
```
