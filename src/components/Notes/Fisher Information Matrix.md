---
tags:
  - baby
date: 2025-11-08 22:02
modified: 2025-11-19 09:27
---
Recall that we see this guy on theory of the information.
And I think that it's very interesting.

We say that the matrix has high information when tiny changes it his parameters causes big changes, and it has low information when you change parameters and it doesn't change so much.

Definition:
Let $x\sim p(x|\theta)$. Define the score:
$$
s_{\theta}(x)=\nabla_{\theta}\log p(x|\theta)
$$
$s\in \mathbb{R}^{d}$ a column vector. $d$ number of parameters.

$$
F(\theta)=\mathbb{E}_{x\sim p(\cdot|\theta)}[s_{\theta}(x)s_{\theta}(x)^{\mathsf{\top}}]
$$

Or if you want:
$$ \mathcal{F}_{ij}=\mathbb{E}_{p}(\mathbf{x})\left[ \frac{\partial \log p(x)}{\partial \theta_{i} }\frac{\partial \log p(X)}{\partial \theta_{j}} \right] $$
Now the question is how you define the metric in this space using $\mathcal{F}$. Distance between c

Being more formal, given a parametric family:
$$
\mathcal{M}=\{ p_{\theta}(z)|\theta \in \Theta \subset \mathbb{R}^{d}\}
$$
Where 

One example: First with just one parameter: [[bernoulli distribution]]
[[Fisher Information Matrix ab initio]]

[[Prove Natural Gradient Descent Explication]]