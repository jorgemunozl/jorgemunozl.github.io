---
tags:
  - atomic
  - young
author: Jorge
date: 2025-02-02 09:00
modified: 2025-10-20 13:13
---

>[!tip] Formula
>$n \in \mathbb{N}$ y $a,b \in \mathbb{R}$ 
>$$(a+b)^{n}=\sum_{k=0}^{n} \binom{n}{k} a^{n-k}b^{k} $$

Now the beauty is that when you use $a=1$.
$$
(1+x)^{n}=\sum_{k=0}^{n}\frac{n!}{k!( n-k)!}
x^{k}$$
And when $x\approx0$, we only consider when $k=0,1$ so:
$$
(1+x)^{n}\approx1+nx
$$

That is the heart of the [[binomial expansion]]
And here the exponential could be any integer number.  I mean we need to look at the [[algebraic quotients]]

[[Newton Binomial Idea]]