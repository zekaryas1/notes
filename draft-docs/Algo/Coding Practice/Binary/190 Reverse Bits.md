---
tags: [bits, bit]
date created: Wednesday, August 24th 2022, 3:51:41 pm
date modified: Thursday, July 6th 2023, 11:16:55 am
title: 190 Reverse Bits
---

# 190 Reverse Bits

## Solution

- Iterate over the binary number with [Looping in Bit World](Algo/Fundamental%20Algorithms/Bit%20manipulation.md#Looping%20in%20Bit%20World)
- Add the last bits to the end of the 32 bits answer
	- The last bit will be placed at answer's `31th` bit
	- The next last bit will be placed at answer's `30th` bit {31-1}…

```
reverse 1001
res = 0

get last of reverse => 1
turn to 31 bits 1 << 31 = 1...0 {length 31}
add to res
res = res + 31 bits  {res = 1...0}


get last of reverse => 0
turn to 30 bits 0 << 30 = 0...0 {length 30}
add to res
res = res + 30 bits {res = 10...0}

``````

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        
        res = 0
        num = 31
        
        while n:
            last_bit = n & 1
            
            res = res | (last_bit << num)
            num -= 1
            
            n = n >> 1
            
        return res
```
