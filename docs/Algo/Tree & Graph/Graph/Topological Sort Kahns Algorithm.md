---
date created: Sunday, July 31st 2022, 6:15:24 pm
date modified: Tuesday, November 21st 2023, 1:03:12 pm
title: Topological Sort Kahns Algorithm
---

# Topological Sort Kahns Algorithm

- [Video source](https://youtu.be/cIBFEhD77b4?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P)
- Has the same properties as [Topological sort DFS Version](Algo/Tree%20&%20Graph/Graph/Topological%20sort.md)
	- Also known as `Topological sort BFS`
- The intuition behind kahn's algorithm
	- Repeatedly remove nodes without any dependencies from the graph and add them to the topological ordering
	- As nodes without dependencies(and their outgoing edges) are removed from the graph, new nodes without dependencies are created/born
	- We repeat removing nodes without dependencies from the graph until all nodes are processed, or a cycle is detected
- ![](https://pencilprogrammer.com/wp-content/uploads/2020/11/Khans-Topological-Sort-Algorithm.png)

## Algorithm Explanation

![](https://linuxhint.com/wp-content/uploads/2021/12/word-image-1177.png)

> The first node in the topological ordering will be the node that doesn't have any incoming edges. Essentially, any node that has an in-degree of 0 can start the topologically sorted order. If there are multiple such nodes, their relative order doesn't matter and they can appear in any order.

1. Initialize a queue, `Q` to keep a track of all the nodes in the graph with 0 in-degree.
2. Iterate over all the edges in the input and create an adjacency list and also a map of node v/s in-degree.
3. Add all the nodes with 0 in-degree to `Q`.
4. The following steps are to be done until the `Q` becomes empty.
	1. Pop a node from the `Q`. Let's call this node, `N`.
	2. For all the neighbors of this node, `N`, reduce their in-degree by 1. If any of the nodes' in-degree reaches 0, add it to the `Q`.
	3. Add the node `N` to the list maintaining topologically sorted order.
	4. Continue from step 4.1.

```python
q = deque()
in_degree = defaultdict(int) #notice -> we count the incoming edges to a node

for node in graph:
	for edge in node:
		in_degree[edge] += 1

for node in graph:
	if in_degree[node] == 0:
		q.append(node)

order = []

while q:
	node = q.popleft()
	order.append(node)

	for edge in node:
		in_degree[edge] -= 1
		if in_degree[edge] == 0:
			q.append(edge)

if len(order) != number_of_nodes:
	return null #graph contains cycle

return order

```
