---
tags:
  - baby
author: Jorge
date: 2025-08-13 09:46
modified: 2025-10-31 22:01
---
We web scrap pairs of images and caption text, then we use the [[Cosine Similarity]] between those and create a loss function of it [^1] [^2].

Think of a like a matrix where the diagonal have elevated values and depend of the nature of the images the another entries.

![[Screenshot From 2025-10-31 21-57-29.png|500x182]]

Give it a batch of captions and images, we create a matrix of numbers using the [[Cosine Similarity]], we use the [[SoftMax Function]] with the columns and arrows, and create the a [[Loss function]] with [[Cross entropy]].  

[^1]: [[An introduction to Visual Language Modeling]] pp. 6

[^2]: [[Learning Transferable Visual Models From Natural Language Supervision]] pp. 5
