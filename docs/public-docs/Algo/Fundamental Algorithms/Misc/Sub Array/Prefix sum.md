---
tags: [prefix, prefixSum]
title: What is Prefix Sum
date created: Sunday, November 6th 2022, 5:46:32 pm
date modified: Monday, January 1st 2024, 8:00:03 pm
---

# What is Prefix Sum

- In computer science, the prefix sum, (cumulative sum), is a second sequence of numbers `y0, y1, y2`,…, the sums of prefixes (previous numbers) of the input sequence:
- ![prefix sum](https://www.cs.utexas.edu/~rossbach/cs380p-fall2019/lab/pfxsum.png)

```
y0 = x0
y1 = x0 + x1
y2 = x0 + x1+ x2

input numbers 	 1 	 2 	 3 	 4 	 5 	 6 	...
prefix sums 	 1 	 3 	 6 	10 	15 	21 	... 
```

## Implement Prefix Sum

```python
arr = [1,2,3,4,5]
curr_res = 0
res = []
for i in range(len(arr)):
	curr_res += arr[i]
	res.append(curr_res)
print(res)
```

> Suffix sum is running the above loop in reverse order, resulting prefix sum starting from the end to the start.

## Application of Prefix Sum

- Prefix sum is a technique we can use to speed certain algorithm implementations
	- Using preﬁx (or suﬃx) sums allows us to calculate the total of any slice of the array very quickly=O(n).
- moreover, prefix sums are usually used in questions including
	- `subarray sum with x condition`
	- maximum sub-array sub
- Examples
	- [2256 Minimum Average Difference](Algo/Coding%20Practice/Array/2256%20Minimum%20Average%20Difference.md)
	- [974. Subarray Sums Divisible by K](Algo/Coding%20Practice/Array/974.%20Subarray%20Sums%20Divisible%20by%20K.md)
	- [560 Subarray Sum Equals K](Algo/Coding%20Practice/Array/560%20Subarray%20Sum%20Equals%20K.md)
	- [product-of-array-except-self](https://leetcode.com/problems/product-of-array-except-self)
	- [minimum-size-subarray-sum](https://leetcode.com/problems/minimum-size-subarray-sum)
