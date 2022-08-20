---
date created: Saturday, August 20th 2022, 12:31:38 pm
date modified: Saturday, August 20th 2022, 1:08:11 pm
title: 78 Subsets
---

# 78 Subsets

## Solution

- Two ways to do it
	- DFS, build a tree with all the elt's in the array and finally store the path into the result

```python
def dfs(index, path, result):
	result.append(path[:])
	if index == LENGTH:
		return

	for i in range(1, 3):
		if (index + i) <= LENGTH:
			path.append(arr[index+i])
			dfs(index+i, path, result)
			path.pop()


arr = [1,2,3]
LENGTH = len(arr)-1
result = [[]]
for i in range(len(arr)):
	dfs(i, [arr[i]], result)

print(result)
```

- BFS subset pattern

```
Given a set of [1, 5, 3]

Start with an empty set: [[]]
- Add the first number (1) to all the existing subsets to create new subsets: [[], [1]];
- Add the second number (5) to all the existing subsets: [[], [1], [5], [1,5]];
- Add the third number (3) to all the existing subsets: [[], [1], [5], [1,5], [3], [1,3], [5,3], [1,5,3]].
```

- ![BFS subset pattern](https://hackernoon.com/_next/image?url=https%3A%2F%2Fcdn.hackernoon.com%2Fimages%2FG9YRlqC9joZNTWsi1ul7tRkO6tv1-hemg3w8d.jpg&w=828&q=75)

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = [[]]
        for i in range(len(nums)):
            temp = [list(elt) for elt in result] #copy
            [elt.append(nums[i]) for elt in temp] #add elt to copy
            result = result + temp
        return result
```
