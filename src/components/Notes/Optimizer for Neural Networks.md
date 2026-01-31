---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-24 11:09
modified: 2025-11-18 07:04
---
How we actualize our parameters, bias and weights
$$
w\to w'\quad b\to b'
$$
We call **optimizer** to the method picked to change the learnable parameters or find the values who minimize a [[Loss function]].

I mean this at the end is **Numerical Analysis**.

- Some popular optimizer are : 
1. [[Gradient descent for FNN]] [[Gradient Descent for Neural Networks]]
2. [[Natural Gradient Descent]], [[Kroenecker Factored Approximate Curvature]]
3. [[Stochastic Gradient Descent]].
4. [[Adaptive Moment Estimation|ADAM]].
5. RMSprop, Adagrad, AdamW.
6. Second-order and quasi Newton [[newton method]]  

- We use one specifically for the task of the [[Model for predicting new data]]. The  are ones that works much better in certain cases.
- First we have the forward process, computation of the loss function, using the [[Back propagation algorithm]], we compute the gradients, with these we choose a way of how change the parameters. The optimizer is that way, using those gradients we minimize the loss function.