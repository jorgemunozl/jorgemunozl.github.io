---
tags:
  - baby
  - ml
author: Jorge
date: "2025-04-24 10:50"
---
Let's imagine that we have a vector of inputs and output that we want that our _N.N_ learn.
Let $n$ be the number of all the inputs that we are going to give to the function, $w$ the _weights_ $b$ the _bias_, $y(x)$ the actual out put that gives the [[Neural Network Idea]] and $a_{x}$ the expected output for one specific input. 

$$
C(w,b)=\frac{1}{2n}\sum_{x}||y(x)-a_{x}||^{2}
$$

Is easy observe that our model is doing well if the output of these function is close to zero, if the number instead is a big number then we need to change in somehow the values for the parameters.

[[Least squares algorithm]]