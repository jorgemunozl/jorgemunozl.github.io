---
tags:
  - baby
date: 2026-01-14 11:33
modified: 2026-01-14 11:45
---
>[!definition]
>A matrix is called singular if the [[Determinant of a matrix]] is equal of zero.

The question relevant for us is what about [[Singular Value Descomposition]].
Let $A$ be a singular matrix:
$$
A=U\Sigma V^{\mathsf{\top}}
$$
Apply the $\det$ op:
$$
0=\det(U)\det (V)\det(\Sigma)
$$
Since $\Sigma$ is a diagonal matrix then at least one value of the diagonal should be zero. 

[[Cofactor Singular Matrix]]