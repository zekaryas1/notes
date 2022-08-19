---
date created: Friday, August 19th 2022, 9:43:35 am
date modified: Friday, August 19th 2022, 10:02:21 am
title: 212 Word Search II
---

# 212 Word Search II

## Solution

- Similar to [79 Word search](Algo/Coding%20Practice/Tree/79%20Word%20search.md)
- For [79 Word search](Algo/Coding%20Practice/Tree/79%20Word%20search.md) we had one word, so using index to check if the path is a match was simple, however we now have multiple words
	- which can be very similar or different words, consider the following word_set

```
word_set = [
	"app",
	"apps",
	"apple",
	"appologize"
]
```

- It is clear to see using index will not quite work here, better approach would be trie(prefix tree) [Trie data structure](Algo/Tree%20&%20Graph/Tree/Trie%20data%20structure.md), with Trie we can
	- build the word set and look up if a word or a prefix exists efficiently

```python
class Node:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = Node()
        
    def add(self, word):
        curr = self.root
        
        for w in word:
            if w not in curr.children:
                curr.children[w] = Node()
            curr = curr.children[w]
        curr.end = True

	#we're running search and start_with along with dfs
```

```python
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:

		#build the triee with words
        trie = Trie()
        for word in words:
            trie.add(word)
            
        R,C = len(board), len(board[0])
        res = set()
        
        def dfs(r,c,node,word):
            if r<0 or r >= R or c<0 or c>=C:
                return
            
            char = board[r][c]
            if char not in node.children:
                return
            if char == "*":
                return 
            
            
            board[r][c] = "*"
            node = node.children[char]
            word += char
            if node.end:  #we found a word
                res.add(word)
                
            
            dfs(r-1,c,node, word)
            dfs(r+1,c,node, word)
            dfs(r,c+1,node, word)
            dfs(r,c-1,node, word)
            
            board[r][c] = char
        
        for r in range(R):
            for c in range(C):
                dfs(r,c,trie.root,"")
                
        return list(res)
```
