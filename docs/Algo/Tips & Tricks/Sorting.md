# Sort in python
- Two type of sort
	- Sorting in place
	- Sorting out of place

```python
a = [5,4,3,2,1]
b = sorted(a) #return a new list not in place
a.sort() # sort in place
print(b)
print(a)
```

# Sort by key
- When you have a 2D or > 1D list  D = Dimension
```python
a = [[5,4], [4,3], [3,2], [2,1]]
a.sort(key = lambda x: x[1]) #sort by the second key
print(a)
```