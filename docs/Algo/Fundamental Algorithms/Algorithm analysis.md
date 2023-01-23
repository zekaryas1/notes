---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Friday, January 13th 2023, 11:16:56 am
title: What is Algorithm Analysis
---

# What is Algorithm Analysis

* Time is not the only thing that matters in an algorithm. We might also care about the amount of memory or space required by an algorithm.
* In algorithm analysis, we focus on the growth rate of the running time as a function of the input size n.(how many times a function is likely to execute based on the input)
* Big 0(asymptotic runtime) is the language and metric we use to describe the efficiency of algorithms.
* [Video explanation on big o](https://youtu.be/BgLTDT03QtU)
	* [Related website with code example](https://neetcode.io/courses/lessons/big-o-notation)

## Common Algorithm's Time Complexity

- Most Sorting Algo = O(nlogn)
- Heap operation is O(logn)
	- Pushing and popping k times will be klogn
- [Common runtime complexity from Algo.monster](https://algo.monster/problems/runtime_summary)

## What Does “constant Extra space” means?_

  * It means use a constant O(1) memory this can be
	  * Variable
	  * Array with fixed size i.e `Array a = new Array[3]`
  * It doesn’t mean
	  * A dictionary or an array that depends on the input
	  * Ex: List l = new List(input.length)

## Amortized Cost

- The append() operation of the list structure introduces a special case in algorithm analysis.
	- The time required depends on the available capacity of the underlying array used to implement the list. If there are available slots, a value can be appended to the list in constant time.
	- If the array has to be expanded to make room for the new value, however, the append operation takes linear time.

> Amortized analysis is the process of computing the time-complexity for a sequence of operations by computing the average cost over the entire sequence.
