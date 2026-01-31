---
tags:
  - baby
date: 2025-10-19 17:26
modified: 2025-11-19 08:54
---
**KFCA**.
[[second order methods]], leverage the curvature information rather than first order approximations.

This is somehow related to [[Natural Gradient Descent]]

Find the [[Fisher Information Matrix]] becomes very hard for that matter we have two approximations.

1. $\mathcal{F_{ij}}$ are assumed to be zero when $\theta_{i}$ and $\theta_{j}$ are in different layers of the network.
2. The other approximation is the follow:
$$
\mathbb{E}_{p(\mathbf{X})}\left[ \frac{\partial \log p(X)}{\partial \text{vec}(\mathbf{W}_{\ell})}\frac{\partial \log p(X)}{\partial \text{vec}(\mathbf{W}_{\ell})}^{\mathsf{T}} \right]=\mathbb{E}_{p(\mathbf{X})}[(\mathbf{a}_{\ell}\otimes \mathbf{e}_{\ell})(\mathbf{a}_{\ell}\otimes \mathbf{e}_{\ell})^{\mathsf{T}}]
$$

This is because:

Approx:
$$
\mathbb{E}_{p(\mathbf{X})}[(\mathbf{a}_{\ell}\otimes \mathbf{e}_{\ell})(\mathbf{a}_{\ell}\otimes \mathbf{e}_{\ell})^{\mathsf{\top}}]^{-1}\approx \mathbb{E}_{p(\mathbf{X})}[\mathbf{a}_{\ell}\mathbf{a_{\ell}}^{\mathsf{\top}}]\otimes \mathbb{E}_{p(\mathbf{X})}[\mathbf{e}_{\ell}\mathbf{e}_{\ell}^{\mathsf{\top}}]^{-1}
$$
[[KFCA for FermiNet]]


