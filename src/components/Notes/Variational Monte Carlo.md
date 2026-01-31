---
tags:
  - baby
date: 2025-10-19 16:23
modified: 2026-01-21 19:58
---
>[!definition]
Minimizes the expectation value of the Hamiltonian, which have sense because the [[Variational Principle]].

- [[Loss Variational Monte Carlo]]
**Rayleigh Quotient** [^1].
$$
\mathcal{L}=\frac{\bra{\psi} \hat{H}\ket{\psi} }{\braket{ \psi | \psi } }=\frac{\int d\mathbf{r}\psi ^{*}(\mathbf{r})\hat{H}\psi(\mathbf{r})}{\int d\mathbf{r}\psi ^{*}(\mathbf{r})\psi(\mathbf{r})}
$$

But we don't minimize directly that $\mathcal{L}$, but we use the [[Log derivative trick]] which is related to [[REINFORCE]] (Who thinks the guy who proposed this?)

Now it happens something very interesting, you cannot back propagate trough the expression:

$$
\mathcal{L}_{\theta}=\mathbb{E}[E_{L}]
$$

First reason: If you make that you have a third back propagation, which is a lot.
Second Reason. You can't back propagate trough the Markov Chain, so the $R$ are considered that are constant, but they are not actually mean nothing.

And there is a very concept called [[Zero Variance]]




This is 
[[Rayleigh Quotient like Expectation Value]]

Calculate the first integral is impossible. So let's with the [[Metropolis Hasting algorithm]]

>This comes from the **variational principle**, any trial wave function gives an energy greater than the [[ground state for qm]].

>The [[expected energy]] becomes that integral. 

[^1]: [[Quantum Mechanics Zettili]] pp. 524
