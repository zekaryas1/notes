---
date created: Monday, July 25th 2022, 8:52:37 pm
date modified: Monday, July 25th 2022, 8:58:20 pm
title: Random
---

# Random

## Randint

- Return a random integer _N_ such that `a <= N <= b`. Alias for `randrange(a, b+1)`.

```python
import random

# random number between [0 and 9]
res = random.randint(0,9)
print(res)
```

## Choice

- Return a random element from the non-empty sequence _seq_

```python
import random

# random choice
res = random.choice(['apple', 'pear', 'banana'])
print(res)
```

## Shuffle

- Shuffle the sequence _x_ in place.

```python
import random

# random choice
res = ['apple', 'pear', 'banana']
random.shuffle(res)
print(res)
```

## Sample

- Return a _k_ length list of unique elements chosen from the population sequence or set. Used for random sampling without replacement.

```python
import random

# give me random n choices
res = random.sample(range(100), 10)
print(res)
```
