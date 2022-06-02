[Source Algo Monster](https://algo.monster/problems/binary_search_boundary)
# How to use binary boundary method
* Most binary search questions can be solved with find boundary logic  
	* Steps:  
		  1. Find a logic to turn the sorted inputs in to a false…True array 
		  2. With that logic modify the previous code  
	* Example: Solving minimum in rotated sorted array
		* The logic to turn the sorted array: is arr[i] <= arr[-1]
# Finding the Boundary with Binary Search
- An array of boolean values is divided into two sections;
	- The left section consists of all false and
	- The right section consists of all true.  
  * Find the boundary of the right section
	  * I.e. the index of the first true element. If there is no true element, return -1*.
	  * [Finding Boundary - Binary Search / Overview](https://algo.monster/problems/binary_search_boundary)_  

```python
from typing import List

def find_boundary(arr: List[bool]) -> int:
    left, right = 0, len(arr) - 1
    boundary_index = -1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid]:
            boundary_index = mid
            right = mid - 1
        else:
            left = mid + 1

    return boundary_index

if __name__ == '__main__':
    arr = [False, False, True, True, True]
    res = find_boundary(arr)
    print(res)
```  
  
----
# Find Minimum in Rotated Sorted Array

```python
from typing import List

def find_min_rotated(arr: List[int]) -> int:
    left, right = 0, len(arr) - 1
    boundary_index = -1

    while left <= right:
        mid = (left + right) // 2
        # if <= last element, then belongs to lower half
        if arr[mid] <= arr[-1]:
            boundary_index = mid
            right = mid - 1
        else:
            left = mid + 1

    return boundary_index

if __name__ == '__main__':
    arr = [int(x) for x in input().split()]
    res = find_min_rotated(arr)
    print(res)
```  
  