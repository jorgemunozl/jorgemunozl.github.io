---
tags:
  - baby
date: 2025-11-02 15:33
modified: 2025-11-06 11:45
---
[[Auto regressive generation]] was the way to generate actions.
- First introduced: Robotics Transformers, RT1-RT-2. Using [[Tokenizer|tokens]],  treat actions as sequences. and use AR over them.
The **problem** , is too slow, each action add more delay, good for language, a pain for continuous systems.

- So we need a more faster way to generate actions: There were diffusion based approach shines: Learn a vector field were we can generate a ton of actions at once.
- 
Learn the velocity from, you integrate it to obtain the position. e.g via Euler.
$$ \mathbf{A}_{t}^{\tau+\delta}=\mathbf{A}_{t}^{\tau}+\delta \mathbf{v}_{\theta}(\mathbf{A}_{t}^{\tau},\mathbf{o}_{t}) $$
Now there are also hybrid approaches are good options also:

Use **AR** for symbolic low rate tasks e.g High Level Reasoning (1-5 Hz), perception and planning (30 Hz)

and diffusion/flow for continuous high rate control,  eg Real-time control framework (100Hz-1Khz)

Ok, so the question is wonder [[action generating for vlas]]