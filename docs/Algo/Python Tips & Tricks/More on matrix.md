---
title: Matrix Iteration Methods
date created: Tuesday, January 3rd 2023, 11:00:51 am
date modified: Friday, April 25th 2025, 3:55:15 pm
---

# Matrix Iteration Methods

- There are multiple ways to iterate matrix, row based, column based, spiral….

## Left to Right

```python
matrix = [
		  [1,2,3], 
		  [4,5,6], 
		  [7,8,9]
		  ]
R, C = len(matrix), len(matrix[0])

for r in range(R):
	for c in range(C):
		print(matrix[r][c])
#output = 1,2,3 4,5,6 7,8,9
```

## Top to Bottom

```python
matrix = [
		  [1,2,3], 
		  [4,5,6], 
		  [7,8,9]
		  ]
R, C = len(matrix), len(matrix[0])

for c in range(C):
	for r in range(R):
		print(matrix[r][c])

#output = 1,4,7 2,5,8 3,6,9
```

## Spiral Visit

- [Leetcode question](https://leetcode.com/problems/spiral-matrix/)
- [Explanation print-matrix-in-spiral-order](https://www.enjoyalgorithms.com/blog/print-matrix-in-spiral-order)
