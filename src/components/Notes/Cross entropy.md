---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-12 22:55"
---
And before we need to define the [[Surprise-Self Information]]

Very used in task for classification, because indeed we are comparing to distributions (think of classification of handwritten numbers).

Cross entropy is a measure from information theory that quantifies how different two probability distributions are. 

$$
H(p,q)=-\sum_{x}p(x)\log q(x)
$$



In machine learning, it's commonly used as a loss function, especially for classification tasks.
When training a model, you want the predicted probabilities to be as close as possible to the true distribution.

- If the model gives **high probability to the correct class**, loss is **low**.
    
- If the model is **confident but wrong**, loss is **high**.
    
- It punishes confident wrong answers harshly.???

[[Self attention mechanism on one head]]

### YT

![](https://youtu.be/KHVR587oW8I)
