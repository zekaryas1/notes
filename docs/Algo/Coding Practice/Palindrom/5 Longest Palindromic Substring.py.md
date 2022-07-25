---
tags: 
	- coding_problems
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Monday, June 27th 2022, 12:10:31 pm
title: 5 Longest Palindromic Substring.py
---

# 5 Longest Palindromic Substring.py

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        self.resString = ""
        self.maxLength = 0
        self.s = s
        
        
        def runCheckPalindrom(left, right):
            while left >=0 and right < len(self.s) and s[left] == s[right]:
                if (right-left + 1) > self.maxLength:
                    self.resString = s[left:right+1]
                    self.maxLength = right-left+1
                left -= 1
                right += 1
            
        for i in range(len(s)):
            runCheckPalindrom(i,i) #for odd
            runCheckPalindrom(i,i+1) #for even
        
        return self.resString
```
