---
tags:
  - baby
date: 2026-01-11 11:27
modified: 2026-01-11 21:55
---
Just:
$$
\mathcal{L}_{\theta}=\mathbb{E}_{\mathbf{R}\sim |\psi_{\theta}|^{2}}[E_{L}(\mathbf{R})]
$$
When:
$$
\nabla_{\theta} \mathcal{L}_{\theta}=\nabla_{\theta}\int E_{L}(\mathbf{R})C |\psi_{\theta}|^{2}d\mathbf{R}=\int\nabla_{\theta}[ E_{L}(\mathbf{R})C |\psi_{\theta}|^{2}]d\mathbf{R}
$$

$$
=\int\nabla_{\theta}[ E_{L}(\mathbf{R})]C |\psi_{\theta}|^{2}d\mathbf{R}+\int E_{L}(\mathbf{R})\nabla_{\theta} C |\psi_{\theta}|^{2}]d\mathbf{R}
$$

Which matter is:
$$
\nabla_{\theta}[E_{_{L}}(\mathbf{R})]=\nabla _{\theta}\left[ \frac{\nabla^{2}\psi_{_{\theta}}}{\psi _{\theta}}+V \right]
$$

Which finally:
$$
\frac{\nabla_{\theta}(\nabla^{2}_{\mathbf{R}}\psi_{\theta}[\mathbf{R}])\psi_{\theta}(\mathbf{R})-\nabla^{2}_{\mathbf{R}}\psi_{\theta}[\mathbf{R}]\nabla_{\theta}(\psi_{\theta}[\mathbf{R}])}{\psi^{2}_{\theta}}
$$