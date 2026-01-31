---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-24 11:15
modified: 2025-11-22 20:26
---
>Adam

For each weight $\theta$, we have $m_{t}$ the average of past gradients, $v_{t}$ the average of past squared gradients.

The update is $$\theta_{t+1}=\theta_{t}-\alpha.\frac{\hat{m}_{t}}{\sqrt{ \hat{v}_{t}+\epsilon }}$$
$\alpha$ the learning rate, and epsilon a number close to zero.


[[Deep Learning]] pp. 311