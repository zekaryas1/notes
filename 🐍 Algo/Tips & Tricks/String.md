# reverse a string
```python
a = "hello world"
print(a[::-1])
```

# string concatenation 
* in java string concatenation is O\(n\*\*2\) thus you should use stringbuilder\.  
* In python string concatenation is O\(n\)\, because the underline cpython handles the string builder\.  
* In python string is immutable\, thus you can do string replacement in place\.  
  * Instead convert it into a list\.