---
tags: [graph, dfs]
date created: Wednesday, August 3rd 2022, 10:03:52 am
date modified: Sunday, August 14th 2022, 11:40:02 am
title: 178 Graph Valid
---

# 178 Graph Valid

- The Question is freely available on [Lintcode](https://lintcode.com)

## Question

> Given `n` nodes labeled from `0` to `n - 1` and a list of `undirected` edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

- Check a given graph is a valid tree

## Solution

> Every tree can be a graph but not vice versa
- For a graph to be a valid tree it needs to satisfy the following
	- has root
	- contains no cycle
	- Must have one component = has one root
- Solution:
	- [Video solution](https://youtu.be/bXsUuownnoQ)
	- Check there is only one component and no cycle
	- How to count number of components
		- Run DFS ⇾ count the visited nodes and compare with the given total number of components
			- If visited 4 and total is 5, we know there are multiple components
	- How to check no cycle
		- Again run DFS and if you encounter a visited node along the search, you know you have found a loop/cycle.

```python
class Solution:
    """
    @param n: An integer
    @param edges: a list of undirected edges
    @return: true if it's a valid tree, or false
    """
    def valid_tree(self, n: int, edges: List[List[int]]) -> bool:
        # write your code here
        if not n:
            return True
        graph = defaultdict(list)

        for n1, n2 in edges:
            graph[n1].append(n2)
            graph[n2].append(n1)

        visited = set()
        def isCyclic(node, prev_node):
            if node in visited:
                return True
            
            visited.add(node)

            for n in graph[node]:
                if n == prev_node:
                    continue
                if isCyclic(n, node):
                    return True
            return False
        
        return not isCyclic(0, -1) and len(visited)==n
```
