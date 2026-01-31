---
tags:
  - baby
author: Jorge
date: 2025-08-15 09:59
modified: 2025-08-18 21:33
---
Let's put in the context when looking at the [[Loss function]]. (surprise a.k.a deviation)

If the surprise of a model for a predicted value is quite high, then it is a bad response and we are gonna punish it harshly, this is, change the parameters by more than usual.

Now if the surprise is low, then it's a good response and we don't need to tweak that much.

For that reason the [[Cross entropy]] is so famous and used.