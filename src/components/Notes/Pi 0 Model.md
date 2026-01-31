---
tags:
  - baby
date: 2025-11-01 02:32
modified: 2025-12-23 08:12
---
So a [[Vision Language Action Model VLA]] with a specific architecture: A [[Vision Language Model VLM]] like backbone and **action expert**. Trained in such a way that the gradients don't affect the VLM. [^1]

[[Pali Gemma Architecture|pali gemma]] $3B$ parameters + [[Experts for VLA|expert action]] $0.3B$ parameters. (Already trained)

Input models: (Observations).
$$ \mathbf{o}_{t}=[I^{1}_{t},\dots,I^{n}_{t},\ell_{t},\mathbf{q}_{t}] $$
Image, language (prompt), and the **propioceptive state**. ($t$ control step).

Initialize actions with noise, This is $A_{t}^{0}\sim \mathcal{N}(\mathbf{0},\mathbf{I})$.

[[Action Expert Pi Models]]

[^1]: [[Pi 0 A Vision-Language-Action Flow Model for General Robot Control]]
