---
tags: [bits, bit]
date created: Wednesday, August 24th 2022, 4:11:39 pm
date modified: Thursday, July 6th 2023, 11:17:02 am
title: 191 Number of 1 Bits
---

# 191 Number of 1 Bits

## Solution

- Iterate through the bits and add the last bit to result [Bit manipulation](Algo/Fundamental%20Algorithms/Bit%20manipulation.md)

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
	        last_bit = n & 1
            res = res + last_bit
            n = n >> 1
        return res
            
```
