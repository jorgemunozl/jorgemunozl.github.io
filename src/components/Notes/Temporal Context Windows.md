---
tags:
  - baby
date: 2025-12-26 15:49
modified: 2025-12-26 15:51
---
In [[large language model]] this would be called forgetting, but here is good. If we attend to all the the previous images and actions (?) the computational would don't allow us to work with the necessary frequency.

Just imagine it, let's say that the camera works at 10 FPS along one minute that it would be 600 images.

Is not important to attend to the first images when you are at the end.

So we the context that we use is short, only we observe the last two frames.

In practice we talk about about `delta_timestamps`, you decide what tokens do you want to attend.

On real time inference, you don't have a dataset with past frames ready to go. You have to maintain a **deque** (doble end queue) to act as a buffer.

Some models like Paligemma only use the last state, is expensive to run this models.
