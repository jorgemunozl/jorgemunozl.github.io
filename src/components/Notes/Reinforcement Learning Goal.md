---
tags:
  - baby
date: 2025-12-22 16:20
modified: 2025-12-23 07:12
---
In [[Reinforcement Learning]] you want a policy to maximize your [[Reward Function]], how formalize this:
$$
\mathcal{J}(\pi)=\mathbb{E}_{\tau \sim \rho_{\pi}}[R(t)]
$$
Where $p_{\pi}(\tau)$, $\tau$ the [[Trajectory RL]], is [[Distribution over Trajectories]]
First how you compute your reward? First you need a type of error.

How this is related to, try to maximize the expression:

$$
\max_{\theta}\; \mathbb{E}_{(a_{t:t+H},\,o_t,\,\ell)\sim \mathcal{D}}
\left[\log\!\left(\pi_{\theta}\!\left(a_{t:t+H}\mid o_t,\,\ell\right)\right)\right].
$$


