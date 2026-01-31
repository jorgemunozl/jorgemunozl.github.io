---
tags:
  - baby
date: 2025-11-09 11:09
modified: 2025-11-19 08:40
---
They use the follow form,
[^1]:

$$
\mathbb{E}_{p}(\mathbf{X})\left[ \frac{\partial \log p(\mathbf{X})}{\partial \text{vec}(\mathbf{W}_{\ell})}\frac{\partial \log p(\mathbf{X})^{\mathsf{\top}}}{\partial \text{vec}(\mathbf{W}_{\ell})} \right]\approx \mathbb{E}_{p(\mathbf{X})}[\mathbf{\hat{a}}_{\ell}\mathbf{\hat{a}_{\ell}}^{\mathsf{\top}}]^{-1}\otimes \mathbb{E}_{p(\mathbf{X})}[\mathbf{\hat{e}_{\ell}}\mathbf{\hat{e}}_{\ell}^{\mathsf{\top}}]^{-1}
$$
Where $\hat{\mathbf{a}}$ is the deviation: Why we would do that?

Implementaion :  [^2]

[^1]: [[A self attention ansatz for ab-initio quantum chemistry]] 
[^2]: Fermi Net (tf), wraps a KFCA library! `mean_corrected_kfca_opt.py`
