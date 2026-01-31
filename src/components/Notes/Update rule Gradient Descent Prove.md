---
tags:
  - baby
date: 2025-10-15 10:21
modified: 2025-10-15 11:23
---

$$
\begin{align}
\mathcal{L}(\theta_{t}+\Delta \theta) & \approx \mathcal{L}(\theta_{t})+ \nabla_{\theta}\mathcal{L}(\theta_{t})^{T}\Delta \theta \\
 & \approx \mathcal{L}(\theta_{t})+\Delta \mathcal{L}
\end{align}
$$

$$\Delta\theta =\epsilon \vec{u}=-\epsilon \nabla_{\theta}\mathcal{L}(\theta_{t})$$
$$
\theta_{t+1}-\theta_t=-\epsilon \nabla \theta \mathcal{L}(\theta_{t})
$$

$$
\theta_{t+1}=\theta_{t}-\epsilon \nabla \theta \mathcal{L}(\theta)
$$

$$
\begin{align}
\Delta \mathcal{L} & =\nabla_{\theta}\mathcal{L}(\theta_{t})\cdot-\epsilon \nabla_{\theta}\mathcal{L}(\theta_{t}) \\
\Delta \mathcal{L} & =-\epsilon \nabla_{\theta}\mathcal{L}(\theta_{t})\cdot \nabla_{\theta}\mathcal{L}(\theta_{t})=-\epsilon \lVert \nabla_{\theta}\mathcal{L} \rVert ^{2}
\end{align}
\ll

$$