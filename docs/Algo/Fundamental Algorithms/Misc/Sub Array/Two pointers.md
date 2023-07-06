---
title: Two Pointers
date created: Thursday, July 6th 2023, 11:04:35 am
date modified: Thursday, July 6th 2023, 11:08:47 am
---

# Two Pointers

## Introduction

The two pointers algorithm pattern is a technique used to solve problems that involve searching, iterating, or manipulating elements in an array or list. It involves using two pointers, typically named `left` and `right`, to navigate through the data structure and perform operations based on their positions.

## How to Solve Using Two Pointers

1. Initialize the `left` pointer at the beginning of the array or list, and the `right` pointer at the end.
2. Move the pointers towards each other, usually towards the center of the array or list, by updating their positions based on the problem's requirements.
3. At each step, check the elements pointed to by the `left` and `right` pointers and perform operations or comparisons.
4. Depending on the problem, adjust the pointers' positions, such as moving the `left` pointer to the right or the `right` pointer to the left, based on the problem's constraints or conditions.
5. Repeat steps 3-4 until the pointers meet or cross each other, indicating that the entire array or list has been traversed.

The two pointers algorithm pattern is especially useful when dealing with sorted or partially sorted arrays or lists.

It allows you to efficiently search for pairs of elements, find continuous subarrays or subsequences that satisfy certain conditions, or perform other operations that require examining elements from different positions simultaneously.

> By using the two pointers technique, you can often achieve a more optimal solution compared to other approaches that involve nested loops or excessive iterations.

## Template

```python
def two_pointers(nums):
    # Initialize the left and right pointers
    left = 0
    right = len(nums) - 1

    while left < right:
        # Perform operations or comparisons based on the elements at the left and right pointers

        # Move the pointers based on the problem's requirements
        # - Update left pointer: left += 1
        # - Update right pointer: right -= 1

    # Return any required result
```

## Recommended Leetcode Exercises

- Solving leetcode two sum questions using two-pointers

```python
def twoSum(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        curr_sum = nums[left] + nums[right]

        if curr_sum == target:
            return [left, right]  # Return the indices of the two numbers

        if curr_sum < target:
            left += 1  # Increment left pointer if the sum is less than the target
        else:
            right -= 1  # Decrement right pointer if the sum is greater than the target

    return []  # Return an empty list if no solution is found
```
