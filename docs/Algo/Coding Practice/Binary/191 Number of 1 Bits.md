---
tags: [bits, bit]
date created: Wednesday, August 24th 2022, 4:11:39 pm
date modified: Sunday, March 17th 2024, 3:46:44 pm
title: 191 Number of 1 Bits
---

# 191 Number of 1 Bits

## Solution

- Iterate through the bits and add the last bit to result, [Check: Looping in Bit World](Algo/Fundamental%20Algorithms/Bit%20manipulation.md#Looping%20in%20Bit%20World)

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
