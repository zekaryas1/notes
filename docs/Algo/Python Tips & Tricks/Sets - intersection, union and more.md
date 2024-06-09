---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Monday, October 3rd 2022, 10:21:17 am
title: Sets - Intersection, Union and More
---

# Sets - Intersection, Union and More

- Set is a Collection of Unique Elements
	- More interesting operations on set
		- setA & setB == intersection…(find items common to both)
		- setA | setB = union…all the items in one place
		- setA–setB = all elements in A that aren’t in B
		- setA ^ setB = all the elements that are either in the first set or the second set but not in both.

```python
a = set(['A', 'B', 'C','D'])
b = set(['C', 'D', 'E', 'F'])
print(a & b) #C, D
print(a | b) #all elts
print(a - b) #A, B
print(a ^ b) #A,B,E,F
```

## Check if a Word is without Repeating Characters

```python
def isUnique(word):
	return len(word) == len(set(word))

print(isUnique("set"))
print(isUnique("element"))
```

## SET Common Operations

```python
my_set = set('a', 'b', 'c')

my_set.add('d')

my_set.update(('d', 'e', 'f'))  #add multiple sets

my_set.remove('b')

my_set.remove('x') #caused an error x is not in the set

my_set.discard('x') #remove but doesn't cause an error

my_set.pop() #returns a random elt

my_set.clear() #removed all the elts
```

## SET Non Common Operations

- `isdisjoint` method return true if there are no common elements between sets a and b

```python
a = (1,2,3)
b = (1,2,3,4)

a.issubset(b) #true

a.issuperset(b) #false

a.isdisjoint(b) #false
```
