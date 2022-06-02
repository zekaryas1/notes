# Selection Sort I Runtime: O( n**2) average and worst case. Memory: 0 (1) . 

- Find the smallest element using a linear scan and move it to the front (swapping it with the front element).  
  
- Then, find the second smallest and move it, again doing a linear scan. Continue doing this until all the elements are in place.  

![](https://miro.medium.com/max/1400/1*l5skal1-UC-GtSc8ORE-2A.png)

- The selection-sort algorithm is a poor choice in any application, since it runs in  _O_ ( _n**_ 2) time even in the best case.  

```python
def SortWithSelection(array):
    last = len(array)
    for i in range(0, last):
        minimum = findMin(array, i, last)
        indexMin = array.index(minimum)
        array[i], array[indexMin] = array[indexMin], array[i]
    return array


def findMin(array, intial, last):
    minimum = array[intial]
    for i in range(intial, last):
        if array[i] < minimum:
            minimum = array[i]
    return minimum

print(SortWithSelection([7, 6, 5, 4, 3, 2, 1]))
```