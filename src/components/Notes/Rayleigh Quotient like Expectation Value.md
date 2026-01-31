---
tags:
  - baby
date: 2025-10-24 07:32
modified: 2025-11-16 10:18
---




$$
\mathcal{L}_{\theta}=\frac{\bra{\psi_{\theta}} H\ket{\psi_{\theta}} }{\braket{ \psi  | \psi } }
$$

The denominator is:
$$
p_{\theta}(x)=\frac{\Psi^{2}_{\theta}(x)}{\int dx'\Psi^{2}_{\theta}(x')}
$$
$$
\mathcal{L}_{\theta}=\frac{\int dx\Psi^{*}_{\theta}(x)\hat{H}\Psi_{\theta}(x)}{\int dx\Psi^{2}(x)}=\int dx\frac{\Psi^{*}_{\theta}(x)}{\int dx'\Psi^{2}_{\theta}(x')}\left( \frac{\Psi_{\theta}(x)}{\Psi_{\theta}(x)} \right)\hat{H}\Psi_{\theta}(x)
$$
$$
\mathcal{L}_{\theta}=\int p_{\theta}(x)\Psi_{\theta}^{-1}(x) { \hat{H}\Psi_{\theta}(x)}dx
$$
$$
\mathcal{L}_{\theta}=\int p_{\theta}(x)E_{L}(x)dx
$$

Defining the Local Energy:

See it like a distribution probability:
$$
E_{L}(x)=\Psi ^{-1}_{\theta}(x)\hat{H}\Psi_{\theta}(x)
$$

$$
\mathcal{L}_{\theta}=\mathbb{E}_{x\sim \Psi^{2}_{\theta}}[E_{L}(x)]
$$

[[Gradient Rayleigh Montecarlo]].

