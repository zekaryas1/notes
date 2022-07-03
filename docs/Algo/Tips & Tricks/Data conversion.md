---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, July 3rd 2022, 11:05:56 am
title: Python Data Conversion
---

# Python Data Conversion

## Binary to Integer and Vise Versa

- Integer to binary

```python
print(bin(101))
```

- binary to integer

```python
print(int('0b1100101', 2))
```

## Alphabet to Integer

- The `ord()` function returns an integer representing the Unicode character.

```python
print(ord('a')) #97

#to get indexable value with ord...0,1,2...
# use ord(letter)-ord('a')
print(ord('a')-ord('a')) #0
print(ord('b')-ord('a')) #1
```
