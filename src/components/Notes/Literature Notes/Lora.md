---
tags:
  - atomic
  - ml
author: Jorge
date: "2025-04-06 16:03"
---
If we want to [[Fine-tune on large language models]] a [[Model for predicting new data]] exist different paths, one of them is use adapters. Exist a rich family of adapters to enhance the capability of this models.
Let's focus on one of those Lora.
[[Adapter to improve model, finetune]]

First you have to add all the adapters, following a specific configuration. Then you train

$W\in \mathbb{R}^{m\times n}$. First why linear layers? It have sense:

$$
f(\mathbf{x})=W\mathbf{x}
$$

After the post-train you obtain a matrix $\Delta W$ such that:
$$
W'=W+\Delta W
$$

Or well you can add a scalar for more flexibility $\Delta W=sBA$

This $\Delta W$ represent our finetunning, the fun when I say $\Delta W=BA$ in such a way that this $B\in \mathbb{R}^{m\times r}$ and  $A\in \mathbb{R}^{r\times n}$ we typically choose $r\ll min(m,n)$ , r is the so called rank.

When $r=1$, the matrix of $mn$ elements is contained en $m+n$ elements, which is certainly beauty.

Now  for $r\neq1$, this is $r(m+n)$.
Now if for trained a from scrathc model we have[[multi head lora]]


From $\mathcal{O}(r(m+n))$ to $\mathcal{O}(mn)$.  Where $\mathcal{O}$ es la [[Big O-complexity]]

This technique was developed in 2022, so is natural that actually we have the QLora which is better.

The follow step is the efficency [[multi head lora]].
 

 Applied to [[Query and Key on Attention]] [[Values - LLM]]

[^1]: [[Training Neural Networks from Scratch with Parallel Low-Rank Adapters]] 

>And together with [[RAG]] best techniques to improve the capacity of LLMs