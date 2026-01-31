---
tags:
  - baby
author: Jorge
date: 2025-01-14 10:37
modified: 2025-09-23 22:23
---
>Are in some way similar to [[Taylor's Polynomial]]

[[Gradient Descent for Neural Networks]]


The problem is clear, find a minimum of the [[Zettelkasten/Literature Notes/Loss Function on Neural Networks]] find a right set of $b$ and $w$.
   
This introduce a interesting idea, that at calculus do not see. 

Let's imagine a Mountain like here in Peru, we have a ball, we want to push the ball to a deepest valley, we look where the deepest valley is and push it that direction until we reach the lowest point in the valley.

But in essence we choose a direction and push the ball using little steps.

Now how we choose that direction? By simply looking around, but in the [[Loss function]] version how you do it? Choose the direction is equal to apply the [[Back propagation algorithm]], and how you move it is apply the [[Optimizer for Neural Networks]].



In our example we see where it is the deepest valley and headed to it. But math talking how it would be? 

In such a way that the has decreased his height.
I want to think that deepest valley have a kind attraction, (relativity thoughts)
that in a certain way tell us where to move

Well with the direction defined, we can write.

$$ \Delta C \approx \frac{\partial C}{\partial v_{1}} \Delta v_{1}+\frac{\partial C}{\partial v_{2}}\Delta v_{2} $$
Gradient of C:
$$ \nabla C=\left( \frac{\partial C}{\partial v_{1}},\frac{\partial C}{\partial v_{2}} \right) $$

$$ \Delta C \approx \nabla C \cdot \Delta v $$
In our case is basically the same, we have to derivate the cost function in one way or another, and using a learning parameter we minimize the cost function and we are so happy.

The problem how we derivate the cost function

>We have to compute $\Delta C$, the _Back Propagation_ give you $\nabla C$, and being practice you find it using $\Delta C=-\eta \nabla C$, the minus because 

A kind explanation is give it by: [[Neural Networks and Deep Learning]] pp. 126

And [[Deep Learning]] pp. 309

[[Back propagation algorithm]]

