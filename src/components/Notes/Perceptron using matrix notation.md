---
tags:
  - baby
date: 2025-10-07 20:16
modified: 2025-10-08 11:57
---
Let be the input $a^{l}_{j}$.

We have the input layer: $a^{1}$

The correspondent $W^{l}$ and the bias layer $b^{l}$

When we have a single output.

$$
z=\sum w_{i}a_{i} +b
$$

When we have more that one output:
$\{$
$$
a^{l}_{j}=\sum _{k}^{n}w^{l}_{jk}a^{l-1}_{k}+b^{l}_{j}
$$

Where $w_{jk}$ where the $k$ belongs to the $l-1$ and $j$ belong to $l$.layer and $l$ to the $l$ layer.

And using matrix notation we simply write.

$$
a^{l}=w^{l}a^{l-1}+b^{l}
$$