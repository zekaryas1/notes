---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, July 3rd 2022, 11:20:26 am
title: Bit Manipulation
---

# Bit Manipulation

```python
# a&b
# Multiplication 1&1 = 1, 1&0 = 0, 0&0 = 0, 101 & 111 = 101
print(1&1)

# a | b
# Addition  1|1 = 11,   1|0 = 1,  0|0 = 0,  101 | 111  = 111  
print(1|1)

# ~a
# Negation(not)  ~1 = 0, ~0 =1,    ex: ~101 = 010  
print(~1)

# a >> n  
# Right shift a by n,  
# Ex: 100101 >> 1 =  10010...same as saying remove the last n bit(s)  
print(100101 >> 1)

# a << n  
# Left shift by n,
# Ex: 100101 << 1 = 00101..same as saying remove the first n bit(s)  
print(100101 << 1)
```

## XOR Properties

```python
# XOR properties:  
# a ^ a = 0 => Same elements xored will result in zero  
# a ^ 0 = a => Element xored with zero will result the element itself   
```

## Find Non Duplicate with XOR

```python
# a ^ b ^ a = b  
# a ^ a is zero and zero ^ b is the element itself which is b 
a = [4,4,7,4,4]
res = 0
for elt in a:
	res = res ^ elt
print(res)  # prints 7
```

## Looping in Bit World

* Standard code: how to loop bits

```python
x = 10101
while x:  #eventually x will be zero=false  
  last_bit = x % 2  #or last_bit = x & 1
  print(last_bit)
  x = x >> 1  #or x = x << 1
```

* Tips and tricks

 ```python
a = 12
print(a>>1) #-> equal to -> a / 2  
print(a<<1) #-> equal to -> a * 2  
```
