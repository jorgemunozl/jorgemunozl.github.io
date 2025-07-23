---
tags:
  - baby
  - atomic
  - ml
author: Jorge
date: 2025-01-13 20:21
---
[definition]

A perceptrion is a function $f:\mathbb{R}-\{ 0,1 \}$ , ref? naturals maybe?

[[perceptron idea]]The most simple take _integers_ inputs and gives binary outputs. 
What decide the output of the neuron. Although it seems easy if you see well this are the basis of [[Neural Network Idea]].


The output of a perceptron is 
$$
\begin{cases}
1 \text{ if } w\cdot x+b>0 \\ 
0 \text{ if }w\cdot x+b\leq 0
\end{cases}
$$

What is the obvious problem of the Perceptrons?
It's very poor, the real life problems are very complex and only with binary numbers would be impossible to perform something. This is reflected on
small modifies at the weight and bias produce big changes on the final output
linearity

For that reason we have the [[Sigmoid Neurons]].

**Perceptron Convergence Theorem** If there was a solution for a given problem, then a perceptron would be able to find a solution to the problem.


**Ref**. [[Neural Networks and Deep Learning]]