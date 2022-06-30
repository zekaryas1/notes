---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Thursday, June 16th 2022, 11:56:17 am
title: The Sieve of Eratosthenes
---
# The Sieve of Eratosthenes

* The Sieve of Eratosthenes is a highly efficient way to generate a list of primes. It works by recognizing that all non-prime numbers are divisible by a prime number.
* How it works
	* We start with a list of all the numbers up through some value max. First, we cross off all numbers divisible by 2
	* Then, we look for the next prime (the next non-crossed off number) and cross off all numbers divisible by it. By crossing off all numbers divisible by 2, 3, 5, 7, 11, and so on,
	* Finally we wind up with a list of prime numbers from 2 through max.

[Code source](https://www.geeksforgeeks.org/python-program-for-sieve-of-eratosthenes)

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

# Finding GCD(Greatest Common divisor) of Two Numbers

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
