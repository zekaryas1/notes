---
date created: Sunday, August 7th 2022, 1:16:43 pm
date modified: Tuesday, February 13th 2024, 7:44:47 pm
title: Dynamic Programming Template
---

# Dynamic Programming Template

- [First read, Intro to Dynamic programming](Algo/Fundamental%20Algorithms/Recursion/Intro%20to%20Dynamic%20programming.md)
- Dynamic programming starts by solving sub-problems and builds up to solving the big problem.
- Every dynamic-programming algorithm starts with a grid.
	- The values in the cells are usually what you’re trying to optimize.
	- For the knapsack problem, the values were the value of the goods.
- At each step/cell of DP, we will make a decision that will maximize/minimize our output depending on what we want.

```python
#first row initialization

#first column initalization

#current_value = max(prev_value, curr + some_value_from_last_row)
cell[r][c] = max(cell[r-1][c], current + cell[r-1][c-items_weight])

for r in range(Row):
	for c in range(Column):
		 cell[r][c] = max(cell[r-1][c], current + cell[r-1][c-items_weight])
```

- It's possible to use 2D, nD array to solve DP problems however using dictionary will make things a lot easier.

## Bounded Knapsack Question(0/1 knapsack)

- You’re a thief with a knapsack that can carry 4 lb of goods.
- You have three items that you can put into the knapsack.
	- Guitar -> 1lb -> $1500
	- Stereo -> 4lb -> $3000
	- Laptop -> 3lb -> $2000
- What items should you steal so that you steal the maximum money’s worth of goods?

```python
from collections import defaultdict
dp = defaultdict(int)
items = [['G', 1500, 1], ['S', 3000, 4], ['L', 2000, 3]]

for r in range(3):
	for c in range(1, 5):
		items_weight = items[r][2]
		if items_weight > c:
			dp[(r,c)] = dp[(r-1,c)]
		elif items_weight == c:
			dp[(r,c)] = max(dp[(r-1,c)], items[r][1])
		else:
			dp[(r,c)] = max(dp[(r-1,c)], items[r][1] + dp[(r-1, c-items_weight)])

print(dp[(2,4)])
```

## Unbounded Knabsack

```python
#current_value = max(prev_value, curr + some_value_from_this_row)

#first row initialization

#first column initalization

cell[r][c] = max(cell[r-1][c], current + cell[r][c-items_weight])
```
