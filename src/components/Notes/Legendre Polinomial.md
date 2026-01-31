---
tags:
  - baby
author: Jorge
date: 2025-09-07 12:30
modified: 2025-10-14 09:23
---
Well there exist a motivation that you can find on Electricity and from there you arrive to the follow differential equation. [^1] 

$$
\frac{d}{dx}\left[ (1-x^{2})\frac{dPn}{dx} \right] + n(n+1)P_{n}(x)=0, n\in \mathbb{N}_{0}
$$

- You can prove easily that for the norm $\langle , \rangle=\int_{-1}^{1}$ the polynomials are **orthogonal**.
- It have interesting properties. But we care about the solutions.
The recurrence relation is:

With $P_{0}(x)=1,P_{1}(x)=x$

$$
(n+1)P_{n+1}(x)=(2n+1)xP_{n}(x)-nP_{n-1}(x)
$$

Using:
$$
P_{n}(x)=\frac{1}{2^{n}n!}\frac{d^{n}}{dx^{n}}(x^{2}-1)^{n}
$$
And:

$$
(1-x^{2})P'_{n}(x)=n(P_{n-1}(x)-xP_{n}(x))
$$
And that's it, you obtained it.


[[Associated Legendre Functions]]


[^1]: [[Mathematical Methods for Physicist]] pp. 755 , pp. 764
