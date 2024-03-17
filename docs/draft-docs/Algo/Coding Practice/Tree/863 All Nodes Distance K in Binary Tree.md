---
tags: [bfs, dfs]
date created: Thursday, August 11th 2022, 10:27:00 am
date modified: Thursday, July 6th 2023, 11:25:01 am
title: 863 All Nodes Distance K in Binary Tree
---

# 863 All Nodes Distance K in Binary Tree

## Solution 1

- Turn the tree into an undirected graph
	- This can be done with any DFS
- Once we have the graph do another tree traversal or DFS
	- Start from the target and distance zero then Increase the distance +1 every-time you jump to node children
	- ==Using BFS as traversal is also possible==
- Complexity
	- Time – The algorithm is O(N) but since sorting the overall will be O(Nlogn)
	- Space – O(N)

```python
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, radius: int) -> List[int]:
        target = target.val
        if radius == 0:
            return [target]
        graph = defaultdict(list)

        # build a directed graph
        def dfs(node):
            if node:
                dfs(node.left)

				# directed graph is two ways	
                if node.left:
                    graph[node.val].append(node.left.val)
                    graph[node.left.val].append(node.val)
                if node.right:
                    graph[node.val].append(node.right.val)
                    graph[node.right.val].append(node.val)

                dfs(node.right)

        dfs(root)
        visited = set()

        # do a dfs radius 0 -> radius 1..
        # radius = distance
        def dfs2(path, result):
            curr_target, curr_radius = path
            if curr_radius == radius:
                if curr_target != target:
                    result.add(curr_target)
                return

            visited.add(curr_target)

            for next_target in graph[curr_target]:
                if next_target not in visited:
                    dfs2([next_target, curr_radius + 1], result)

        res = set()
        path = [target, 0]
        dfs2(path, res)

        return sorted(list(res))
```

## Solution 2 `{O(n)}`

- Re-construct the tree by adding a parent field
- We then traverse as above by starting from the target node
	- We will traverse in three direction, left, right and up(parent)
- Complexity
	- Time – O(N)
	- Space – O(N)

```python
class Solution(object):
    def distanceK(self, root, target, K):
        def dfs(node, par = None):
            if node:
                node.par = par
                dfs(node.left, node)
                dfs(node.right, node)

        dfs(root)

        queue = deque()
        queue.append([target, 0])
        seen = {target}
        while queue:
            if queue[0][1] == K:
                return [node.val for node, d in queue]
            node, d = queue.popleft()
            for nei in (node.left, node.right, node.par):
                if nei and nei not in seen:
                    seen.add(nei)
                    queue.append((nei, d+1))

        return []
```
