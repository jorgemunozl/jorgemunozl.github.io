---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-25 23:57
---
But no matter, all what at the end cares is the [[positional embedding matrix]].

It's very important the position of the word (NLP), the most simply is assign a natural number according to the apparition of the word, I mean it's easiest way (complexity linear). But I think that emerges a problem how we relate the vector of a word to a number.

We can use RNN's that learn the position of the embeddings. 

Using [[Convolution Neural Network]] also it's possible @gehringConvolutionalSequenceSequence2017

Using [[Transformer]] lack recurrence thus is not possibly to know the position of a word. @Vaswani2017

Deep Seek use another form called Rotatory and decoupled rotatory position.