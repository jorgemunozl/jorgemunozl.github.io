---
tags:
  - baby
date: 2025-12-23 17:23
modified: 2025-12-31 19:49
---
The distribution [[Policy RL]] can be written as: [^1]
$$ \pi_{\theta}(\mathbf{a}_{t:t+H},\hat{\ell}|\mathbf{o}_{t}, \ell) $$
Here $\ell$ represents the overall prompt, and $\hat{\ell}$ represents the model tokenized textual output. That it could be a predicted high-level subtask or the answer to a vision-language prompt (what? That is even possible?) What web data means?.

The magic comes with:
$$ \pi_{\theta}(\mathbf{a}_{t:t+H},\hat{\ell}|\mathbf{o}_{t},\ell)=\pi_{\theta}(\mathbf{a}_{t+t +H}|\mathbf{o}_{t},\hat{\ell})\pi_{\theta}(\hat{\ell}|\mathbf{o}_{t},\ell) $$
So your output model is just the that smart product.

Now the **Paligemma** should be able to generate both, actions tokens using the [[FAST Tokenizer]]. For that matter is going to be necessary a Vocabulary which is composed of the two tokenizer, including the **PaliGemma vocabulary**.



[^1]: [[Pi  0.5 Vision Language Action Model with open world generalization]]
