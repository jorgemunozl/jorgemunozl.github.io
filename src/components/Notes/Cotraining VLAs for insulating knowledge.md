---
tags:
  - baby
date: 2025-12-26 07:54
modified: 2025-12-26 08:20
---
Use two [[Loss function]] one that basically is going to touch the [[Vision Language Model VLM]] and another for the [[Action Expert Pi Models]].

We can write a **Loss function** in two parts: The [[Auto regressive generation]], you create it using the [[FAST Tokenizer]]
$$
\mathcal{L}_{\text{AR-VLA}}=\mathbb{E}_{\mathcal{D},\tau,\omega} \left[   - \sum_{j=1}^{n-1} M_j^{\ell} \log p_{\theta}(\hat{\ell}_{j+1} | x_{1:j})\right]
$$
Where $M^{\ell}_{j}$ is a lnau
And a loss for the **Action expert**, which is not going to directly influence to the VLM. 
$$ \mathcal{L}_{\text{FLOW-VLA}}(\theta) =  \mathbb{E}_{\mathcal{D},\tau,\omega} ( \alpha M^{\text{act}} \| \omega - a_{1:H} - f_{\theta}^a(a_{1:H}^{\tau,\omega}) \|^2) $$




$$ \mathcal{L}_{\text{CO-VLA}}(\theta) =  \mathcal{L}_{\text{VLM}} + \mathcal{L}_{A} $$