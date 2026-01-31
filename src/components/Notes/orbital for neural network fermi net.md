---
tags:
  - baby
date: 2025-10-27 08:55
modified: 2025-11-01 15:48
---
We start with a finite set of one-electron orbitals $\{ \phi_{i}\}_{i}$

>The FermiNet wave function goes much further, replacing the one-electron orbitals $\phi_{i}^{k}(\mathrm{x}_{j})$ by functions of $3n$ independent variables. Every “orbital” in every determinant now depends both on $x_{j}$ and (in a general symmetric way) on the position and spin coordinates of every other electron.


So we are going to using it [^1]:

$$
\sum_{\mathcal{P}}\text{sign}(\mathcal{P})\prod_{i}\phi_{i}^{k}(\mathbf{x}_{\mathcal{P}_{i}})=\begin{vmatrix}
\phi_{1}^{k}(\mathbf{x}_{1})  & \dots  &  \phi_{1}^{k}(\mathbf{x}_{n}) \\
\vdots   &  & \vdots  \\
\phi_{n}^{k}(\mathbf{x}_{1}) & \dots & \phi_{n}^{k}(\mathbf{x}_{n})

\end{vmatrix}=\det[\phi_{i}^{k}(\mathbf{x}_{j})]=\det[\Phi ^{k}]
$$

But what is a orbital, they come from the [[hidrogen atom schrodinger equation solution]]? 

In practice we have:

$$ \phi ^{k\alpha}_{i}(\mathbf{r}^{\alpha}_{j};\{ \mathbf{r}^{\alpha}_{/j} \};\{ \mathbf{r}^{\bar{\alpha}} \})=(\mathbf{w}^{k\alpha}_{i}\cdot \mathbf{h}^{L\alpha}_{j}+g^{k\alpha}_{i})\sum_{m}\pi_{im}^{k\alpha}\exp\left( -\left\lvert \Sigma _{im}^{k\alpha}(\mathbf{r}^{\alpha}_{j}-\mathbf{R}_{m})\right\rvert  \right) $$

[[Obtaining the orbital fermi net flow]]

Where $\bar{\alpha}$ is $\downarrow$ if $\alpha$ is $\uparrow$ or vice versa, $\mathbf{h}_{j}^{L\alpha}$ is an output from the $L\text{-th}$ (final) layer of the intermediate single-electron features networks.

$\mathbf{w}_{i}^{k\alpha}$ are the weights , $(g_{i}^{k\alpha})$ are the biases. For the determinant $k$.

$\pi_{im}^{k\alpha}$ learned parameters and $\Sigma_{im}^{k\alpha}\in \mathbb{R}^{3\times3}$ control the deca.

[^1]: [[Ab Initio Solution of the Many Electron Schrodinger Equation with Deep Neural Networks]]
