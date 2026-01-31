---
tags:
  - baby
  - ml
  - connection
author: Jorge
date: 2025-02-06 11:23
modified: 2025-10-15 08:48
---
The [[FFN Structure]] made that each neuron receive the sum of the product point of weights with another outputs of neuron and to this sum its bias, this is.

$$z=w\cdot x+b$$

It can be demonstrated that use only affine operations like above all the layers can be condensed and reach the same results in the output. Thus all [[Perceptron|the perceptrons]] don't need hidden layers.

The output in each neuron would be a linear combination, and a linear combination cannot resolve complex problems, for instance we have the XOR problem.

For that reason we need to introduce a function $f$ that breaks linearity (we have to leave to that space that we are talking on [[Being linear, belong to the same space after operations|linearity]]) , and use a considerable quantity of layers improves the [[Neural Network Idea]] the same for the others . Then:

$$ f(z)=f(w\cdot x+b)\neq w \cdot f(x)+f(b) $$

- [[Need of a Activation Function for Neural Networks]]
- Also know its [[First derivative on one dimension]] of $f$ is pretty important using [[Back propagation algorithm]].
- The functions more used in deep learning: [[List of activation functions and their problems]]

**Ref**. [[Neural Networks and Deep Learning]]