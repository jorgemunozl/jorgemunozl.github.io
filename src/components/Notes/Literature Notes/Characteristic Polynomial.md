---
date: 2024-11-23 10:43
tags:
  - baby
  - atomic
author: Jorge
modified: 2025-10-13 08:38
---
>[!definition]
>Give it a [[Linear Operator]] and a [[Basis Of A Space Vector (Hamel)|basis]] where represented it, when we solve the determinant we obtain the [[EigenValues]], appears a [[Polynomial]] with variable $\lambda$. This is the **characteristic polynomial**.  [^1]
>$$ p(z)=(z-\lambda_{1})^{d}\dots(z-\lambda_{n})^{d_{n}} $$
> Where $d_{n}$ denotes the [[Geometric Multiplicity]]

- Use the form $p(\lambda)=\det(T-I\lambda)$ could be tricky.

The _characteristic equation_ is: $p(\lambda)=0$.

For a $T \in \mathcal{M}_{2\times 2}$.

$$
p(\lambda)=\lambda ^{2}-\lambda Traza(T)+\det(T)
$$

For $T\in \mathcal{M_{n\times n}}$.

The coefficient of $\lambda ^{n-1}$ in $p_{t}(\lambda)$ is $-\mathrm{Tr}(T)$ and the constant term is $\det(T)$.

Now the question is if all [[Polynomial]] is a characteristic polynomial from a matrix, the question is yes in the complex ([[Fundamental Theorem of Algebra]]) and in the real case we know that every could polynomial could be expressed like the product of polynomial of grade two and one..

 [[Minimal Polynomial]]. 

[^1]: [[Linear Algebra Done Right]] pp. 325
