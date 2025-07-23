---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-07 14:22"
---

[[flash attention]]
[[head model]]


Is necessary interpret this idea. They key idea is:
$$
Attention(Q,K,V)=softmax\left(\frac{Q\cdot K^T}{\sqrt{ d_{k} }} \right)V
$$
Thus the change would be (represented very fuzzy) $\vec{E_{i}}'=\vec{E}_{i}+Attention(Q,K,V)$

More precisely:
$$
\mathbf{o}_{t,i}=\sum_{j=1}^{t}Softmax\left( \frac{\mathbf{q}^{T}_{t,i}\mathbf{k}_{j,i}}{\sqrt{ d_{h} }} \right) \mathbf{v}_{j,i}
$$
$$
\mathbf{u}_{t}=W^{O}[\mathbf{o}_{t,1};\mathbf{o}_{t,2};\dots ;\mathbf{o}_{t,n_{h}}]
$$


[[Self attention idea]]

Each head act's over a dimension lower that the [[Embedding dimension]]. Let $d_{h}<d$ this dimension
The $Q$ and $K$ are the [[Query and key]], $V$ are the [[Values - LLM]] and $d_{k}$ is the [[Context size LLM]], and the [[SoftMax Activation-LLM Idea abstraccion|Softmax function]] to bring it into a workable form.

>The _dot product_ in the __formula__ represents how well a key answer a query, I mean it's the essence of **Self Attention***.

>Attention was known before 2017, but this specific mechanism was introduced for first time on the paper.

**Ref**: 
1. [[References/Attention Is all you need|Attention Is all you need]]
2. [[DeepSeek-V2 A Strong, economical, and efficient Mixture of Expert Language Model]]

# YouTube

![](https://youtu.be/eMlx5fFNoYc)













After this vector go to the section of [[layer LLM use]] and what happen to the vector here?
