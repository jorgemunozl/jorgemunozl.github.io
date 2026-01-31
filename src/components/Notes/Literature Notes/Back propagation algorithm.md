---
tags:
  - baby
  - ml
  - connection
author: Jorge
date: 2024-10-09 14:21
modified: 2025-10-07 21:13
---
In order to minimize the [[Zettelkasten/Literature Notes/Loss Function on Neural Networks|loss function]] we need to change the values of the parameters (this were initialized randomly!), but how we do it. [^1]

- If you want to calculate the partial derivative of a neural network over a specific point. Since this point depends on such amount of variables and functions.

- It doesn't work outside Neural Network because you don't leverage that well the **Chain Rule**.

By using the [[Chain rule for real functions]] we can obtain the partial derivatives:
$$
\nabla C=\begin{bmatrix}
\frac{\partial }{\partial }& 
\frac{\partial }{\partial } &
\dots&
\frac{\partial }{\partial }
\end{bmatrix}^{T}
$$

[[back propagation for avoid problems]]

The gradient tells you where to "move" to minimize the _Loss Function_, you decide how you are going to move by choosing an [[Optimizer for Neural Networks]] and of course the type of the task of the [[Model for predicting new data]].

>[!note]
>Not always is used Back propagation for learn, also we can use another evolutionary methods, [[Reinforcement Learning]]-based updates or Debian Learning to change the behavior of the model, but back prop is the classic one. Use other also depends on the context.

- [[Backpropagation equations]]

[^1]: [[Neural Networks and Deep Learning]] pp. 75
