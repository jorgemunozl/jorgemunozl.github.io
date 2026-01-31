---
tags:
  - baby
date: 2025-12-28 18:33
modified: 2025-12-30 08:44
---
This is a crutial step in the [[Transformer]] architecture. We know that we have to compute the [[Query and Key on Attention]] and [[Values LLM]]. You do it using matrix, but think when you have more than one block, say in the third block, how this guys are producing, 

The first layer computes them nicely, the second one? What have to make? What's in the input for the second .

And why it only works for training?

Think you generate [[Auto regressive generation]], you begin with $n$ tokens, you are going to create more tokens

Why the $Q$ is new? That is all the reason why this things exist.