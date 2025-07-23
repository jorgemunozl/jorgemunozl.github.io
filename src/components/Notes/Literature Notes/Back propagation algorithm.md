---
tags:
  - baby
  - ml
  - connection
author: Jorge
date: 2025-01-09 14:21
---
>The most important algorithm on [[Deep learning, what it is?]] it's a key step to make [[Feed Forward Neural Network]] learn. It's was presented to the world in a 1986 famous paper,__Learning Representations by Back-Propagating Errors__, (in the authors we find **Geoffrey** **Hinton**) this paper return _N.N_ to life after a cold period.

> Are in some way similar to [[Taylor's Polynomial]]


In order to minimize the [[Cost-Loss Function]] we need to compute its **gradient**, this depends on the others model's parameters. And the pretty is that we could find it using the [[Chain rule real functions]]. We are able to obtain the gradient:

$$
\nabla C=\begin{bmatrix}
\frac{\partial }{\partial }& 
\frac{\partial }{\partial } &
\dots&
\frac{\partial }{\partial }
\end{bmatrix}^{T}
$$

The gradient tells you where to "move" to minimize the _Loss Function_, you decide how you are going to move by choosing an [[Optimizer]] and of course the type of the task of the [[Model]].

>[!note]
>Not always is used Back propagation for learn, also we can use another evolutionary methods, [[Reinforcement Learning]]-based updates or Debian Learning to change the behavior of the model, but back prop is the classic one. Use other also depends on the context.

Reference: [[Neural Networks and Deep Learning]]
#### YouTube Video

![](https://youtu.be/SmZmBKc7Lrs) 

![](https://youtu.be/Ilg3gGewQ5U)

![](https://youtu.be/tIeHLnjs5U8)

