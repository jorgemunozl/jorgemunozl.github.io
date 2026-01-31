---
tags:
  - baby
date: 2025-12-07 14:50
modified: 2026-01-15 20:13
---
So when we have the expression:
$$
\log\left( \sum_{i} e^{ a_{i} } \right)
$$
Mathematically it's fine, but numerically is a monster, it can [[overflow]] or [[underflow]].
So here it comes a trick.  Take the $\text{max}=m$ from $a_{i}$. And:

$$
\sum_{i}e^{ m+a_{i}-m } =\sum e^{a_{i}-m }=e^{ m }\sum e^{ a_{i}-m }
$$
Taking the log:
$$
=m+\log\left( \sum e^{ a_{i}-m } \right)
$$
Which is numerically stable. Get excited.

Forward Laplacian: A New Computational Framework for Neural Network-based Variational Monte Carlo

Neural network variational Monte Carlo for positronic chemistry

AI Feynman: a Physics-Inspired Method for Symbolic Regression

