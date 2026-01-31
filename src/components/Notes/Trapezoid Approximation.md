---
tags:
  - baby
author: Jorge
date: 2025-09-07 17:02
modified: 2025-09-08 14:08
---
Yeah is quite interesting, [[numpy]] have a one interesting implementation, but the idea is quite simply, instead of use rectangle you use trapezoids, which area is:

$$
\frac{f(x_{i}).f(x_{i+1})}{2}
$$

And summing all this trapezoids you have,