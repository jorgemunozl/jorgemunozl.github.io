---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-07 10:59
modified: 2025-10-26 17:57
---
![[transformerArchitecture.png|295x398]]
A transform consists on: [^2]
- Encoder stack [[Embedding matrix]]
- Decoder stack

The encoder stack consist on many [[layer AI|layer]] (in the code we called block each layer [^1]). And each layer contains.
- [[Multi-head attention]]
- [[FFN on Transformers|A FFN]]
- [[Add and normalize|A normalization step]].

The decoder stack is practically the same but using a [[Masking]].
- Thus we obtain the [[Transformer Process]]
- But I do not understand why at the output is shifted right at the picture.
- Now why we say that it is [[Paralellism for transformers]] and [[scability for transformers]].

[^1]: [[Natural Language Processing with Transformers]]

[^2]: [[Attention Is All You Need]] pp. 3
