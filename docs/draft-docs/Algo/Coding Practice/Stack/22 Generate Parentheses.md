---
tags: [stack, parentheses]
title: 22 Generate Parentheses
date created: Sunday, December 18th 2022, 3:42:32 pm
date modified: Sunday, December 18th 2022, 4:11:20 pm
---

# 22 Generate Parentheses

## Solution

- we're asked to generate all combinations, thus the first algorithm that should come to mind should be [Backtracking](public-docs/Algo/Fundamental%20Algorithms/Recursion/Backtracking.md)
	- but how to control the backtracking, we don't want all permutation(i.e `)))(((`), we want all the valid ones(i.e `((())), ()()()`…)
	- well, how can we control whether out path is valid and leading to a valid path, to do this
		- we keep the number of open and close tags along the path and decide whether adding another open/close tag will make the path invalid
		- to decide what to add next
			- adding open as much as we can won't make out path invalid, hence we can add open tags while it is less than n,  
				- i.e `(` => becomes `((`
				- `()()` => `()()(`
				- `((())` => can't add `)`
			- we can add close tags to out path if it won't make close tag count above open tag
				- i.e open=1, close=0 `(`, we can add close tag since close < open
				- i.e open=3, close=1 `(()(`, we can add another close
				- i.e open=2, close=2 `()()`, we can't add another close
			- if the number of open tags and close tags is the same as n, we reached the base case, thus we can add the path to our result
				- i.e open=3, close=3 `()()()`
				- i.e open=3, close=3 `(())()` …

```python
result = []
    
def generateParenthesisRec(path, openC, closeC):
    if openC == closeC == n: #base case
        result.append("".join(path))
        return
    if openC < n:  #while open is less than n we can add another open tag
        path.append("(")
        generateParenthesisRec(path, openC+1, closeC)
        path.pop()
    if closeC < openC: #add close tag only if it is less than open tag's count 
        path.append(")")
        generateParenthesisRec(path, openC, closeC+1)
        path.pop()        

path = []
generateParenthesisRec(path, 0,0)
return result
```
