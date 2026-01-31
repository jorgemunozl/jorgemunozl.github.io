---
tags:
  - baby
date: 2026-01-06 10:21
modified: 2026-01-08 10:18
---
A mathematical fact is:

$$
\nabla_{\theta}\log p(x)=\frac{\nabla_{\theta}p_{\theta}(x)}{p_{\theta}(x)}
$$

So when you want the derivative of the loss:
$$
\mathcal{L}=\mathbb{E}(X)
$$
 $$
\nabla \mathcal{L}=\int \nabla_{\theta}(p_{\theta}X)dx=\int \nabla pX+\int p\nabla X
$$

$$
\int \nabla_{\theta}\log p(x)p_{\theta}(x)Xdx=\mathbb{E}[\nabla _{\theta}\log pX]
$$
