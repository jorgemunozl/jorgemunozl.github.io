---
tags:
  - baby
date: 2025-10-07 21:06
modified: 2025-10-15 17:23
---
Using matrix notation we have the following claims. [^1]

Now what about [[Automatic Differentiation]]

$$
\mathbf{z}^{(l)}=\mathbf{W}^{(l)}\mathbf{a}^{(l-1)}+\mathbf{b}^{(l)}
$$


Define the value:
$$
\delta ^{l}_{j}=\frac{\partial \mathcal{L}}{\partial z_{j}^{l}}
$$

For [[Mean Squared Loss as Loss Function]] : $\nabla_{\mathbf{a}^{(L)}}\mathcal{L}=2(f(\mathbf{x}_{i})-\mathbf{a}^{L}(\mathbf{x}_{i}))$

I don't get it

$$
\begin{align}
\delta ^{L} & =\nabla_{\mathbf{a}^{(L)}}\mathcal{L} \odot \sigma'(z^{L}) \\
\delta ^{l} & =((\mathbf{W}^{l+1})^{T}\delta ^{l+1}\odot \sigma'(\mathbf{z}^{l})) \\
\frac{\partial \mathcal{L}}{\partial b^{l}_{j}} & =\delta ^{l}_{j} \\
\frac{\partial \mathcal{L}}{\partial w^{l}_{jk}} &  =a_{k}^{l-1} \delta ^{l}_{j}
\end{align}
$$

Thus we can apply [[Gradient Descent for Neural Networks]] or 

[^1]: [[Neural Networks and Deep Learning]] pp. 55
