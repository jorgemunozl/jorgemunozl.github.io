---
tags:
  - baby
date: 2025-11-16 19:08
modified: 2025-12-28 18:33
---
>[!definition]
>The **action expert** for the models from **physical intelligence** are a [[Transformer]] (in practice initialized with the **Gemma** structure) which from noisy actions chunks create embedding actions using a learned [[Flow matching for VLAs|flow field]].

The field is guided by more specifically by **VLM**, from their **preffix** and [[Key Value Cache]].  More formally: [^1]

Let $\tau \in[0,1]$ be the **flow matching step**, $t$ the [[Time for VLA's|time index]],  $\mathbf{A}_{t}=[\mathbf{a}_{t},\mathbf{a}_{t+1}, \dots ,\mathbf{a}_{t+H-1}]$. The **expert** vector field $v_{\theta}(\mathbf{A}_{t}^{\tau},\mathbf{o}_{t})$ learned in the training, and integrate to generate actions. (via **euler integration**, in this case).
$$
\mathbf{A}_{t}^{\tau+\delta}=\mathbf{A}_{t}^{\tau}+\delta \mathbf{v}_{\theta}(\mathbf{A}_{t}^{\tau},\mathbf{o}_{t})
$$
Output Model, denoise action $\tau=1$:
$$ A_{t}=[a_{t},\dots,a_{t+H-1}],H=50, \text{ hertz} $$
Important the states, and action space. [[Images State]]
$$
\begin{align}
I_{t}^{1}&\in \mathbb{R}^{H\times W\times3} \\
\ell_{t}&\in \mathbb{R}^{d} \\
\mathbf{q}_{t}&=[\theta_{1},\theta_{2},\theta_{3},\dots,\theta _{6}]^{T}
\end{align}
$$



In the training works different. [[Training the action expert Pi 0 Model]].


So for **pi zero 0.5** it should be able to make two things the high and low level part! How it exactly looks like? Is a smaller transformer What are the inputs? The [[Logit]].  The positional encoding is also important.  What are the outputs? 

[^1]: [[Pi 0 A Vision-Language-Action Flow Model for General Robot Control]] pp. 5
