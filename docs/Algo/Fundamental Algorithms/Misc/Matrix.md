---
title: Matrix
date created: Tuesday, August 15th 2023, 1:29:11 am
date modified: Tuesday, August 15th 2023, 1:43:00 am
---

# Matrix

## Matrix Traversals

### Row Based

- ![](https://media.licdn.com/dms/image/D4D12AQH2DXKfERV5dQ/article-inline_image-shrink_1500_2232/0/1662964049740?e=1697673600&v=beta&t=tEkwlSvG3x7z_9EIGwTguibHrAfbFXdD4OuERXi5AiU)

```python
matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]

rows = len(matrix)
cols = len(matrix[0])

for r in range(rows):
	for c in range(cols):
		element = matrix[r][c]
		print(element, end=' ')
```

### Column Based

- ![](https://media.licdn.com/dms/image/D4D12AQGxERSUOYTiEw/article-inline_image-shrink_1500_2232/0/1662964312164?e=1697673600&v=beta&t=o4OuXeIK_UsLNFDETnx5H4Z7jFceiuzny4yUuRn5jGM)

```python
matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]

rows = len(matrix)
cols = len(matrix[0])

for r in range(rows):
	for c in range(cols):
		element = matrix[c][r]
		print(element, end=' ')
```

### One Loop Matrix Traversal

```python
matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]

rows = len(matrix)
cols = len(matrix[0])
print(rows, cols, rows * cols)

for i in range(rows * cols):
	row = i // cols
	col = i % cols
	element = matrix[row][col]
	print(element, end=' ')
```

#### Example Using One Loop Matrix Traversal

- implementing a binary search in a sorted matrix
	- <https://leetcode.com/problems/search-a-2d-matrix/description/>

```python
def binary_search(matrix, target):
    rows = len(matrix)
    cols = len(matrix[0])
    left, right = 0, rows * cols - 1
    
    while left <= right:
        mid = (left + right) // 2
        mid_value = matrix[mid // cols][mid % cols]
        
        if mid_value == target:
            return True
        elif mid_value < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return False

# Example sorted matrix
matrix = [
    [1, 3, 5],
    [7, 9, 11],
    [13, 15, 17]
]

target = 9
found = binary_search(matrix, target)
print("Target found:", found)
```
