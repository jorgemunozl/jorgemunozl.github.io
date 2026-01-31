---
tags:
  - baby
date: 2025-11-08 22:27
modified: 2025-11-09 10:29
---
what is this

foundational papersChoose a $\Delta \theta$ that decreases the loss subject to keeping the $KL$ small

$$
\underset{\Delta \theta}{\text{argmin}}\nabla_{\theta}\mathcal{L}^{\text{T}}\Delta \theta
$$
The question is that is important for us:

How you prove that I don't know: 

$$
\Delta \theta _{\text{nat}}=-\eta \mathcal{F}^{-1} \Delta_{\theta}\mathcal{L}
$$


So you only need the [[Fisher Information Matrix]] and that derivative of the [[Loss function]] that we know that it could be calculated using [[Back propagation algorithm]].

So how you compute the inverse of the Fisher Information matrix?