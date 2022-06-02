# What is recursion  
  
Recursion is a process for solving problems by subdividing a larger problem into smaller cases of the problem itself and then solving the smaller, more trivial parts.  
  
An algorithm can be implemented recursively if it can be expressed in smaller version of itself.  
  
## Factorial  
  
* The factorial of a positive integer n can be used to calculate the number of permutations of n elements. The function is defined as  
  * n! = n  * (n -1) * (n- 2) *...*1  
  * 6! = 6*5*4*3*2*1  

```python
def factorial(n):
	if n==1:
		return 1
	else:
		return n * factorial(n-1)
print(factorial(6))
```  
  
## Fibonacci  
  
* The Fibonacci sequence is a sequence of integer values in which the first two values are both 1 and each subsequent value is the sum of the two previous values. The first 11 terms of the sequence are..  
  * 1; 1; 2; 3; 5; 8; 13; 21; 34; 55; 89; : : :  
* The nth Fibonacci number can be computed as follow  

```python
def fibo(n):
	if n <= 2:
		return 1
	else:
		return fibo(n-1) + fibo(n-1)
print(fibo(5))
```  
  
# Types of recursion  
  
* Linear  
  * One function call  
  * Have a linear recursion trace.  
* Binary  
  * Two function call  
  * Have binary tree recursion trace  
* Multiple  
  * Multiple function call  

# Recursive Runtime  
  
* When you have a recursive function that makes multiple calls, the runtime will often (but not always) look like O( branches ** depth ), where branches is the number of times each recursive call branches.  
* <span style="color:#93DF5F">For example Fibonacci ( return fib(n-1) + fib(n-2))</span>  
  * <span style="color:#93DF5F">Has a runtime of 2**N (since two branch)</span>  