## Set is a collection of unique elements

-   More interesting operations on set
	-   setA & setB == intersection…(find items common to both)
	-   setA | setB = union…all the items in one place
	-   setA – setB = all elements in a that aren’t in B

```python
a = set(['A', 'B', 'C','D'])
b = set(['C', 'D', 'E', 'F'])
print(a & b)
print(a | b)
print(a - b)
```