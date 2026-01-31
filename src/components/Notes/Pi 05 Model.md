---
tags:
  - baby
date: 2025-11-16 12:40
modified: 2025-12-28 18:33
---
Base Model: Google **Paligemma 2.7 B** , which use **SigLip** as [[Vision Encoder Main Function]] basically [[Vision Modeling CLIP]] but replacing the [[SoftMax Function]] with the [[Sigmoid Loss]]. [^1]

The [[Action Expert Pi Models|action head]] is initialized from **Gemma 3M**. 

**Main features**: Co training, hybrid multi-modal examples that combine image
observations, language commands, object detections, semantic
subtask prediction, and low-level actions

### Architecture
- [[Pi 05 Model Architecture]]
-  But the paper present this. But is clear that is over simplified, I want more insight.
- [[Pi 05 Model Training]]
- [[Pi 05 Model Pretraining]]
[[PI05_MASK]]

### Inference

And it uses knowledge insulation. [[Insulating Knowledge]]

### Semantic Sub task Prediction
- The main thing here are the subtask. But how they are generated. To the generation of the subs task we call **high level**. Whereas to the **low level** is the generation of continuous actions.

[^1]: [[Pi  0.5 Vision Language Action Model with open world generalization]]