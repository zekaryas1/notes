# Reverse a string
```python
a = "hello world"
print(a[::-1])
```

# String concatenation 
* In java string concatenation is O(n\**2) thus you should use StringBuilder.  
* In python string concatenation is O(n), because the underline cpython handles the string builder.  
* In python string is immutable, thus you can not do string replacement in place.
	* Instead convert it into a list.