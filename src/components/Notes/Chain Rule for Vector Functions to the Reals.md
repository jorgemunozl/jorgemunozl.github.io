---
tags:
  - baby
date: 2025-10-16 10:05
modified: 2025-10-16 10:36
---
Let's say that you a [[Vector Function]] $g:\mathbb{R}^{m}\to \mathbb{R}^{n}$ and a [[Scalar function]] $f:\mathbb{R}^{n}\to \mathbb{R}$.
Let $\mathbf{x}\in \mathbb{R}^{m}$ and $\mathbf{y}=g(\mathbf{x})$ and $z=f(\mathbf{y})$.

>[!theorem]
>You demonstrate using the Taylor Expansion that:
>$$ \frac{\partial z}{\partial x_{i}}=\sum_{j}\frac{\partial z}{\partial y_{j}}\frac{\partial y_{j}}{\partial x_{i}} $$

Using **vector** notation to obtain all.
$$ \nabla_{\mathbf{x}}z=\left( \frac{\partial \mathbf{y}}{\partial \mathbf{x}} \right)^{T}\nabla_{\mathbf{y}}z $$

- Where the matrix $\frac{\partial \mathbf{y}}{\partial \mathbf{x}}$ is the [[Jacobian Matrix]]