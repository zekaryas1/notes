---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Monday, January 2nd 2023, 11:22:19 am
title: String Operations
---

# String Operations

## Reverse a String

```python
a = "hello world"
print(a[::-1])
```

## String Concatenation

* In java string concatenation is O(n\**2) thus you should use StringBuilder.
* In python string concatenation is O(n), because the underline cpython handles the string builder.
* In python string is immutable, thus you can not do string replacement in place.
	* Instead convert it into a list.

## String Property Checking

- `isupper` to check if a string is all uppercase
- `islower` to check if a string is all lowercase
- `isnumeric` to check if a string is all numeric
- `isalpha` to check is a string is all alphabet
- `isalnum` to check if a string is all numeric and alphabet
- `isspace` to check is a string is all space/empty

```python
print("USA".isupper()) #true

print("b".islower()) #true
print("Bc".islower()) #false

print("123".isnumeric()) #true

print("abc".isalpha()) #true
print("ab c".isalpha()) #false

print("abc123".isalnum()) #true

print("".isspace()) #false
print(" ".isspace()) #true
print(" \t".isspace()) #true
```

## String Formatting

```python
print(f"The solution to 24 + 24 is {24 + 24}")
```

## Strip

- The strip() method returns a copy of the string by removing both the leading and the trailing characters (based on the string argument passed).

```python
" hello ".strip() #removed the white spaces output = hello

"##hello##".strip('#') #removed the #s at the start end end output = hello

"www.hello.com".strip('wcom')  #removed wcom from the string output = .hello.
```

```python
"hello python".removeprefix("hello")  #output = python

"hello python".removesuffic("python") #output = hello
```

## Replace

- The replace() method replaces a specified phrase with another specified phrase.

```python
"hello world python".replace(" ", "-") #'hello-world-python'
```

## Split

- The split() method splits a string into a list. You can specify the separator, default separator is any whitespace.

```python
"hello world python".split() #['hello', 'world', 'python']

"www.python.com".split(".") #['www', 'python', 'com']
```

## Join

- The join() method takes all items in an iterable and joins them into one string. A string must be specified as the separator.

```python
a = ["hello", "python"]

"".join(a)  #hellopython

" ".join(a) #hello python

"-".join(a)  #hello-python
```

## Count

- The count() method returns the number of elements with the specified value.

```python
"hello world".count('l') #3

```

## Find

- The find() method finds the first occurrence of the specified value. The find() method returns -1 if the value is not found.

```python
"hello world".find('l') #2

"hello world".find("l", 2) #3 starts looking from index 2

"hello world".rfind('l') #9 starts looking from the end
```

## Zfill

- The zfill() method adds zeros (0) at the beginning of the string, until it reaches the specified length.

```python
"43".zfill(5) #00042
"-43".zfill(5) #-0042
```
