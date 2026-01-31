---
tags:
  - baby
author: Jorge
date: 2025-09-16 06:22
modified: 2025-09-18 17:30
---
[[Dirichlet condition heat equation one dimension]]
[[Neumann condition zero heat equation one dimension]]

[[Implementing PINNS residual]]

Give it the [[Differential Equation]]:
$$
u_{t}(x,t)=\alpha u_{x x}(x,t)
$$

Using the Neumann Condition: $u_{x}(0,t)=0\land u_{x}(L,t)=0$

$$ u(x,t)=a_{0}+\sum_{n=1}^{\infty}a_{n}\cos\left( \frac{n\pi x}{L} \right)e^{ -\alpha (n\pi/L)^{2}t}, n\in \mathbb{N} $$
$$
a_{0}=\frac{1}{L}\int_{0}^{L}f(x)dx
$$

$$
a_{n}=\frac{2}{L}\int_{0}^{L}f(x)\cos\left( \frac{n\pi x}{L} \right)dx
$$

$$
f(x)=(3x^{2}-8x-16)e^{ -0.5x }
$$
$$L=\frac{20}{3}$$

Using the Dirichlet Condition: $u(0,t)=0\land u(L,t)=0$
$$
u(x,t)=\sum_{n=0}^{\infty}b_{n}\sin\left( \frac{n\pi}{L}x \right)e^{ -\alpha(n\pi/L^{2})t }
$$
$$ b_{n}=\frac{2}{L}\int_{0}^{L}f(x)\sin\left( \frac{n\pi x}{L} \right)dx $$
$$
f(x)=arctg(0.1x)\sin(x)
$$
$$
L=4\pi
$$



