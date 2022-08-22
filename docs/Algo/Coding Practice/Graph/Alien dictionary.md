---
tags: [graph, topological_sort]
date created: Monday, August 22nd 2022, 12:17:18 pm
date modified: Monday, August 22nd 2022, 1:00:12 pm
title: Alien Dictionary
---

# Alien Dictionary

## Solution

- [Free on LintCode](https://www.lintcode.com/problem/892/)
- Think of how English alphabets are sorted

```
ad
app
apple
map

#how did this sorting happened -> based on English alphabet
- a is before m, so it is placed before m
	- a -> m, {-> = before}
- the first 3 has words, have the same beginning letter a 
	- we need to look for the next letters
- d is before p, so it is placed before any other p
	- d -> p
- app and apple has same prefix {app}, difference {le}
	- this tells us => p -> l
```

- This pattern creates an order, a is before m, d is before p and p is before l
	- This pattern is related to topological sort
- We can use [Topological Sort Kahns Algorithm](Algo/Tree%20&%20Graph/Graph/Topological%20Sort%20Kahns%20Algorithm.md), to find this ordering, which is our answer
- Steps:
	- Convert inputs to graph
	- Find the in_degree
	- Run [Topological Sort Kahns Algorithm](Algo/Tree%20&%20Graph/Graph/Topological%20Sort%20Kahns%20Algorithm.md)

```python
from typing import (
    List,
)
from collections import defaultdict, deque
class Solution:
    """
    @param words: a list of words
    @return: a string which is correct order
    """
    def alien_order(self, words: List[str]) -> str:
        # Write your code here
        graph = {}

        for word in words:
            for c in word:
                if c not in graph:
                    graph[c] = set()

        for first, second in zip(words, words[1:]):
            length = min(len(first), len(second))
            for j in range(length):
                u = first[j]
                v = second[j]
                if u != v:
                    graph[u].add(v)
                    break  # later characters' order are meaningless
                # first = 'ab', second = 'a' . invalid
                if j == length - 1 and len(first) > len(second):
                    graph.clear()
                    return

        
        print(graph)
        # calculate in_degree
        in_degree = defaultdict(int)
        for node in graph:
            for edge in graph[node]:
                in_degree[edge] += 1
        
        print(in_degree)

		#store elts with 0 incoming edges
        queue = deque()
        for node in graph:
            if in_degree[node] == 0:
                queue.append(node)
        
        order = []
        while queue:
            n = queue.pop()
            order.append(n)

            for edge in graph[n]:
                in_degree[edge] -= 1
                if in_degree[edge] == 0:
                    queue.append(edge)
                    
        return "".join(order)
```
