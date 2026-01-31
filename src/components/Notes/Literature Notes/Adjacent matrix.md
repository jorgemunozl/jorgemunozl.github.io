---
tags:
  - baby
author: Jorge
date: "2025-05-22 15:34"
---
Let $G$ be a [[Graph]] with $n$ vertices, the **adjacent** **matrix** (boolean) of $G$ notated as $M_{a}=[m_{ij}]$ (or $A[G]$) is defined as:
$$
m_{ij}=\begin{cases}
1, \text{if }(v_{i},v_{j})\in A  \\
0, \text{otherwise}
\end{cases}
$$
- So if the matrix has $n$ nodes $M_{a}$ is a square matrix $n\times n$
- $A$ has not ordered pairs so $M_{a}$ is a [[Symmetric matrix]].
- $m_{ii}=0$, if not exist a bucle on the node $i$.
Prop. The number of total path of length $r$ that met two point $v_{i},v_{j}$ is $[m_{ij}]^{r}$. Whit $M_{a}^{r}=[m_{ij}]^{r}$.
