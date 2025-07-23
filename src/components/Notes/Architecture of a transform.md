---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-07 10:59"
---
![[transformerArchitecture.png|295x398]]
A transform consists on:
- Encoder stack 
- Decoder stack

The encoder stack consist on many [[layer AI|layer]] (in the code we called block to each layer, why?). And each layer contains.
- [[Multi-head attention]]
- [[FFN on Transformers]]
- [[Add and normalize]]

So the numbers of layers should be large, I mean is like the cell. 
So the architecture is completely well defined once that the [[hyperparameters]] are defined.

The decoder stack is practically the same but using a [[Masking]].

But I do not understand why at the output is shifted right at the picture- 

**Ref**. [[Attention Is all you need]] pp. 