---
tags:
  - baby
author: Jorge
date: 2025-09-12 13:29
modified: 2025-10-15 19:36
---
The [[Loss function]] for [[PINNS]] are in the most of the cases the [[Mean Squared Loss as Loss Function|MSE]] and it's the key part.

The loss is written as follows [^1]:
$$ \mathcal{L}=w_{\text{residual}}\cdot \mathcal{L}_{\text{residual}}+w_{ic}\cdot \mathcal{L}_{ic}+w_{bc}\cdot \mathcal{L}_{\text{bc}} $$

We evaluate those [[Residual terms on a PINNS|residuals terms]] over [[Collocation Points for Train a PINN|the collocation points]].

[^1]: [[A comprenhesive analysis of PINNS]] pp. 6
