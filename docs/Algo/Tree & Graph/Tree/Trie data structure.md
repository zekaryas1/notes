---
date created: Tuesday, July 26th 2022, 2:09:40 pm
date modified: Tuesday, July 26th 2022, 2:18:25 pm
title: Trie Data Structure
---

# Trie Data Structure

- [Video explanation](https://youtu.be/oobqoCJlHA0)
- [Leetcode question](https://leetcode.com/problems/implement-trie-prefix-tree/)
- ![](https://miro.medium.com/max/1200/1*-K7LHR1JFGIP_4AuzJel4A.png)

```python
class Node:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:

    def __init__(self):
        self.root = Node()
        

    def insert(self, word: str) -> None:
        curr = self.root
        
        for w in word:
            if w not in curr.children:
                curr.children[w] = Node()
            curr = curr.children[w]
        curr.end = True
        

    def search(self, word: str) -> bool:
        curr = self.root
        
        for w in word:
            if w not in curr.children:
                return False
            curr = curr.children[w]
        return curr.end
        

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        
        for w in prefix:
            if w not in curr.children:
                return False
            curr = curr.children[w]
        return True
```
