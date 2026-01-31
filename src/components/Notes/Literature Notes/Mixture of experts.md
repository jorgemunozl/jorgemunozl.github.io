---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-12 19:22
modified: 2025-10-31 23:15
---
>[!definition]
>The **mixture of experts** is a technique used to leverage the efficacy of [[large language model]], consist on have a set of [[MoE Layer|layers]] specialized on specific topics. Under the hood this are nothing but parallel feed forward networks. [^1]

- This is something that [[Deep seek]] not create but they resolve a problem respect this, occurs that there some experts that work much and another that are lazy. This is known _load imbalance_. bad because it's like forced to used certain experts this could destabilise training. And for this is better do not use experts.
- For each token, the model assign a affinity score for each experts, and using mathematics know if the token is related to the skills of the expert I guess that the network find a way of specialising.
- Then __top k selection__ is used to know what subset of experts are going to take of a token. **gating mechanism
- Any Deep Seek use ***dynamic bias adjustment strategy***.
- We assign a bias to each expert that change over time in the training process and say to the model what specific expert choose.

- Auxiliary loss and the[[Gating Network]]! 


[^1]: [[A survey on Mixture of Experts]]
