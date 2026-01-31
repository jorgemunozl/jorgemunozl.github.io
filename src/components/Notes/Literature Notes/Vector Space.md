---
date: 2024-05-12 17:34
tags:
  - old
  - atomic
author: Jorge
modified: 2025-09-13 19:05
---
>[!definition]
A **vector** **space** is a 3-tuple $(V,+,\circ)$  that obeys a list of ten axioms. Where $V$ is a non-empty set, $\mathbb{F}$ a [[Field]] , $(+:(V,V)\to V)$ the **addition** and $(\circ:(\mathbb{F},V)\to V)$ the **product** [^1].

- To the **set** elements we refer as **_vectors_**, to the **_field_** scalars. 
- Any field $\mathbb{F}$ could form a $\mathbb{F}$ _vector space_.[[Algebraic Structure]]
- Instead of writing the ten axioms, we can simply say that $(V,+)$  forms an [[Abelian group]] ,the operators are **closed**, and the $\mathbb{1}$ $\in F$ works well for vectors and:
$$
\begin{align}
\lambda \circ (u+v)&=\lambda  \circ u  + \lambda \circ v \\
(\lambda +_{F} \beta) \circ v &= \lambda \circ v + \beta \circ v \\
\lambda \circ (\beta \circ v) &= (\lambda \times_{F} \beta) \circ v
\end{align}
$$


[[vectorSpacesAcuña.png]]

[^1]:	[[Linear Algebra Done Right]] pp. 12
