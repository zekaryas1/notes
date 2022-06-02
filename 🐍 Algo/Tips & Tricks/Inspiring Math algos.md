# The Sieve of Eratosthenes  
  
* The Sieve of Eratosthenes is a highly efficient way to generate a list of primes. It works by recognizing that all non-prime numbers are divisible by a prime number.  
* How it works  
  * We start with a list of all the numbers up through some value max. First, we cross off all numbers divisible by 2  
  * Then, we look for the next prime (the next non-crossed off number) and cross off all numbers divisible by it. By crossing off all numbers divisible by 2, 3, 5, 7, 11, and so on,  
  * Finally we wind up with a list of prime numbers from 2 through max.  

# Finding GCD(Greatest common divisor) of two numbers

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