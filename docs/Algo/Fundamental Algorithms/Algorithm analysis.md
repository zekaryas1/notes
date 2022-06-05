# What is algorithm analysis  
  
* Time is not the only thing that matters in an algorithm. We might also care about the amount of memory or space- required by an algorithm.  
* In algorithm analysis, we focus on the growth rate of the running time as a function of the input size  n .(how many times a function is likely to execute based on the input)
* Big 0(asymptotic runtime) is the language and metric we use to describe the efficiency of algorithms.  
* Big 0, Big Theta, and Big Omega
	* 0 (big 0): In academia, big 0 describes an upper bound on the time.
	* Q (big omega): In academia, big omega describes a lower bound.
	* Big theta : describe the average

# Common algorithm's time complexity 
* O(logn): binary search…cuts the problem in half  
* O(Klogn)...heap operations 
	* Popping the min element from heap is logn
	* Popping k times will be klogn
* O(nlogn)...most of sort operations

# What does “constant extra space” means?_  
  * It means use a constant O(1) memory this can be
	  * Variable
	  * Array with fixed size  Array a = new Array[3]  
  * It doesn’t mean
	  * A dictionary or an array that depends on the input 
	  * Ex: List l = new List(input.length)

# Amortized Cost  
  
- The append() operation of the list structure introduces a special case in algorithm analysis. 
	- The time required depends on the available capacity of the underlying array used to implement the list. If there are available slots, a value can be appended to the list in constant time. 
	- If the array has to be expanded to make room for the new value, however, the append operation takes linear time.  
  
> Amortized analysis is the process of computing the time-complexity for a sequence of operations by computing the average cost over the entire sequence.  