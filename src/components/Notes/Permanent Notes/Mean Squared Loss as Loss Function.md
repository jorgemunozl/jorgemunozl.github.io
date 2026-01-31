---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-24 10:50
modified: 2025-12-22 09:56
---
We have the training data set $\{ (\mathbf{x}_{i},f(\mathbf{x}_{i})) \}_{n}$ a [[Feed Forward Neural Network]] $\mathcal{F}$ parameterized by $\theta$.

Being formally:

$\mathcal{L}:\mathbb{R}^{n}\to \mathbb{R}$
$$ \mathcal{L}(x)=\frac{1}{n}\sum_{x}(f(x)-\hat{f}(x))^{2} $$
The **Mean Squared Error** (the [[Loss function]]) for this configuration is:


Is easy observe that our model is doing well if the output of these function is close to zero, if the number instead is a big number then we need to change in somehow the values for the parameters.

[[Mean Absolute Percentage Error MAPE]]
[[Least squares algorithm]]