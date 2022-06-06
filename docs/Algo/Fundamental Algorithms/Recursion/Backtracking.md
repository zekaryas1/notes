---
date created: Sunday, June 5th 2022, 4:14:21 pm
date modified: Monday, June 6th 2022, 12:48:56 pm
title: What is Backtracking
---

# What is Backtracking

- Backtracking is just another type of recursion where we try every possible options available…brute force aka DFS approach
- Memory can be used to achieve better performance making it DP programming.

![](https://scaler.com/topics/images/working-of-backtracking-algorithm)

# Backtracking Template

[Video Source ](https://youtu.be/H2gnD7Ixeao)

```python
def is_valid_path(path):
	#check if this is a valid solution
	return True

def get_candidates(path):
	# get the next possible candidate based on path
	return []

def dfs(path, solutions):
	if is_valid_path(path):
		solutions.append(path.copy())
		return

	for candidate in get_candidate(path):
		path.append(candidate)
		dfs(path, solutions)
		path.pop()

def solve():
	solutions = []
	path = []
	dfs(path, solutions)
	return solution
```

# Example Using Backtracking Template

```python
def permute(nums):
        def getPossibleCand(path):
            toReturn = []
            for elt in nums:
                if elt not in path:
                    toReturn.append(elt)
            return toReturn
    
        def dfs(path, result):
            if len(path) == len(nums):
                result.append(list(path))
                return
            
            for elt in getPossibleCand(path):
                path.append(elt)
                dfs(path,result)
                path.pop()
            
        result = []
        path = []
        dfs(path, result)
        print(result)
permute([1,2,3])
```
