---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Monday, January 1st 2024, 8:01:24 pm
title: Which Algo to Select, Pattern Based Answer
---

# Which Algo to Select, Pattern Based Answer

[Source](https://seanprashad.com/leetcode-patterns/)

## If

### Input Array is Sorted Then

- [1. Binary search](Algo/Fundamental%20Algorithms/Searching%20algos/1.%20Binary%20search.md)
- Two pointers

### Asked for All permutations/subsets Then

- [Backtracking](Algo/Fundamental%20Algorithms/Recursion/Backtracking.md)

### Given a Tree Then

- DFS
	- inorder,preorder, postorder
- BFS

### Given a Graph Then

- DFS
- BFS

### Given a Linked List Then

- [Two pointers](Algo/Fundamental%20Algorithms/Misc/Sub%20Array/Two%20pointers.md)
- [Linked list - fast/slow pointers](Algo/Fundamental%20Algorithms/Linked%20List/Linked%20list.md#The%20Runner%20Technique)

### Recursion is Banned Then

- [Stack LAST IN FIRST OUT](Algo/Fundamental%20Algorithms/Linked%20List/Stack%20&%20Queue.md#Stack%20{LAST%20IN%20FIRST%20OUT})

### Must Solve In-place Then

- Swap corresponding values
- Store one or more different values in the same pointer

### Asked for maximum/minimum of Not-contiguous sub-array/subset/options Then

- [Intro to Dynamic programming](Algo/Fundamental%20Algorithms/Recursion/Intro%20to%20Dynamic%20programming.md)

### Asked for top/least K Items Then

- [Heap](Algo/Fundamental%20Algorithms/Linked%20List/Stack%20&%20Queue.md#Priority%20Queue%202%20{%20Heapq%20})

### Asked for Common Strings Then

- Map
- Trie

### Asked Contiguous Sub-string with X Condition

- [Sliding window](Algo/Fundamental%20Algorithms/Misc/Sub%20Array/Sliding%20window.md)
- Monotonic queue

### Asked Contiguous Sub-array Sum with X Condition

- [Prefix sum](Algo/Fundamental%20Algorithms/Misc/Sub%20Array/Prefix%20sum.md)

### Next/Prev Greater or Smaller Element

- [Monotonic Stack](Algo/Fundamental%20Algorithms/Misc/Monotonic/Monotonic%20Stack.md)
	- [ex: Next greater elt](Algo/Coding%20Practice/Stack/Next%20greater%20elt.md)

## Else

- Map/Set for O(1) time & O(n) space
- Sort input for O(nlogn) time and O(1) space
