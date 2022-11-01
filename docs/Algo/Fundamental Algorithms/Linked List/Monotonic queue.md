---
date created: Wednesday, August 10th 2022, 4:56:48 pm
date modified: Sunday, October 23rd 2022, 4:26:24 pm
title: Monotonic Decreasing Queue
---

# Monotonic Decreasing Queue

- [Reference](https://1e9.medium.com/monotonic-queue-notes-980a019d5793)
- Monotonic Queue is a data structure that keeps it’s elements either entirely in increasing, or entirely in decreasing order.
- The advantage of MQ is linear time complexity.
- Monotonic Decreasing Queue
	- For each element, Before actually adding an element to the queue, we remove values which are smaller than the current value, this way we can keep a non-increasing sequence.

## Example with Code

- Sliding Window Maximum
	- Find the maximum integer within the window each time it moves.

```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

```python
def sliding_window_maximum(nums: List[int], k: int) -> List[int]:

    q = deque() # stores *indices*
    res = []
    
    for i, cur in enumerate(nums):
        while q and nums[q[-1]] <= cur:
            q.pop() #pop from right/end
        q.append(i)
        
        # if q[0] is out of bound(window size)-> remove it
        if q[0] == i - k:
            q.popleft()

        # if window size == k, (k-1) since we're starting from 0(i=0)
        if i >= k - 1:
            res.append(nums[q[0]])
            
    return res
```
