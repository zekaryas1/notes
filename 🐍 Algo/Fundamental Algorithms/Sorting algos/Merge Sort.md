# Merge Sort I Runtime: O( n log (n) ) average and worst case. Memory: Depends.  
  
Merge sort divides the array in half, sorts each of those halves, and then merges them back together.  

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/Merge-Sort-Tutorial.png)
  
Each of those halves has the same sorting algorithm applied to it. Eventually, you are merging just two single element arrays. It is the "merge" part that does all the heavy lifting.  
  
The merge method operates by copying all the elements from the target array segment into a helper array, keeping track of where the start of the left and right halves should be (helper Left and helper Right).  
  
We then iterate through helper, copying the smaller element from each half into the array. At the end, we copy any remaining elements into the target array.  

![](https://i.stack.imgur.com/RwILJ.png)  
  