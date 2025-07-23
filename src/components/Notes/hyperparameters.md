---
tags:
  - baby
  - ml
author: Jorge
date: "2025-05-21 10:14"
---
So judging by the name what is the difference with [[parameters]]


All the parameters reside on the matrices and vectors (weights and bias)? of the [[Feed Forward Neural Network]].

And also while using pytorch those matrices in some way are different from normal matrices.

Hyper parameters of the model like the embed dimension and that stuff. For chatgtp2 we have the follow hyperparameters, general because really exist a ton. and well all make reference, we could say that this define the [[Architecture of a transform]].

The vocabulary size. ```vocab_size```[[vocabulary size]] 
The block size. ```block_size``` 
The number the heads for layers. ```n_head``` 
The embedding size. ```n_embd``` [[Embedding dimension]]
The numbers of layers. ```n_layer``` 

Once you define this parameters you could define the [[Embedding matrix]] and the [[positional embedding matrix]].