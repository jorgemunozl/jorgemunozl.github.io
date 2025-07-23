---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-07 14:22"
---
>[!definition]
>Give it three [[Tensor - Computation|tensor]] $(Q,K,V)$ and a number $d_{k}$, the self attention mechanism (optimized) is a **vector** $A$ such that:
>$$Attention(Q,K,V)=softmax\left(\frac{Q\cdot K^T}{\sqrt{ d_{k} }} \right)V$$

- The [[SoftMax Function]] 
- This is a upgraded version of the [[attention mechanism]], the is the reason of the self.
- This is the optimized version, when for a reason you introduce the $\sqrt{ d_{k} }$. 


>Attention was known before 2017, but this specific mechanism was introduced for first time on the paper 

Allows token attend each others in parallel.

The _parallelisation_ it's possible for the [[Gpu paralellism-deep learning-computational costs]],it's perform in the _multi head attention_ task

Basically (_inference_), give it a set of words in its vector form, apply this mechanism makes change the values of the vector by summing vector, a single head make change a little, but the sum of many heads change considerably the words. [[Multi-head attention]].

This is vector that change the meaning of the words is obtained by **Attention Formula**. 

The $Q$ and $K$ are the [[Query and key]], $V$ are the [[Values LLM]] and $d_{k}$ is the [[Context size LLM]], and the [[SoftMax Activation-LLM Idea abstraccion|Softmax function]] to bring it into a workable form.

$$
$$

Thus the change would be (represented very fuzzy) $\vec{E_{i}}'=\vec{E}_{i}+Attention(Q,K,V)$

>The _dot product_ in the __formula__ represents how well a key answer a query, I mean it's the essence of **Self Attention***.

[Implementation](https://colab.research.google.com/drive/1frhEGblRg98cEgTFJVLV-fy9mlrI8qhR?usp=sharing)
# YouTube

![](https://youtu.be/eMlx5fFNoYc)













After this vector go to the section of [[layer LLM use]] and what happen to the vector here?
