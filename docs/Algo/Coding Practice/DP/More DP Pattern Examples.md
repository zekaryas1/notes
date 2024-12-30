---
date created: Sunday, July 14th 2024, 10:30:57 pm
date modified: Sunday, July 14th 2024, 10:50:50 pm
---

# More DP Pattern Examples

## 1D DP Problems

### Box Stacking

- ![](https://bruceoutdoors.wordpress.com/wp-content/uploads/2015/10/shortest-path-tree.png)

```python
def max_height(boxes):
    # Generate all rotations of the boxes
    rotations = []
    for box in boxes:
        # Original dimensions
        rotations.append(box)
        # Rotate the box to use width as height
        rotations.append((box[1], min(box[0], box[2]), max(box[0], box[2])))
        # Rotate the box to use depth as height
        rotations.append((box[2], min(box[0], box[1]), max(box[0], box[1])))
    
    # Sort the rotations based on base area (width * depth) in descending order
    rotations.sort(key=lambda x: x[1] * x[2], reverse=True)
    
    # Initialize the DP array to store the maximum height achievable with each box at the top
    dp = [box[0] for box in rotations]
    
    # Fill the DP array
    for i in range(len(rotations)):
        for j in range(i):
            if rotations[i][1] < rotations[j][1] and rotations[i][2] < rotations[j][2]:
                dp[i] = max(dp[i], dp[j] + rotations[i][0])
    
    # The maximum height will be the maximum value in the DP array
    return max(dp)

# Example usage:
boxes = [(4, 6, 7), (1, 2, 3), (4, 5, 6), (10, 12, 32)]
print(max_height(boxes))  # Output will be the maximum height of the stack
```

### Climbing Stairs

- ![](https://atechdaily.com/resources/images/posts/2020/8/468/MinCost.png)

```python
def climb_stairs(n):
    if n == 1:
        return 1
    if n == 2:
        return 2
    
    # Initialize the DP array
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    # Fill the DP array using an inner loop
    for i in range(3, n + 1):
        for j in range(1, 3):  # Only considering steps of 1 or 2
            dp[i] += dp[i - j]
    
    return dp[n]

# Example usage:
n = 5
print(climb_stairs(n))  # Output: 8
```

## 2D DP Problems

### Coin Change 2

- ![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDR2uOt59Xqo3ayyDcGlCDccRUPPNO0yp1Bw&s)

```python
def change(amount, coins):
    # Initialize a 2D array dp where dp[i][j] represents the number of ways to make amount j using the first i types of coins
    dp = [[0] * (amount + 1) for _ in range(len(coins) + 1)]
    
    # There is one way to make amount 0, which is to use no coins
    for i in range(len(coins) + 1):
        dp[i][0] = 1
    
    # Fill the dp array
    for i in range(1, len(coins) + 1):
        for j in range(1, amount + 1):
            if coins[i - 1] <= j:
                # If the current coin can be used, we can either use it or not use it
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]]
            else:
                # If the current coin cannot be used, we can only not use it
                dp[i][j] = dp[i - 1][j]
    
    return dp[len(coins)][amount]

# Example usage:
amount = 5
coins = [1, 2, 3]
print(change(amount, coins))  # Output: 5
```

### Longest Common Substring

- ![](https://www.techiedelight.com/wp-content/uploads/Longest-common-substring.png)

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = defaultdict(int)
        
        for r in range(len(text1)):
            for c in range(len(text2)):
                if text1[r] == text2[c]:
                    dp[(r,c)] = 1 + dp[(r-1,c-1)]
        
        return max(dp.values())
```
