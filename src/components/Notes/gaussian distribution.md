---
tags:
  - baby
author: Jorge
date: 2025-08-12 14:12
modified: "{{2amt2:2025-12-02}} {{2amt2:06:47}}"
---
So this is one of the most important topics of statistics.
In a $n$ dimension:

$$
p(\mathbf{x})=\frac{1}{\sqrt{ (2\pi)^{n}\det \Sigma }}\exp\left( -\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^{\mathsf{\top}}\Sigma ^{-1}(\mathbf{x}-\boldsymbol{\mu}) \right)
$$

If $\boldsymbol{\mu}=0$ and $\Sigma=\sigma^{2} I$ then you have a Symmetric Gaussian. And $\sigma=1$, let's called Normal. [^1]

[^1]: [[Mathematics for Machine Learning]] pp. 204
