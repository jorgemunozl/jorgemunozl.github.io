---
date: 2024-11-04
modified: 2025-08-10 14:34
tags:
  - baby
  - atomic
author: Jorge
---
**Integral version**
- If $f$ and $g$ are well defined in $<-\infty,+\infty>$ [^1].
$$
(f*g)(t)=\int_{-\infty}^{\infty} f(\tau)g(t-\tau) \, d\tau 
$$
- If $f$ and $g$ are only well defined in $<0,+\infty>$, (used obligated when [[Convolution Theorem - Faltungs]])
$$(f*g)(t)=\int_{0}^{t} f(\tau)g(t-\tau) \, d\tau$$
- **Discrete version** [^2].
$$
(f*g)(t)=\sum_{m=-\infty}^{\infty} f[m]g[t-m] 
$$
- We can think of like a one $1D$ convolution.
- Now if we expand the function $f$ for being a [[Scalar function]] then we is natural to think on a n-integral. [[convolution in more dimensions]]

$\boldsymbol{\phi}$

[^1]: [[Mathematical Methods for Physicist]] pp. 964
[^2]: [[Deep Learning]] pp. 347
