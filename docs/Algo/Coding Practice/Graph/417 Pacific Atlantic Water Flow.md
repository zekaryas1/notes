---
tags: [matrix, dfs, set, graph]
date created: Tuesday, August 23rd 2022, 12:12:16 pm
date modified: Sunday, March 17th 2024, 3:33:15 pm
title: 417 Pacific Atlantic Water Flow
---

# 417 Pacific Atlantic Water Flow

## Solution

- Reverse thinking
	- instead of brute forcing if every node can reach the ocean, think if the ocean can reach the nodes
- For every side do a `DFS`, your check will be reverse of the given formula,
	- new formula = `prev < next`
- Use set to store both result and visited nodes
	- We're going in four direction, so we need a method not run in infinite loop
- Use set's `&` method to quickly find nodes common to 2 or more sets

```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        ROW, COLUMN = len(heights), len(heights[0])
        atlantic, pacific = set(), set()
        
        def dfs(r,c, visit, prev):
            if r < 0 or r == ROW or c < 0 or c == COLUMN:
                return
            if prev > heights[r][c]:
                return
            if (r,c) in visit:
                return
            
            visit.add((r,c))
            dfs(r+1,c, visit, heights[r][c])
            dfs(r-1,c, visit, heights[r][c])
            dfs(r,c+1, visit, heights[r][c])
            dfs(r,c-1, visit, heights[r][c])
            
        
        for r in range(ROW):
            dfs(r,0,pacific, heights[r][0])
            dfs(r,COLUMN-1,atlantic, heights[r][COLUMN-1])
            
        for c in range(COLUMN):
            dfs(0,c,pacific, heights[0][c])
            dfs(ROW-1,c,atlantic, heights[ROW-1][c])
        
        return atlantic & pacific
```
