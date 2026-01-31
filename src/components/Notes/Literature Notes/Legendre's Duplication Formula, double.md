---
date: 2024-11-13
tags:
  - atomic
  - baby
author: Jorge
modified: 2025-09-07 12:18
---
>[!proposition]
>Let $z$ be a complex, with $\mathfrak{R}(z)>0$, then:
>$$\Gamma(z)\Gamma(z+\frac{1}{2})=2^{1-2z}\sqrt{\pi}  \ \Gamma(2z)$$

- This formulate relates smoothly $z$ with $2z$
- When $z\in \mathbb{N}$, it's possible to obtain the [[Gamma Function]] of all the numbers like $3.5,4.5,32.5$.
- Exist one prove that use the [[Beta Function]].
- This formula can be seen as special case of the [[Gauss Multiplication Formula]] which is pretty.
- I recall that I struggle a few to search finds to prove this.
- Now this make think on [[value of the zeta function on the dot five]]
- Is related to [[Volume of n-ball boundary]].

- You can rewrite using the [[Double Factorial]], consider **even** and **odd**.
$$
\begin{align}
\Gamma\left( z+\frac{1}{2} \right) & =2^{1-2z}\sqrt{ \pi } 2^{z-1}(2z-1)!! \\
&=2^{-z}\sqrt{ \pi }(2z-1)!! \\
&=2^{-z}\sqrt{ \pi }1.3.5.7\dots (2z-1)
\end{align}
$$
I mean is very neat that form ,Which is very useful for [[Gaussian integrals]]