---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-24 11:07
modified: 2025-08-16 15:25
---
>[!definition]
>A gating network is a [[Feed Forward Neural Network]] using the [[SoftMax Function]] network [^1].
>$$ \mathcal{G}(\mathbf{x},\Theta)_{i}=\text{softmax}(g(\mathbf{x},\Theta))_{i}=\frac{\exp(g(\mathbf{x},\Theta))_{i}}{\sum_{i=1}^{n} \exp(g(\mathbf{x,\Theta})_{j})} $$
- Here the key is understand the $g$ function which decides if the input it's relate to a certain expert, give a score.
- Typically $g$ have the next form, a [[linearity on neural networks|linear layer]] $g(x,W)=W\cdot \phi(x)+b$. Where $W$ it's a weigh matrix, $\phi$ is a [[Activation function]] and $b$ the bias.
- It's obvious that the gating match a expert for a give set of tokens.
- By the gating a [[MoE Layer]] is classified on a dense MoE and a [[Sparse Moe]].


[^1]: [[A survey on Mixture of Experts]] pp. 3
