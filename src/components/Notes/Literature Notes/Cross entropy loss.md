---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-12 22:55
modified: 2025-08-17 11:06
---
>[!definition]
>Cross entropy is a measure from [[Information Theory]] that quantifies how different two probability distributions are. 

- And before we need to define the [[Surprise-Self Information]] since is defined on it.

Very used in task for classification, because indeed we are comparing to distributions (think of classification of handwritten numbers). 
$$
H(p,q)=-\sum_{x}p(x)\log q(x)
$$
In machine learning, it's commonly used as a loss function, especially for classification tasks.

When training a model, you want the predicted probabilities to be as close as possible to the true distribution.

But why
- If the model gives **high probability to the correct class**, loss is **low**.
    
- If the model is **confident but wrong**, loss is **high**. But how you measure the confident from an answers?
    
- It punishes confident wrong answers harshly.

@pmpHowMeasurePolicy2025

[^1]:  [[Entropy, Relative Entropy, Mutual Information]] 
[^3]: [[Neural Networks and Deep Learning]] pp. 65
