---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-12 22:55
modified: 2026-01-20 07:47
---
>[!definition]
>Cross entropy is a measure from [[Information Theory]] that quantifies how different two probability distributions are. Let $p(x)$ be the **target distribution**, and $q$ the **predicted distribution** then **cross entropy** is defined as:
$$
H(p,q)=-\sum_{x}p(x)\log q(x)
$$

- The central idea of use this expression as [[Loss function]] is: If the model gives **high probability to the correct class** the loss is **low** but if the model is **confident but wrong**, the loss is **high**.
- Is formalized using the concept of [[Surprise-Self Information]].
- Very used in task for classification, (and we know that predict the next token is a classification task) because we are comparing distributions.
- When training a model, the **target distribution** $p$ is usually a one hot vector, it seems like:
$$
p=[0,\dots,0,1,0,0,\dots,0]
$$
When you have a discrete dataset. in that case the cross entropy looks like:
$$
H(p,q)=-\sum_{x}\log(q)
$$
Which is basically is the [[Negative Log Likelihood]] and it's an important from [[Teacher Forcing]] and [[Cross attention]]


@pmpHowMeasurePolicy2025
[^1]:  [[Entropy, Relative Entropy, Mutual Information]] 
[^3]: [[Neural Networks and Deep Learning]] pp. 65
