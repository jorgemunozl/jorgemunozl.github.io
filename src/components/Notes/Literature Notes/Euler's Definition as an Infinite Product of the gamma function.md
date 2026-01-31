---
date: 2024-11-04
tags:
  - baby
  - atomic
author: Jorge
modified: 2025-09-07 11:13
---
>[!definition]
Function Gamma (Infinite Product form). [^1]
$$\begin{align}\Gamma(z)=\frac{1}{z} \lim_{ n \to \infty } n^{-z}\prod_{k=1}^{n} (\frac{1}{1+\frac{z}{k}} \end{align})$$
- Leonhard Euler extended the factorial idea using a limit. Which is the key for demonstrating properties of the gamma function that would be impossible to derive from its integral form alone. From the follow **limit** we could obtain the infinite product: $\lim\limits_{n\rightarrow \infty} \frac{n!(n)^z}{(n+z)!}=1$ you break up the denominator, and you have the follow definition.
$$
\Gamma(z)=\lim_{ n \to \infty } \frac{n!n^{z}}{(z)_{n+1}}
$$
- From this form, Weierstrass was able to derive another  useful [[Weierstrass's Definition of Function Gamma|representation]].


[^1]: [[Mathematical Methods for Physicist]] pp. 512
