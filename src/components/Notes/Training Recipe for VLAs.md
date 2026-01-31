---
tags:
  - baby
date: 2025-11-04 13:35
modified: 2025-12-25 21:57
---
In some model the inference and the training are basically the same. But for [[Vision Language Action Model VLA]] this is not necessarily true:



You want to learn a probability distribution: 
$$ p(\mathbf{A}_{t}|\mathbf{o}_{t}) $$

Is an action chunk:
And $\mathbf{o}_t$ a observation which is images, the prompt and $\mathbf{q}_{t}$.
Create noisy actions: $\epsilon \sim \mathcal{N}$.
$$ \mathbf{A}_{t}^{\tau}=\tau \mathbf{A}_{t}+(1-\tau)\epsilon $$

$$ \frac{\partial \mathbf{A}^{\tau}_{t}}{\partial \tau}=\mathbf{A}_{t}-\epsilon $$
and the denoising vector field:
$$ \mathbf{u}(\mathbf{A}^{\tau}_{t}|\mathbf{A}_{t})=\epsilon-\mathbf{A}_{t} $$
Coincide.

Feed it, to the network to train $v_{\theta}(A^{\tau}_{t},o_{t})$ to match the denoising vector field. $u(\mathbf{A}_{t}^{\tau}|\mathbf{A}_{t})$.


