---
tags:
  - baby
date: 2025-11-04 15:58
modified: 2025-11-05 19:46
---
We stop the gradients from the [[Experts for VLA]] to reach the [[Vision Language Model VLM]].  [^1]

Problems:
1. [[Auto regressive generation]] VLAS are slow.
2. Robots adapters don't leverage that much the [[Vision Language Model VLM]] backbone.
3. The pre- training of the VLM in general doesn't fit with the robotics. Matters.  I mean when you train the action expert, that makes the VLM worse. A first approach would be freeze the parameters, but that doesn't work? [^2]
Solutions:
4. Autoregressive only used on at training time.
5. Train on non-action datasets.
6. Stop gradient flow. How? sg on the attention operations?



[^1]: [[Knowledge Insulating Vision-Language-ActionModels Train Fast, Run Fast, Generalize Better]]

[^2]: Figure 4.a and figure 8
