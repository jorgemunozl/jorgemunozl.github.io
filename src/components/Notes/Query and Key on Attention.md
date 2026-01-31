---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-08 09:55
modified: 2025-10-19 15:45
---
>[!definition]
> The **key** and **query matrices** are [[Tensor - Computation|tensors]] that are obtained in the [[Training Phase LLM|training phase]]. They are implicit on a [[Feed Forward Neural Network]]. [^1]

To resolve the [[Context Problem]] we have:
- Let $\mathbf{h}_{t}\in \mathbb{R}^{d}$ be the **hidden state**, $d$ the [[Embedding dimension]].
- Let $W_{K},W_{V},W_{Q}\in \mathbb{R}^{d_{h}n_{h}\times d}$, where $d_{h}$ is the **head dimension** and $n_{h}$ the **number of heads**.
- Obtain the $q_{t},k_{t},v_{t}\in \mathbb{R}^{d_{n}n_{h}}$ via matrix multiplication.
- Thus we slice these in $n_{h}$ parts in such a way:
$$
\begin{align}
[\mathbf{q_{1},q_{2},\dots ,q_{n_{h}}}]=\mathbf{q} \\
[\mathbf{k_{1},k_{2},\dots ,k_{n_{h}}}]=\mathbf{k} \\
[\mathbf{v_{1},v_{2},\dots ,v_{n_{h}}}]=\mathbf{v}
\end{align}
$$
- And apply the [[Self attention mechanism on one head]]
- Conceptually the [[Query and key Idea]]
[[Cross attention]]



[^1]: [[DeepSeek-V2 A Strong, economical, and efficient Mixture of Expert Language Model]] pp. 6