---
tags:
  - baby
author: Jorge
date: 2025-09-18 17:25
modified: 2025-10-04 10:16
---
Using the Neumann Condition: $u_{x}(0,t)=0\land u_{x}(L,t)=0$

$$ u(x,t)=a_{0}+\sum_{n=1}^{\infty}a_{n}\cos\left( \frac{n\pi x}{L} \right)e^{ -\alpha (n\pi/L)^{2}t}, n\in \mathbb{N} $$
$$
a_{0}=\frac{1}{L}\int_{0}^{L}f(x)dx
$$

$$
a_{n}=\frac{2}{L}\int_{0}^{L}f(x)\cos\left( \frac{n\pi x}{L} \right)dx
$$

And for **Neumman**:
$f(x)=10(x-x^{2})^{2}$
$L=1$

I mean works well with this Initial Condition but the error seems large. But yeah if you shift the $f(x)$ then you have to deal with Gradients that tend to zero or infinite.