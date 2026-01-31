---
tags:
  - baby
author: Jorge
date: "2024-04-30 10:30"
modified:
---

A **random variable** is a function $X$ that takes elements from the sample space and take it to the **target space** $\mathcal{T}$, this **target space** is the set of the quantity of interest, so is a subset of $\mathcal{A}$.
Toy example!
Let $\Omega$ be the set of all the states that throw two coins can be, and the let $\mathcal{T}$ be number of of heads. So is clear that $\Omega=\{ hh,ht,th,tt \}$ where $t\text{:tails}$ and $h\text{:heads}$, now the random $X:\Omega\to \mathcal{T}$ is:
$$
X(hh)=2,X(ht)=X(th)=1,X(tt)=0
$$
So is clear that $\mathcal{T}=\{ 0,1,2 \}$.
Realize that this random variable is well defined once that the **target space** is well defined.
Let's say that we want to know the numbers of hours studied for a student so:
$$
X(\text{David})=2
$$
So the event space are all the students, is the target is the numbers of hours studied.