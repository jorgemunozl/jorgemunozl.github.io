---
tags:
  - baby
author: Jorge
date: 2025-08-10 15:17
modified: 2025-09-09 12:57
---

>[!definition]
Let $f:[a,b]\to \mathbb{R}^{n}$ be a [[Vector function over a real variable|function]], let $p$ be a [[Partition for a one dimension function|partition]] $P=\{ t_{i}|i=0,\dots,k \}$ of $[a,b]$, this define a  **polygon** and its arc is simply : 
>$$ \ell(f,p)=\sum_{i=1}^{n}\lVert f_{i}-f_{i-1} \rVert  $$
- This **poligon** remind us to the [[Bézier Curve]].
- We say that a curve is _rectifiable_ if the set $A=\{ \ell(f,p)|p \in \mathcal{P} \}$ have upper bound. 
- Here the about the [[Refinement]] also it's also fulfilled (You just add dimensions)
- Let be $\mathcal{P}$ the set of all the [[Partition]] over the domain, if the set is bounded then it has [[Supreme and Infimum|supremum]], this last is called **lenght**.
