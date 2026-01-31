---
tags:
  - baby
author: Jorge
date: 2025-03-26 23:59
modified: 2025-08-26 12:39
---
>[!definition]
>Let be $V_{1},V_{2},\dots,V_{k}$ and $W$ [[Vector Space]] over the same [[Field]] $\mathbb{F}$. A map: [^1]
>$$ T:V_{1}\times V_{2}\times \dots \times V_{k}\to W $$
>Is multilinear if satisfies the [[Being linear, belong to the same space after operations|linearity]] in each argument, this is like being a [[Linear Map]] in an entrance $i$. Specifically
>$$
\begin{align}
T(v_{1},\dots,v_{i}+v_{j},\dots,v_{k})&=T(v_{1},\dots,v_{i},\dots,v_{k})+T(v_{1},\dots ,v_{j},\dots,v_{k}) \\
T(v_{1},\dots,av_{j},\dots,v_{k}) & = aT(v_{1},\dots,v_{j},\dots,v_{k})
\end{align} $$

- And if you observe more clearly is basically the linear map, but trying to generalize it (And for some reasons lead to tensor algebra.) Since what is the "matrix" related to this! 
 - When $W$ is equal to $\mathbb{F}$ the field, we call it a [[Multilinear Function]].
- Se dice que uno de estos es universal si para definimos una de estos, y eligimos cual otro existe un [[Linear Map]] tal que existe una [[composition]]. 

[^1]: [[Linear Algebra and Geometry Manim]] pp. 
