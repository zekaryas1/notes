---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, December 12th 2024, 4:44:08 pm
title: Interesting Math Algos
---

# Interesting Math Algos

## Math

### The Sieve of Eratosthenes

* The Sieve of Eratosthenes is a highly efficient way to generate a list of primes. It works by recognizing that all non-prime numbers are divisible by a prime number.
* How it works
	* We start with a list of all the numbers up through some value max. First, we cross off all numbers divisible by 2
	* Then, we look for the next prime (the next non-crossed off number) and cross off all numbers divisible by it. By crossing off all numbers divisible by 2, 3, 5, 7, 11, and so on,
	* Finally we wind up with a list of prime numbers from 2 through max.
- [Code source](https://www.geeksforgeeks.org/python-program-for-sieve-of-eratosthenes)

```python
def SieveOfEratosthenes(num):
    prime = [True for i in range(num+1)]
# boolean array
    p = 2
    while (p * p <= num):
 
        # If prime[p] is not
        # changed, then it is a prime
        if (prime[p] == True):
 
            # Updating all multiples of p
            for i in range(p * p, num+1, p):
                prime[i] = False
        p += 1
 
    # Print all prime numbers
    for p in range(2, num+1):
        if prime[p]:
            print(p)
 
 
# Driver code
if __name__ == '__main__':
    num = 50
    print("Following are the prime numbers smaller"),
    print("than or equal to", num)
    SieveOfEratosthenes(num)
```

### Finding GCD(Greatest Common divisor) of Two Numbers

```python

def gcd(m,n):
	if m == n:
		return m
	elif m > n:
		return gcd(m-n,n)
	else:
		return gcd(m, n-m)

print(gcd(84,44))
```

## Probabilistic Data Structures

- Probabilistic data structures are designed to provide fast, memory-efficient ==approximate== solutions for tasks like membership testing, frequency counting, or cardinality estimation.
- While most tasks handled by probabilistic data structures can also be achieved using hash tables, binary search, or other traditional data structures with full accuracy, probabilistic data structures prioritize efficiency by sacrificing some accuracy, allowing for tolerable levels of false positives or negatives.

| **Aspect**            | **Hash Table**                              | **Probabilistic Data Structures**                  |
| --------------------- | ------------------------------------------- | -------------------------------------------------- |
| **Accuracy**          | Exact results.                              | Approximate results (false positives/negatives).   |
| **Memory Usage**      | High, especially for large datasets.        | Much lower for large datasets.                     |
| **Scalability**       | Not suitable for massive or streaming data. | Scales well for large/streaming datasets.          |
| **Speed**             | Efficient but memory-constrained.           | Faster for large-scale problems.                   |
| **Deletes**           | Supported directly.                         | Often limited or unsupported (e.g., Bloom Filter). |
| **Use Case Examples** | Caching, associative arrays.                | Membership testing, cardinality estimation.        |

- **Common Probabilistic Data Structures and Their Alternatives**

| **Task**               | **Probabilistic Data Structure** | **Exact Alternatives**              |
| ---------------------- | -------------------------------- | ----------------------------------- |
| **Membership Testing** | Bloom Filter                     | Hash table, Binary Search Tree.     |
| **Frequency Counting** | Count-Min Sketch                 | Hash map, Counter data structure.   |
| **Distinct Counting**  | HyperLogLog                      | Hash table (tracking all elements). |
| **Set Operations**     | Cuckoo Filter                    | Linked lists, Trees, or Exact Sets. |

- **When To Use Probabilistic Data Structures Over Others**
	- **Memory Constraints**:
	    - Bloom Filters use significantly less memory than hash tables for testing membership.
	- **Fast Approximation Needs**:
	    - Probabilistic data structures provide quick answers with small errors, making them suitable for real-time applications.
	- **Large Data Streams**:
	    - Can process elements in one pass without requiring the entire dataset in memory.
	- **Tolerable Error Margins**:
	    - Suitable when small inaccuracies are acceptable, such as in caching, recommendation systems, or network traffic analysis.

### Bloom Filters

- **Overview**
	- **Definition**: A probabilistic data structure that efficiently checks if an element is present in a set, with a possibility of false positives but no false negatives.
	- **Core Idea**:
		- Uses multiple hash functions to map elements to a bit array.
		- Supports two operations:
			- **Insert**: Hash the element and set the corresponding bits to `1`.
			- **Check**: Verify if all bits corresponding to the element's hash values are `1`.
- **Use Cases**
	- **Membership Testing**:
		- Checking presence of elements in large datasets (e.g., web crawlers, caches).
	- **Databases**:
	    - Reduce disk lookups by testing for non-membership in indexes.
	- **Distributed Systems**:
	    - Quick checks in systems like distributed caching (e.g., Redis).
	- **Network Security**:
	    - Detecting malicious URLs or spam emails.
- **Trade-offs**
	- **Advantages**:
	    - Memory-efficient compared to exact data structures.
	    - Constant time complexity for insert and lookup.
	- **Limitations**:
	    - False positives are possible (but can be minimized by tuning parameters).
	    - Cannot delete elements unless additional mechanisms like counting filters are used.
	- **Parameter Tuning**:
	    - Number of hash functions (k) and size of bit array (m) are critical.
	    - Balance between false positive rate and memory usage.

```python
from hashlib import md5

class BloomFilter:
    def __init__(self, size, num_hashes):
        self.size = size
        self.num_hashes = num_hashes
        self.bit_array = [0] * size

    def _hashes(self, item):
        for i in range(self.num_hashes):
            yield int(md5((item + str(i)).encode()).hexdigest(), 16) % self.size

    def insert(self, item):
        for hash_val in self._hashes(item):
            self.bit_array[hash_val] = 1

    def contains(self, item):
        return all(self.bit_array[hash_val] for hash_val in self._hashes(item))

# Example usage:
bf = BloomFilter(size=1000, num_hashes=5)
bf.insert("apple")
print(bf.contains("apple"))  # True
print(bf.contains("orange"))  # False (likely) or True (false positive)

```

- Source
	- [wiki bloom filters](https://en.wikipedia.org/wiki/Bloom_filter)

### Count Min Sketch

- ![count min sketch hight level design with code](https://i.sstatic.net/vhJmP.png)
- Overview
	- A **Count-Min Sketch** is a probabilistic data structure used for efficiently estimating the frequency of elements in a stream.
	- It provides approximate counts, with some potential for overestimation, but guarantees no underestimation.
- Key advantages:
	- **Space-efficient**: Uses sub-linear space compared to the size of the data.
		- for systems like counting millions or billions of views or counts, data structures like hash table and binary search although capable won't be space efficient as they requires as much keys in their structure.
	- **Speed**: Supports fast insertions and queries.
	- **Simplicity**: Easy to implement and tune.
- Typical use cases:
	- Tracking popular items in a data stream (e.g., trending hashtags).
	- Network traffic monitoring.
	- Estimating frequency distributions in large datasets.
- Trade-offs
	- **Accuracy**: Controlled by the number of hash functions and the width of the table.
	- **Collisions**: Can lead to overestimation when different elements hash to the same position.
	- Space and time complexity depend on the desired error bounds.

```python
import hashlib
import math

class CountMinSketch:
    def __init__(self, width, depth):
        """
        Initialize a Count-Min Sketch with the given width and depth.
        :param width: Number of counters per row.
        :param depth: Number of hash functions (number of rows).
        """
        self.width = width
        self.depth = depth
        self.table = [[0] * width for _ in range(depth)]
        self.hash_functions = [self._generate_hash(i) for i in range(depth)]

    def _generate_hash(self, seed):
        def hash_fn(x):
            return int(hashlib.md5((str(x) + str(seed)).encode()).hexdigest(), 16) % self.width
        return hash_fn

    def add(self, item):
        """Add an item to the Count-Min Sketch."""
        for i, hash_fn in enumerate(self.hash_functions):
            index = hash_fn(item)
            self.table[i][index] += 1

    def query(self, item):
        """Query the count of an item in the Count-Min Sketch."""
        return min(self.table[i][hash_fn(item)] for i, hash_fn in enumerate(self.hash_functions))

# Example usage:
sketch = CountMinSketch(width=1000, depth=5)
sketch.add("apple")
sketch.add("apple")
sketch.add("banana")

print("Count of 'apple':", sketch.query("apple"))  # Output: Approximate count of 'apple'
print("Count of 'banana':", sketch.query("banana"))  # Output: Approximate count of 'banana'
print("Count of 'cherry':", sketch.query("cherry"))  # Likely 0, if 'cherry' wasn't added
```

- Source
	- [Detailed explanation of Count min sketch from stack-overflow](https://stackoverflow.com/a/64397892)

## In-place Frequency

You can find the frequency of array elements using the array itself by modifying the array in-place while keeping track of the counts. Here's an algorithm to achieve this:

1. Traverse the array and for each element `arr[i]`, decrement it by 1 to make it zero-indexed.
2. For each zero-indexed element `arr[i]`, update the count at the index corresponding to the value of `arr[i]` by adding the length of the array (n) to the value at that index.
3. Traverse the array again and divide each element by the length of the array (n) to get the final count of each element.

Here's the Python code to implement this algorithm:

```python
def find_frequency(arr):
    n = len(arr)
    
    # Make elements zero-indexed
    for i in range(n):
        arr[i] -= 1
    
    # Update counts using the array itself
    for i in range(n):
        arr[arr[i] % n] += n
    
    # Calculate final counts by dividing by the length of the array
    for i in range(n):
        arr[i] //= n
    
    return arr

# Example usage
arr = [3, 3, 4, 2, 4, 4, 2]
freq = find_frequency(arr)
print(freq)  # Output: [0, 2, 2, 3]
```

In the example usage, the input array `arr = [3, 3, 4, 2, 4, 4, 2]` represents the following counts:

- 1 occurs 0 times
- 2 occurs 2 times
- 3 occurs 2 times
- 4 occurs 3 times

Please note that this algorithm modifies the input array in-place. If you'd like to preserve the original array, you can create a copy before performing the frequency calculation.

> This algorithm, only works if all elts in the array are in-range [0-len(array)]

### Leetcode Problem Related to This

- [first-missing-positive - LeetCode](https://leetcode.com/problems/first-missing-positive/description/)
