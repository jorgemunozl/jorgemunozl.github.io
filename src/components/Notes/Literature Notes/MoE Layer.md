---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-23 20:16"
---
A Moe layer consist of @caiSurveyMixtureExperts2024 :
- A set of neural networks called _experts_ $\{ f_{1},f_{2},\dots,f_{n} \}$.
- Another [[Neural Network Idea|neural network]] called [[Gating Network]] $\mathcal{G}$.

The output of $f_{i}$ is $f(x,W_{i})$, with $x$ a vector and $W_{i}$ a matrix of _parameters_.
This _N.N_ it's mostly the kind of **linear-ReLu-linear**. 
The output of $\mathcal{G}$ is $\mathcal{G}(x,\Theta)_{i}$  ,$x$ vector and $\Theta$ parameters.
Then the output of the layers it's:

$$
\mathcal{F}=\sum_{i=1}^{n}\mathcal{G}(x,\Theta)_{i}f_{i}(x,W_{i}) 
$$

This layer usually replace the [[FFN on Transformers|FFN]] one example of this is the [[Deep seek]]'s model whereas another like _GShard_ use a combination of the this two.

[[Shared Experts]]
[[Chain of Experts]]

