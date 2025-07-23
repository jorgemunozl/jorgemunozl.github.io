---
tags:
  - baby
  - ml
  - connection
author: Jorge
date: 2025-02-13 13:55
---
[[Feed-forward neural network]]

This neural network use its [[FFN Structure|structure]] like follow.

1. Input layer receive data, this data must be re framed in numbers to be distributed to the first layer.
2. Therefore each neuron receive a number and this give its numbers to follow layer, but multiplied by the weight its connection, thus each neuron of the follow layer receive a weighted sum, to that sum plus the bias making it unique.
3. We apply a [[Activation function]] , and pass the result to the follow neuron, like this with each neuron until reach the output layer.
4. The output layer give us the final result after commonly apply the [[SoftMax Activation-LLM Idea abstraccion|SoftMax to this vector]].   

The most primitive and one of the firsts [[Neural Network Idea]] was the [[Perceptron|perceptrons]], this don't use an _activation function_.

Of course the most basic _FFN_ that we can implement is using [[Sigmoid Neurons]] and it's a well example to grasp _Neural Networks_