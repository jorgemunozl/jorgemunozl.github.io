---
tags:
  - baby
author: Jorge
date: "2025-08-01 17:35"
---
>[!definition]
>A **random variable** is a function $X$ that takes elements from the sample space $\Omega$ and take it to the  [[Target space]] $\mathcal{T}$ [^1]. However this is a feature from the sample space, "count the heads".

#### Toy example!
Let $\Omega$ be the set of all the states that throw two coins can be, and the let $\mathcal{T}$ be number of of heads. So is clear that $\Omega=\{ hh,ht,th,tt \}$ where $t\text{:tails}$ and $h\text{:heads}$, now the random variable $X:\Omega\to \mathcal{T}$ is:
$$
X(hh)=2,X(ht)=X(th)=1,X(tt)=0
$$
So is clear that $\mathcal{T}=\{ 0,1,2 \}$.

Realize that this random variable is well defined once that the **target space** is well defined.
Let's say that we want to know the numbers of hours studied by a student so:
$$
X(\text{David})=2
$$
So the sample space $\Omega$ are all the students, the target space is the numbers of hours studied. Look at the first example one can begin to talk of [[probability|probabilities]].

[^1]: [[Mathematics for Machine Learning]] pp. 183
