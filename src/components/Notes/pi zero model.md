---
tags:
  - baby
date: 2025-11-01 02:32
modified: 2025-11-04 15:41
---
So a [[Vision Language Action Model]] with a specific architecture: A [[Vision Language Model VLM]] like backbone and **action expert**. Trained in such a way that the gradients don't affect the VLM.

[[Pali Gemma Architecture|pali gemma]] $3B$ parameters + [[Experts for VLA|expert action]] $0.3B$ parameters. (Already trained)

Input models: (Observations).
$$ \mathbf{o}_{t}=[I^{1}_{t},\dots,I^{n}_{t},\ell_{t},\mathbf{q}_{t}] $$
Image, language (prompt), and the **propioceptive state**. ($t$ control step).

Initialize actions with noise, This is $A_{t}^{0}\sim \mathcal{N}(\mathbf{0},\mathbf{I})$.

Use a **vector field** $v_{\theta}(\mathbf{A}_{t}^{\tau},\mathbf{o}_{t})$ learned in the training, and integrate to generate actions. (Via **Euler Integration**, in this case).

$$
\mathbf{A}_{t}^{\tau+\delta}=\mathbf{A}_{t}^{\tau}+\delta \mathbf{v}_{\theta}(\mathbf{A}_{t}^{\tau},\mathbf{o}_{t})
$$



$$
\begin{align}
I_{t}^{1}&\in \mathbb{R}^{H\times W\times3} \\
\ell_{t}&\in \mathbb{R}^{d} \\
\mathbf{q}_{t}&=[\theta_{1},\theta_{2},\theta_{3},\dots,\theta _{6}]^{T}
\end{align}
$$

Output Model:

$$
A_{t}=[a_{t},\dots,a_{t+H-1}],H=50, \text{ hertz}
$$