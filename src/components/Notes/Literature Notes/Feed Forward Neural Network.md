---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-24 11:54
modified: 2025-11-03 11:55
---
>[!definition]
>A **feed-forward neural network** is a non-linear mapping from a input pattern $\mathbf{x}$ to an output vector $\mathbf{y}$. [^1]

Always are numbers, no matter if the input represents voice, images, videos,etc.

More precisely is that this linear mappings are stacking, 

A [[Neural Network Idea|neural network]] it's a set of layers composed of nodes. Where each node it's connected to another nodes (this is the easy way to visualize) to programming it is more easy to see it like that.

In the implementation first you create the linear mappings and then you apply an [[Activation function]], that is why we say that this are non linear.

They could be linear but 

The way on how the nodes are connected to another and how the information flows trough the net depends on the [[Types of Neural Networks|type of NN]].
Each node receive and _input_ and give an _output_ to the nodes that is connected.(This two are real numbers). There it's works equal that a [[Vector Function]].
The output of each node is obtained trough simply mathematical operations that are performed "inside" the node.
To the nodes we call _neurons_, each neuron posses a _bias_ and for each connection between neurons we have a _weight_, (real numbers).
It's practical to arrange this numbers using _vectors_ and _matrix_.
The most common thing is that the _input_ is a _vector_ and the output also.


[^1]: [[Layer Normalization]]
