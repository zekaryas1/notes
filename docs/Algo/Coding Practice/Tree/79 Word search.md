---
tags: [tree, dfs]
date created: Thursday, August 18th 2022, 10:36:17 am
date modified: Thursday, August 18th 2022, 10:44:06 am
title: 79 Word Search
---

# 79 Word Search

## Solution

- Start from every entry in the matrix and check if it matches the first index of the word
	- If it is a match, we will DFS(search) starting from that entry
	- we'll go up, down, left, and right, increasing the index
	- keep `set` or `flag` , to not
		- get into an in-finite loop
		- revisit the same entry again

> We're using * to flag entries we are visiting, if you encounter a * return false as it's a loop.

```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        R, C = len(board), len(board[0])
        LENGTH = len(word)
        
        def dfs(r,c, index):
            if (r < 0 or r >= R) or (c < 0 or c >= C):
                return False
            if board[r][c] != word[index] or board[r][c]=="*":
                return False
            if index >= LENGTH-1: 
                return True
            
            memo = board[r][c]
            board[r][c] = "*"
            res = dfs(r,c+1, index+1) or dfs(r+1, c, index+1) or dfs(r-1, c, index+1) or dfs(r,c-1,index+1)
            board[r][c] = memo
            return res
        
        for r in range(R):
            for c in range(C):
                if board[r][c] == word[0] and dfs(r,c,0):
                        return True
        return False
```
