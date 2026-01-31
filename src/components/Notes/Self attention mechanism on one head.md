---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-07 14:22
modified: 2025-10-26 23:17
---
Is necessary interpret this idea. They key idea is:
$$
Attention(Q,K,V)=softmax\left(\frac{Q\cdot K^T}{\sqrt{ d_{k} }} \right)V
$$
Thus the change would be (represented very fuzzy) $\vec{E_{i}}'=\vec{E}_{i}+Attention(Q,K,V)$

More precisely:
$$
\mathbf{o}_{t,i}=\sum_{j=1}^{t}\text{Softmax}\left( \frac{\mathbf{q}^{T}_{t,i}\mathbf{k}_{j,i}}{\sqrt{ d_{h} }} \right) \mathbf{v}_{j,i}
$$
$$
\mathbf{u}_{t}=W^{O}[\mathbf{o}_{t,1};\mathbf{o}_{t,2};\dots ;\mathbf{o}_{t,n_{h}}]
$$
[^1]

[[Self attention idea]]

Each head act's over a dimension lower that the [[Embedding dimension]]. Let $d_{h}<d$ this dimension
The $Q$ and $K$ are the [[Query and Key on Attention]], $V$ are the [[Values - LLM]] and $d_{k}$ is the [[Context size LLM]], and the [[Soft-Max Activation peaks or smooth|Softmax function]] to bring it into a workable form.

>The _dot product_ in the __formula__ represents how well a key answer a query, I mean it's the essence of **Self Attention***.

[^1]: [[DeepSeek-V2 A Strong, economical, and efficient Mixture of Expert Language Model]]
