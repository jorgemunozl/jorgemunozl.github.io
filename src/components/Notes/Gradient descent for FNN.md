---
tags:
  - baby
date: 2025-10-08 17:24
modified: 2025-10-15 09:54
---
So we update the **weights and bias** using.



[[Loss function]]

$$
w^{l}_{jk}\to w^{l}_{jk}- \epsilon \frac{\partial \mathcal{L}}{\partial w_{jk}^{l}}
$$

$$
b^{l}_{j}\to b^{l}_{j}-\epsilon \frac{\partial \mathcal{L}}{\partial b^{l}_{j}}
$$

Using matrix notation.

$$
W^{(l)}\to W^{(l)}-\epsilon \frac{\partial \mathcal{L}}{\partial W^{(l)}}
$$

$$
b^{(l)}\to b^{(l)}-\epsilon \frac{\partial \mathcal{L}}{\partial b^{(l)}}
$$

How we obtain it? [[Backpropagation equations]]