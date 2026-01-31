---
tags:
  - baby
date: 2025-12-27 09:48
modified: 2025-12-27 11:28
---
When running your [[Neural Network]] there in a layer the neurons are going to compute the **hidden units** $a^{l}_{i}$. From it you compute: [^1]
$$
\mu ^{l}=\frac{1}{H}\sum ^{H}_{i=1}a_{i}^{l},\sigma ^{l}=\sqrt{ \frac{1}{H}\sum ^{H}_{i=1}(a^{l}_{i}-\mu ^{l})^{2} }
$$
With them you normalize, like:
$$
\hat{x}_{i}=\frac{x_{i}-\mu}{\sqrt{ \sigma^{2}+\epsilon }}
$$
And work with that nice behave $\hat{x}_{i}$. But make that straitjacket to the neural network.
$$
y_{i}=\gamma  \hat{x}_{i}+\beta
$$
Recall that this comes from **Batch Normalization**. Horizontal, in **layer normalization** is vertical so work equal for training and inference. [[batch normalization]]. 
[[Use of batch in Deep Learning]].

But the really important for us is [[Root Mean Square Normalization]]. 

[^1]: [[Layer Normalization]]
