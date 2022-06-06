---
date created: Monday, June 6th 2022, 11:48:03 am
date modified: Monday, June 6th 2022, 12:53:35 pm
title: Useful Python Collections Module
---

# Useful Python Collections Module

- # deque [[Stack & Queue#Queue FIRST IN FIRST OUT]]
- # defaultdict
	- Dictionary subclass that accepts a callable in its constructor whose return value will be used if a requested key cannot be found.

```python
from collections import defaultdict
d = defaultdict(int)  #we can insert int(defulat-0), list(defualt-[]),set(default-new Set()/{}),

d["dog"] = d["dog"] + 1  #defualt value 0 + 1 = 1
print(d["dog"])
print(d["cat"])  #returns zero default value
```

- # orderedDict
	- Dictionary subclass that remembers the insertion order of keys added to it: collections.OrderedDict

```python
#same as dict but keeps the order
from collections import OrderedDict
d = OrderedDict(one=1, two=2, three=3)
print(d)
d['four'] = 4
print(d)
print(d.keys())
```

- # Counter
	- Dictionary to count several different objects at once. In this case, the keys will store individual objects, and the values will hold the number of repetitions of a given object, or the object’s **count**.

```python
from collections import Counter
letters = Counter("mississippi")
print(letters)
print(letters["m"])  #the output of Counter is dictionary
print(letters.keys())
```

- # ChainMap
	- The collections.ChainMap data structure groups multiple dictionaries into a single mapping.
	- Lookups search the underlying mappings one by one until a key is found.
	- Insertions, updates, and deletions only affect the first mapping added to the chain.

```python
from collections import ChainMap
dict1 = {'one': 1, 'two': 2}
dict2 = {'three': 3, 'four': 4}
chain = ChainMap(dict1, dict2)
print(chain)
chain["five"] = 5 #insertion is only on first dictionary
print(chain)
```
