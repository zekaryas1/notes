---
date created: Sunday, June 5th 2022, 4:14:21 pm
date modified: Monday, June 6th 2022, 12:48:56 pm
title: Binary Search Loop
---

![](https://www.computerhope.com/jargon/b/binary-search.jpg)

# Binary Search Loop

```python
def search(nums, target):
        low, high = 0, len(nums)-1
        while low <= high:
            mid = (low+high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                high = mid -1
            else:
                low = mid + 1
        return -1

print(search([1,2,3,4,5,6], 4))
```

# Binary Search Recursion

- Note that although the concept is fairly simple, getting all the details right is far more difficult than you might think. Pay attention to the plus ones and minus ones.

```python
def search(nums, target, low, high):
	if low > high:
		return -1
	mid = (low + high) // 2
	if nums[mid] == target:
		return mid
	elif nums[mid] > target:
		return search(nums, target, low, mid-1)
	else:
		return search(nums, target, mid+1, high)

print(search([1,2,3,4,5,6], 4, 0, 6))
```  
