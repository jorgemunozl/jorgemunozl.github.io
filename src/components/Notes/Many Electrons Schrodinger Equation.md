---
tags:
  - baby
date: 2025-10-15 20:15
modified: 2025-10-26 16:42
---
>[!proposition]
If you have an [[Atom]] with $n$ [[Electron]] the equation which describe it fully is: [^1]  [^2]
$$ \hat{H}\psi(\mathbf{x}_{0},\dots ,\mathbf{x}_{n})=E\psi(\mathbf{x}_{1},\dots ,\mathbf{x}_{n}) $$
With: 
$$ \hat{H}=-\frac{1}{2}\sum \nabla^{2}+\sum \frac{1}{\lvert r_{i}-r_{j} \rvert }-\sum \frac{Z_{I}}{\lvert r_{i}-R_{I} \rvert }+\sum \frac{Z_{I}Z_{J}}{\lvert R_{i}-R_{j} \rvert } $$
Being $\mathbf{x}_{i}$ the position of the $i$ electron, $r_{i}$ the distance, $Z_{I }$ the [[atomic number]] of a proton and $R_{I}$ the distance from a reference frame to a proton, $\hat{H}$ is the [[Hamiltonian Operator]] and $E$ is the [[energy for schrodinger equation]].



- Once that you understand the [[Time Independent Schrödinger Equation]], [[Hartree Methods]]
- Where $\mathbf{x}_{i}=\{ \mathbf{r}_{i},\sigma_{i} \}$ is clear that $\mathbf{r}$ are the coordinates who belong to $\mathbb{R}^{3}$ and $\sigma_{i}\in \{  \uparrow,\downarrow \}$.
- This thing should obbey [[Fermi Dirac Statistics]] this is if you permutate two $\mathbf{x}$ the [[Wave Function]] becomes antysimmetric.
 - [[Approximation for the Many Electron Schrodinger Equation]].
- Which represent the spin. [[spin quantum mechanics]].
- We are going to work on top of the approximations.
- [[Kato Cusp Conditions]]
- So first we are going to continuous the approximation that make in that paper. 
- I have two paths, or I make the code to implement from scratch, or I use the code of them, understand it, and make a work on top of it. Is hard.

[^1]: [[Quantum Mechanics Zettili]] pp.455

[^2]: [[Ab Initio Solution of the Many Electron Schrodinger Equation with Deep Neural Networks]]
