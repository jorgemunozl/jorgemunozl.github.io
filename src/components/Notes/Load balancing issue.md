---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-24 12:39"
---
If the [[Sparse Moe]] behaviour make that only one certain experts are chosen, for that we have the follow.

Let's say that you give it one prompt to a model, this for the model is a set of vector, called it $\mathcal{B}=\{ \mathrm{x_{1},x_{2},\dots ,x_{T}}\}$. And let's say we have $N$ experts, (indexed). $T$ the number of tokens give it to the model.

In the [[Training Phase LLM]] 


$$
\mathcal{L}_{\text{load-balancing}}=N\sum_{i=1}^{N}\mathcal{D}_{i}\mathcal{P}_{i} 
$$

$$
\mathcal{D}_{i}=\frac{1}{T}\sum _{x\in \mathcal{B}}\mathbb{1}\{ argmax\mathcal{G}(x,\Theta)=i \}
$$

$$
\mathcal{P_{i}}=\frac{1}{T}\sum_{x\in \mathcal{B}}\mathcal{G}(x,\Theta)_{i}
$$

We say that $\mathcal{D}_{i}$ represents the proportion of tokens distributed to expert $i$and $\mathcal{P_{i}}$ 

📖 [[A survey on Mixture of Experts]]