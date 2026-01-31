---
tags:
  - baby
author: Jorge
date: 2025-02-07 11:40
modified: 2025-12-09 17:52
---
>[!definition]
> The **soft-max function** is a [[Vector Function]] defined by [^1]:
>$$\text{softmax}(\mathbf{x})_{i}=\frac{e^{ \mathbf{x}_{i} }}{\sum_{j}e^{\mathbf{x}_{j} }} $$

- In general, we use a positive a parameter $(T)$ called _temperature_ greater than zero.
- Why temperature, when its cold result a sharper distribution.
- Hotter more uniform output distribution. 
- The question of the name and the [[SoftPlus function]]
$$
P(x)_{i}=\frac{e^{ x_{i}/T }}{\sum_{j}e^{ x_{j}/T }}
$$

If $T$ is in $<0,1>$ 

If $T\geq{1}$

And if $T<0$ 

[^1]:  [[Neural Networks and Deep Learning]]
