---
date: 2024-11-30
tags: []
author: Jorge
title:
---
How we could think that any vector f $\in V$ could be expressed like the sum of n elements of subspace.
This motivates to create a projection for each for each [[Sub Vector Space]].

>[!note] Direct Sum of Subspaces
> $V=\oplus_{j=1}^n M_{j} \implies \forall f \in V: f =m_{1}+m_{2} +\cdots+m_{n}$
> We define $E_{Mj}: V \to V$ 
> $\qquad \qquad \quad \ \ f\mapsto E_{Mj}:=m_{j}$

This motivates two theorems (that I will use solving problems):

>[!success] Theorem
>Let E be a projector then in the vector space V then $V=ker(E)\oplus rank(E)$

 >[!success] Theorem
>Let $E_{1},E_{2},\dots,E_{n} \in \mathcal{H}$ be a operations of projections in the vector space V, $i \neq j\implies E_{i} \circ E_{j}=0$, then $V=\oplus_{j=1}^n M_{j}$


