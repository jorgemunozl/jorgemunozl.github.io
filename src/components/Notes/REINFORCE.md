---
tags:
  - baby
date: "2026-01-06 16:49"
modified: 2025-08-06T23:12:25-05:00
---
You want to maximize:
$$ J(\theta)=\mathbb{E}_{\tau}[R(\tau)] $$


$$\mathcal{L}(\theta)= 2\mathbb{E}_{\mathbf{R}\sim \Psi^{2}}[ \underbrace{ (E_{L}(\mathbf{R})-\mathbb{E}_{p}[E_L]) }_{ \text{detach} }\log \psi]$$

Then you use the [[Log derivative trick]] for:

$$
\nabla_{\theta}J(\theta)=\mathbb{E}_{\tau \sim \pi}[({R(\tau)}-b)\nabla_{\theta}\log \pi_{\theta}(\tau)]
$$
