---
tags:
  - young
  - ml
author: Jorge
date: 2025-01-14 10:40
---
>_How we **measure** how well is doing our neural network?_ One could do it (efficiently) arbitrarily?

Imagine that when we initialize our parameters we have the bless of strike home and find the rights values for our [[Model]], then we don't have do anything else.  But that don't happens, we need to use a function that make a comparison between the expected output and the actual output of the model, but exactly how the function do it depends on the **task** that our model want to perform.

>[!example]
[[Mean Squared Error]], Mean Absolute Error, [[Cross entropy]], Binary Cross Entropy, Huber Loss.

We want to change the [[hyperparameters|parameters]] in such a way that we could minimize the loss function. This convert in the classic problem of _calculus_! (One very complicated)

To achieve that we can't "take derivatives", the output (of a [[Feed Forward Neural Network]]) depends uniquely on the bias, weights and [[Activation function|functions]] used, this are practically independent values, we can say that is a function with thousand of variables, and obvious the function is discrete (is not continuous).

>[!question]
How we change the parameters in order to find the minima of the _Loss Function_. Using [[Optimizer]].




