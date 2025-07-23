---
tags:
 - baby
 - ml
author: Jorge
date: "2025-02-08 09:55"
---
>[!definition]
>

>The **key** and **query** are [[Tensor - Computation|tensors]] that are obtained in the [[Training Phase LLM]]

- Well the matrix is the one 

To resolve the [[Context Problem]] we have:
1. The **query vector** is $\mathbf{q}=W_{Q}\mathrm{x}$, where $\mathrm{x}$ is a token and the $W_{Q}$ is the **query matrix** obtained by training.
2. The **key vector** is $\mathbf{k}=W_{K}\mathrm{x}$, $W_{K}$ the **key matrix**. 
Where $\mathrm{x}\in \mathbb{R}^{d}$, $d$ the [[Embedding dimension]] , and $W_{K},W_{Q}\in \mathbb{R}^{d_{h}n_{h}\times d}$, where $d_{h}$ is the head dimension and $n_{h}$ the quantity of dimension, thus $\mathbf{q,k}\in \mathbb{R}^{d_{h}n_{h}}$
Thus we slice these in $n_{h}$ parts in such a way:

$$
[\mathbf{q_{1},q_{2},\dots ,q_{n_{h}}}]=\mathbf{q}
$$

[[Query and key Idea]]
[[Cross attention]]
$$
[\mathbf{k_{1},k_{2},\dots ,k_{n_{h}}}]=\mathbf{k}
$$
**Ref**. [[DeepSeek-V2 A Strong, economical, and efficient Mixture of Expert Language Model]] pp. 6


