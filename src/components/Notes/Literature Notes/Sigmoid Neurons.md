---
tags:
 - baby
 - ml
 - atomic
author: Jorge
date: 2025-01-13 21:08
---
To break this binary we use an [[Activation function]].
Exist many of these the most know is the follow.
 $$
\sigma(z)=\frac{1}{1+e^{-z }}
$$

here doesn't exist that condition using cases , inequalities, here the essence of the function represents well the idea of the perceptron. if it's a the $z$ is a very bit number then the output is practically one , and if the output is very negative the output is closer to zero.

With this we can get outputs from zero to one passing al the real numbers between these two numbers.

This resolve two problem that [[Perceptron]] presents. (gradual and linearity)

**Ref**. [[Neural Networks and Deep Learning]]