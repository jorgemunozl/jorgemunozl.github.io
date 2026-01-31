---
tags:
  - baby
date: 2025-12-22 17:02
modified: 2025-12-22 17:08
---
>[!definition]
>We define the distribution over the [[Trajectory RL]] which is induced by a [[Policy RL]] $\pi$, and a **stochastic dynamics** $p$ as:

$$
p_{\pi}(\tau)=p(\mathbf{o}_{t})\prod_{t=0}^{T-1}\pi(a_{t}|o_{t})p(\mathbf{o}_{t+1}|\mathbf{o}_{t+1},\mathbf{a_{t}})
$$

Is interesting this term, it tell the probability of find us in a state $\mathbf{o}_{t+1}$, give a **action** $a_{t}$. Reflect well the randomness of more complicated environments. 
$$
p(\mathbf{o}_{t+1}|\mathbf{o}_{t+1},\mathbf{a_{t}})
$$