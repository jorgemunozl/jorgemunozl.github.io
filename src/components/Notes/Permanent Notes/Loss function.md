---
tags:
  - young
author: Jorge
date: 2024-09-30 15:09
modified: 2025-11-18 06:48
---
Say that we have a [[Model for predicting new data|model for fit a known function]]. How we measure how well it's doing the model?

So in the most general case a **loss function** is a relation that measures how well the model predicts it.

Imagine that when we initialize our parameters we have the blessing of finding the right values for our [[Model for predicting new data|model]], then we don't have do anything else.  But that doesn't usually happen, we need to use a function that makes a comparison between the expected output and the actual output of the model.

>[!example]
[[Mean Squared Loss as Loss Function]], Mean Absolute Error, [[Cross entropy]], Binary Cross Entropy, Huber Loss. 

I mean here we talk about: **Regression tasks**: Real numbers
1. MSE, MAE, Hubber Loss 
**Classification** (predict discrete labels)
2. Cross-entropy (a.k.a negative log-likehood), Hinge Loss

And [[Optimizer for Neural Networks]]

- Now a interesting question is: Why it's the difference between a error function? Just the names?

So the question that answers the existence of the loss function is:
>_How do we **measure** how well our model  is doing?_ 