---
tags:
  - baby
author: Jorge
date: 2025-08-02 14:45
modified: 2025-08-12 13:41
---
Let's say that we have two [[Random variable (univariate)|random variables]] $X$ and $Y$, how we measure the relation of these, I mean a way to measure how much they are directly or inversely proportional.
>[!definition]
>The **covariance** between $X$ and $Y$ is defined as the [[Expected Value]] from the deviation of the [[mean]][^1].
>$$\text{Cov}_{X,Y}[x,y]:=\mathbb{E}([x-\mathbb{E}(x)][y-\mathbb{E}(y)])$$

- When the variables are not random then this is not the definition?
- By linearity we have that: $\text{Cov[x,y]}=\mathbb{E}(xy)-\mathbb{E}(x)\mathbb{E}(y)$, with we could easily generalize to the [[Multivariate random variable|multivariate case]].
- So the first part it would be a double integral with a joint probabllity.
- This means the how they variate, the [[covariance synchronized|dance between each one.]]


[^1]: [[Mathematics for Machine Learning]] pp. 190

[^2]: 
