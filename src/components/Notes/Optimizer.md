---
tags:
  - baby
  - ml
author: Jorge
date: "2025-04-24 11:09"
---
We call **optimizer** to the method picked to change the parameters and reduce the [[Cost-Loss Function]].

First we have the forward process, computation of the loss function, using the [[Back propagation algorithm]], we compute the gradients, with these we choose a way of how change the parameters. The optimizer is that way, using those gradients we minimize the loss function.

- Some popular optimizer are : [[Stochastic Gradient Descent|SGD]], [[Adaptive Moment Estimation|ADAM]], RMSprop, Adagrad, AdamW, we use one specifically for the task of the [[Model]]. The  are ones that works much better in certain cases. 
  