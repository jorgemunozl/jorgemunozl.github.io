---
tags:
  - baby
author: Jorge
date: 2025-09-12 13:02
modified: 2025-10-20 18:47
---
Give it a [[Partial Differential Equation, what are|partial differential equation]], if we plug our [[Neural Network]] then:
$$ f\left( x,t,\frac{\partial \hat{y}}{\partial x},\frac{\partial\hat{y}}{\partial t},\dots \right)\neq 0 $$

[[minimazing the loss function]].
[[Loss functions for PINNS]]
[[Collocation Points for Train a PINN]]
[[Loss function]]
[[PINNS]]
[[A comprenhesive analysis of PINNS]]

$$
\begin{align}
\mathcal{L}_{f}(\theta) & =\frac{1}{N_{f}}\sum_{i}^{N_{f}} \left\lVert  f\left( x_{i},t_{i},\frac{\partial \hat{y}}{\partial x},\frac{\partial \hat{y}}{\partial t},\dots \right)  \right\rVert ^{2}_{2} \\ 
\mathcal{L_{ic}}(\theta) & = \frac{1}{N_{ic}}\sum_{i}^{N_{ic}} \lVert \hat{y}(x_{i},t_{0})-h(x_{i}) \rVert ^{2}_{2} \\
\mathcal{L}_{bc}(\theta) & =\frac{1}{N_{bc}}\sum ^{N_{bc}}_{i} \lVert \hat{y}(x,t)-g(t) \rVert^{2}_{2} 
\end{align}
$$
