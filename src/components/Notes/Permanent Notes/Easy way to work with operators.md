---
tags:
  - baby
author: Jorge
date: 2025-02-04 08:20
modified: 2025-09-13 19:21
---
The [[diagonal matrix]] are most easy way to work with matrices, so we want to work with them every time is possible. So let's imagine that exist a [[Basis Of A Space Vector (Hamel)|base]] $\beta=\{ e_{i} \}$where the [[Linear Operator]] $T$ is written like one of those. This is:

$$
[T]_{\beta}=\begin{pmatrix}
\lambda_{1} & 0 \\
0 & \lambda_{2}  
\end{pmatrix}
$$

- Then $[T]_{\beta}[e_{i}]=\lambda_{i}[e_{i}]$; so if we want to work with this easy form, we need to find that **base**. (Spoilers coming) That basis is the formed by the [[Eigenvector]].
- For that reason with define the [[EigenValues]]. (Or it would exist another reason, I would like that).
- When working with [[Linear Map]] we can't secure that the matrix is square, and I don't know if the pseudo diagonal matrix form is useful.
- We can always find that matrix form? Not some [[Criterions For Diagonalization|criterions]] are necessary. 



Now, from these we could create the linear map $T-\lambda I$, we want to that for certain vector ([[Eigenvector]]) the result of apply this linear map gives zero (of course the zero of the respective vector space). What must happen for that to happen? First if that happen then thehas more vector than zero, then the map couldn't be injective and determinant of the matrix is zero. This is:


>[!note] Comment
An interesting thing of eigenvalues is that they work such the representative values of of the matrix in question. Find them tell and use it tells a lot about the matrix in question. 


[[eigenvalues hamiltonian matrix]]
