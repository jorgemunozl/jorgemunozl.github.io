---
tags:
  - baby
author: Jorge
date: 2025-09-23 11:21
modified: 2025-10-15 10:22
---
It could be seen like a specific case of the [[Steepest Descent]]

Is a method used for [[optimization problem]].

So if you want to minimize a **function** $L$ which depends on $\theta$ you have to compute the gradient, which physically a vector pointing in the direction where $L$ increase.

$$
\nabla_{\theta}L(\theta)=\begin{bmatrix}
\frac{\partial L}{\partial \theta_{1}} \\
\frac{\partial L}{\partial \theta_{2}} \\
\vdots
\end{bmatrix}
$$

Yeah but where we calculate the gradients?

Mother of good.

If we want to decrease we have to move it in the opposite direction. Thus we update the parameters using:

[[Update rule Gradient Descent Prove]]

$$
\theta_{t+1}=\theta_{t}-\epsilon \nabla_{\theta}L(\theta)
$$

[[Gradient descent for FNN]]
In the normal cases $\theta$ takes the form of $\{ x,y,z , \dots \}$, on [[Neural Network]] how you obtain the gradients? Via [[Back propagation algorithm]].