---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-12 19:22"
---
When a model uses this the technique of uses [[MoE Layer]] on it's architecture we use this word.

Was introduced for first in 1990

This are individual parallel feed forward networks that processes a token.

It's like have expert to realise a unique kind of task. 

This is something that [[Deep seek]] not create but they resolve a problem respect this, occurs that there some experts that work much and another that are lazy. 

For each token, the model assign a affinity score for each experts, and using mathematics know if the token is related to the skills of the expert I guess that the network find a way of specialising.
Then __top k selection__ is used to know what subset of experts are going to take of a token. **gating mechanism

This is known _load imbalance_. bad because it's like forced to used certain experts this could destabilise training. And for this is better do not use experts.


Any Deep Seek use ***dynamic bias adjustment strategy***.

We assign a bias to each expert that change over time in the training process and say to the model what specific expert choose.

Auxiliary loss

[[Gating Network]]