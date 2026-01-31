---
tags:
  - baby
date: 2025-11-09 20:34
modified: 2025-11-10 14:00
---
Okay this approach has on his heart [[Reinforcement Learning]].

So if we put a label to the stage of the robot manipulation then if the model knows that improve his performance.

First we are going to see how they do it and then, why.

Sub task prior: Think of like a weight.

$$ \overline{\alpha}_{k}=\frac{1}{M}\sum_{i=1}^{M}\frac{L_{i,k}}{T_{i}} $$

Now for a frame $t$ in a subtask $k$ with bounds $[s_{k},e_{k}]$ define the within-subtask (a progress bar on the subtask!). and the prior. I guess that this give a sensation of time to the model but who decides how much a task longs?

$$ y_{t}=P_{k-1}+\overline{\alpha}_{k}\tau_{t}\in[0,1] $$

Where:

$$ \tau_{t}=\frac{t-s_{k}}{e_{k}-s_{k}} \in[0,1] $$

So here exist also a Stage Estimator and a Sub task Estimator. Why I want each?


Okay. So they a CLIP encoder. 

[^1]

[^1]: [[SARM Stage Aware Reward Modeling for Long Horizon Robot Manipulation]]
