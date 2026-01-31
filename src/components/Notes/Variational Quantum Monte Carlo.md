---
tags:
  - baby
date: 2025-10-19 16:23
modified: 2025-10-24 07:34
---
Minimizes the expectation value of the Hamiltonian:

**Rayleigh Quotient** [^1].

$$
\mathcal{L}=\frac{\bra{\psi} \hat{H}\ket{\psi} }{\braket{ \psi | \psi } }=\frac{\int d\mathbf{r}\psi ^{*}(\mathbf{r})\hat{H}\psi(\mathbf{r})}{\int d\mathbf{r}\psi ^{*}(\mathbf{r})\psi(\mathbf{r})}
$$

[[Rayleigh Quotient like Expectation Value]]

Calculate the first integral is impossible. So let's with the [[Metropolis algorithm]]

>This comes from the **variational principle**, any trial wave function gives an energy greater than the [[ground state for qm]].

>The [[expected energy]] becomes that integral. 

[^1]: [[Quantum Mechanics Zettili]] pp. 524
