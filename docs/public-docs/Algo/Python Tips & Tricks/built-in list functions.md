---
date created: Sunday, July 31st 2022, 3:13:22 pm
date modified: Friday, November 18th 2022, 12:58:24 pm
title: Built-in Functions
---

# Built-in Functions

## Zip

- The `zip()` function takes `iterables` (can be zero or more), aggregates them in a tuple, and returns it.

```python
languages = ['Java', 'Python', 'JavaScript']
versions = [14, 3, 6]

result = zip(languages, versions) #result = zip object

print(list(result))
```

- If two `iterables` are passed to `zip()`; one `iterable` containing three(3) and other containing five(5) elements.
	- Then, the returned iterator will contain three tuples. It's because the iterator stops when the shortest `iterable` is exhausted.

```python
numbersList = [1, 2, 3]
numbers_tuple = ('ONE', 'TWO', 'THREE', 'FOUR')

# Notice, the size of numbersList and numbers_tuple is different
result = zip(numbersList, numbers_tuple)

# Converting to set
result_set = set(result)
print(result_set)
```

## All

- Returns `True` if all elements in the given `iterable` are true. If not, it returns `False`.
- Empty `iterable` return `True`

```python
boolean_list = ['True', 'True', 'True']

# check if all elements are true
result = all(boolean_list)
print(result)

print(all([0, True])) # 0 is considered false
```

## Any

- Returns `True` if any element of an `iterable` is `True`. If not, it returns `False`.
- Empty `iterable` return `False`

```python
boolean_list = ['False', 'True', 'False']

# check if all elements are true
result = any(boolean_list)
print(result)

print(any([0, True])) # 0 is considered false
```

## Filter

- Extracts elements from an `iterable` (list, tuple etc.) for which a function returns `True`.

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# returns True if number is even
def check_even(number):
    if number % 2 == 0:
          return True  

    return False

# Extract elements from the numbers list for which check_even() returns True
even_numbers_iterator = filter(check_even, numbers)

# converting to list
print(list(even_numbers_iterator))

# Output: [2, 4, 6, 8, 10]
```

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers_iterator = filter(lambda x: x%2 == 0, numbers)
print(list(even_numbers_iterator))
```

- When `None` is used as the first argument to the `filter()` function, all elements that are `truthy` values (gives `True` if converted to boolean) are extracted.

```python
# random list
random_list = [1, 'a', 0, False, True, '0']

filtered_iterator = filter(None, random_list)

#converting to list
filtered_list = list(filtered_iterator)

print(filtered_list)
```

## Map

- Function applies a given function to each item of an `iterable` (list, tuple etc.) and returns an iterator.

```python
numbers = [2, 4, 6, 8, 10]

# returns square of a number
def square(number):
  return number * number

# apply square() function to each item of the numbers list
squared_numbers_iterator = map(square, numbers)

# converting to list
print(list(squared_numbers_iterator))

# Output: [4, 16, 36, 64, 100]
```

```python
numbers = [2, 4, 6, 8, 10]
squared_numbers_iterator = map(lambda x: x**2, numbers)
print(list(squared_numbers_iterator))
```

- Passing Multiple Iterators to map()

```python
num1 = [4, 5, 6]
num2 = [5, 6, 7]

result = map(lambda n1, n2: n1+n2, num1, num2)
print(list(result)) #[9, 11, 13]
```

## Iter

- The iter() method returns an iterator for the given argument.

```python
# list of vowels
phones = ['apple', 'samsung', 'oneplus']
phones_iter = iter(phones)

print(next(phones_iter))   
print(next(phones_iter))    
print(next(phones_iter))    

# Output:
# apple
# samsung
# oneplus
```

- Iterator yields items that was not yielded in previous iteration.
	- or not visited on previous iteration

```python
it = iter([1,2,3,4])
for x in it:
     print(x)
     break
#1
for x in it:  # `1` is yielded in previous iteration. It's not yielded here.
     print(x)
#2
#3
#4
```

```python
phones = ['apple', 'samsung', 'oneplus']
phones_iter = iter(phones)

print("samsung" in phones_iter) #True, visited/iterated upto samsung

for elt in phones_iter: #prints after samsung
    print(elt)

#output
	#oneplus
```
