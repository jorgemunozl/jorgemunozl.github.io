---
tags:
  - baby
author: Jorge
date: 2025-09-07 12:14
modified: 2025-09-12 09:49
---
[[integral|Integrals]] of the follow form:
$$ I_{n}=\int_{-\infty}^{\infty} x^{n}e^{ -ax^{2} } \, dx $$
- Which is zero when $n$ is odd, since is a **odd equation**, and when $n$ is even:
$$ I_{n}=\frac{(n-1)!!}{a^{\left( \frac{n+1}{2} \right)}2^{n/2}}\sqrt{ \frac{\pi}{a}} $$
Some values for $a=1$:
$$
\begin{align}
I_{2}=\sqrt{ \pi } \frac{1}{2} \\
I_{4}= 3\sqrt{ \pi }\frac{1}{4}
\end{align}
$$
---
- This resembles to the, yeah this integral appears a lot on something relates to the eigen functions of the armonic oscilator quantized.
- Also called **Gaussian Moments** or the **Moments of the Normal Distribution** (When normalized).
- Under the hood they are the [[Hermite polinomials]], well the independent coefficients.
- When you have a [[Wave Function]] experimental.
- Better aproximation using that lovely inner product.[[inner product for functions]][[better aproximation]]