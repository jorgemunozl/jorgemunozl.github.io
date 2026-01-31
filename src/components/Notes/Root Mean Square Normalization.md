---
tags:
  - baby
date: 2025-12-27 11:27
modified: 2025-12-28 17:26
---
Here you use less computation, you normalize using:

$$
x_{\text{norm}}=\frac{x}{\sqrt{ \frac{1}{d}\sum x^{2} +\epsilon}}
$$

And then the learn scaling factor:

$$
\gamma \odot x_{\text{norm}}
$$
But is more fun if we conditioned by the time, and we make with:

$$
\gamma(\tau)\cdot\left( \frac{x}{\text{RMS}} \right)+\beta(\tau)
$$

Where $\tau$ comes from the [[Sinuidal Encoding]]