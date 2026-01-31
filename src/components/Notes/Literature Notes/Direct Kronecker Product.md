---
tags:
  - baby
date: 2025-10-11 11:25
modified: 2025-11-11 07:52
---
You have two matrices: $A$ and $B$, the **Kronecker product**. Is: [^1]

$$
A=\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
$$

$$
A\otimes  B=\begin{bmatrix}
a_{11}B & a_{12}B \\
a_{21} B& a_{22}B
\end{bmatrix}
$$

- What about the shapes and dimensions?
- And there is one important property: Useful when [[Tensor product Inner Product]]
$$
A\otimes B[v\otimes w]=[Av]\otimes [Bw]
$$
Where $v$ and $w$ lives on the same dimension of $A$ and $B$ respectively.
- There is any relation with the [[outer product]].

[^1]: [[Mathematical Methods for Physicist]] pp. 194
