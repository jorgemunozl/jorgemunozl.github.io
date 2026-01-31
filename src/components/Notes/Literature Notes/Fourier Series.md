---
date: 2025-01-09 14:51
tags:
  - baby
author: Jorge
title:
---
>[!definition]
>Give it [[Periodic Function]] $f$ (Suppose real variable for don't complicate the things), we called a [[Fourier]] decomposition to the function [^1].
 >$$ f'(x)=a_{0}+\sum_{i=1}^{\infty}(a_{i}\cos(ix)+b_{i}\sin (ix))  $$

- The family of coefficients $\{ a_{i} \}$ and $\{ b_{i} \}$ are called [[Fourier]] _coefficients_ and are calculated like follow:

$$
a_{0}=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)dx
$$

$$
a_{i}=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)\cos (ix)dx
$$

$$
b_{i}=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)\sin (ix)dx
$$


Now going to the complex domine we can rewrite it.

$$a_i+ib_i=\frac{1}{\pi} int f(x)[cos(ix)+isin(ix)]= \frac intf(x) (e^{i(ix)})$$

Which is very interesting because the form its seems to fourier,  but here you have to emulate the first equation in some way. I dont know how exactly?

[[Fourier Series Idea]]
[[Fourier Transform]]

>[!note]
>There doesn't exist difference between take the integral on $[0,2\pi]$ or $[-\pi/2,\pi/2]$ are the same. Depends on the author where define the functions.


[^1]: [[Series y Transformadas de Fourier]] pp. 4
