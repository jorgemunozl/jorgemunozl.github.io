---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-07 09:17
modified: 2025-12-31 11:48
---
>[!definition]
>A transformers is one architecture that enable a high scale on natural language task, it was introduced for first to a translation task [^1].


- It shine processing sequential data using the [[Multi-head attention]] and parallel processing. - It's actually pretty slow: [[flash attention]].
- [[Transform Architecture]].
- Transformers do not read the text from start to finish, they do it all in once, parallelization, [[Use of batch in Deep Learning]], tricky.
- Its main operation is called ***attention block***  [[Self attention mechanism on one head]]
- Also this have has a second operation called feed forward neural network that basically give to the [[Neural Network Idea]] to learn how a word could have more than a unique meaning.
- Extremely good finding relations between the elements.
- That is the conceptual, in the practice we have [[Transformer Process]], and [[Autoregressive Transformer Head for VLA's]]


[^1]: [[Attention Is All You Need]]