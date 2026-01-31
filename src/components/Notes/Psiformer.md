---
tags:
  - baby
date: 2025-10-30 19:17
modified: 2026-01-23 09:13
---
- Is a specific [[Neural Wave Functions]] with an architecture based on [[Transformer]].
- So here we use an [[Psi Former Ansatz]], and improve that ansatz using [[Psi former Attention Mechanism]].
- [[Psiformer determinant]]
- For us, it's important to mention that we are always working in the $\log$ space. Because it's more numerically stable.
- [[Psiformer Why Not Complex]]
- But that how it works in practice? You assume that your model is on the log space. What is the consequence of doing this over all the operations that you make?
- It's like apply a log to everything, and you make something like:
$$
\text{model}=\log \psi
$$
$$
\mathcal{L}_{\theta}=\mathbb{E}_{x\sim Cp_{\theta}}[E_{L}(x)]\approx \frac{1}{M}\sum_{i=1}^{M} E_{L}(\mathbf{R}_{k})
$$

$$
\Psi_{\theta}(\mathbf{x}) = \exp\big(\mathcal{J}_{\theta}(\mathbf{x})\big)\sum_{k=1}^{N_{\det}}\det[\boldsymbol{\Phi}^{k}_{\theta}(\mathbf{x})]
$$

[[Laplacian]]
Is a specific type of architecture based on [[Transformer]].
So here we use an [[Psi Former Ansatz]], and improve that ansatz using [[Psi former Mechanism Attention]]
[[Zettelkasten/Psiformer]]