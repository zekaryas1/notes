---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, August 7th 2022, 1:18:00 pm
title: What is Dynamic Programming
---

# What is Dynamic Programming

Recursion + memory = Dynamic programming

  * Dynamic programming is mostly just a matter of taking a recursive algorithm and finding the overlapping sub-problems (that is, the repeated calls).
  * You then cache those results for future recursive calls.

## Bottom-up Vs Top-down DP

There are two ways to implement a DP algorithm:

```python
# Bottom-up, also known as tabulation.  
def fibo(n):
	arr = [0] * (n+1)
	arr[0] = 0
	arr[1] = 1
	for i in range(2, n+1):
		arr[i] = arr[i-1] + arr[i-2]
	print(arr)
	return arr[n]
print(fibo(5))
```

  -  Bottom-up, also known as tabulation.
	  - Bottom-up is implemented with iteration and starts at the base cases.
	  - A bottom-up implementation runtime is usually faster, as iteration does not have the overhead that recursion does.
  * Top-down, also known as memorization.
	  * Top-down is implemented with recursion and made efficient with memorization.
	  * A top-down implementation is usually much easier to write. This is because with recursion, the ordering of sub-problems does not matter, whereas with tabulation, we need to go through a logical ordering of solving sub-problems.

```
#Top-down, also known as memorization.  
memo = {}
def fibo(n):
	if n in [0,1]:
		return n
	if n not in memo:
		memo[n] = fibo(n-1) + fibo(n-2)
	return memo[n]
print(fibo(5))
```

## DP Vs Greedy Algo

* If a problem is asking for the maximum/minimum/longest/shortest of something, the number of ways to do something, or if it is possible to reach a certain point, it is probably greedy or DP.
* Thus, how do we know which algo to use
	* The characteristic that is common in DP problems is that future "decisions" depend on earlier decisions.
	* Deciding to do something at one step may affect the ability to do something in a later step.
	* This characteristic is what makes a greedy algorithm invalid for a DP problem - we need to factor in results from previous decisions.
	* with greedy at each step we decide the best value not caring about past decisions

## Tips for Dynamic Programming

* In recursive problems, the key to the problem is
	* To figure out the relationship between a base case and its sub-problems.
* Steps:
	* First write the base case and the other some consequent sub cases
		* Thinking top down with tree is also an alternative
	* Identity any relationship
		* This is the key to the solution.
	* If any repetitive step that can lead to memorization which = dynamic programming.
