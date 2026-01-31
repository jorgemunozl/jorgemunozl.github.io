---
tags:
  - baby
date: 2025-12-11 08:33
modified: 2025-12-11 10:22
---
So when we are doing **LOGDET**, this is what it happen:

$$
\text{LOGDET(A)}=\log(|\det A|)
$$
You throw away the sign determinant. [[Sign of a determinant]]

Which and the end makes you lost the anti symmetry. How we fix this? 

It's clear that if the **DET** equal zero this goes to negative infinite.

First why you would you make that?

And all relies on numerical behaviour

If later we make the [[Log sum exp trick]]. You are summing the determinants, and because we are working the log space that means multiplication. And that is what we want. right.


How you incorporate the sings. We cant' simply take the logarithm of the signs, because they can be -1.

And this is quite important for [[Permutation Equivariant Function]].