---
tags:
  - baby
date: 2026-01-23 09:17
modified: 2026-01-23 09:28
---
The Hamiltonian for a molecule on a electrostatic regime is:
$$
\begin{align}
\hat{H}= &-\sum_{i=1}^{N}\frac{1}{2}\nabla_i^{2}
-\sum_{I=1}^{M}\frac{1}{2M_I}\nabla_{I}^{2} \\
&-\sum_{i=1}^{N}\sum_{I=1}^{M}\frac{Z_I}{|\mathbf r_i-\mathbf R_I|} \\
&+\sum_{1\le i<j\le N}\frac{1}{|\mathbf r_i-\mathbf r_j|} \\
&+\sum_{1\le I<J\le M}\frac{Z_I Z_J}{|\mathbf R_I-\mathbf R_J|}
\end{align}
$$
If you want to solve the [[Schrodinger Equation Many Bodies]] it's clear that try to model the **kinetic term** from the nucleus is astonishing hard, so we consider that the nucleus are points, and they don't move it. This way to reduce the problem is called [[The Born Oppenheimer Approximation]].

We can use another trick to tackle this problem. Is using the [[Hokenberg Khon Functional]]