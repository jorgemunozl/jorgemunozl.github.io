---
tags:
  - baby
date: 2025-10-11 17:49
modified: 2025-10-14 12:51
---
Let's say that we have a domain, then we can generate a grid on that domain.

If we have:
$$
\frac{\partial u(x,t)}{\partial t}\approx \frac{u^{t}-u^{t-1}}{\Delta t}
$$
Or the second order approximation:
$$
\frac{\partial^{2}u(x,t)}{\partial x^{2}}\approx \frac{u^{x+1}-2u^{x}+u^{x-1}}{\Delta x^{2}}
$$
So you directly replace those term on the equation and replace for the term, $u^{t+1}_{x}$, and each epoch you should obtain a better approximation? [^1]

Now how this method works with the **initial and boundary conditions**?

Now there is a problem which is [[the curse of dimensionalization FDM]]

[^1]: [[Numerical Analysis]] pp. 703
