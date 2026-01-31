---
tags:
  - baby
date: "2025-11-29 21:42"
modified: 2025-08-06T23:12:25-05:00
---
It receive a batch of images, let's called $\mathbf{I}\in \mathbb{R}^{B\times C}$.

Where $B$ is the batch that images that enters and $C$ the channels of the image. 

Recall that naturally the robot has three cameras, is clear that the cameras have to make synchronized, in the sense that they have to give frames in the same time? At the same frame rate. **FPS**

So let's say that the camera has around 30 **FPS**. So the model have to generate 30 actions per second?

That is a good question the truth. 

So the input to the model  should be $3N\times FPS$ frames a second plus a language prompt $\ell$, which is constant, is tokenized and I am not sure if its embed to the representation dimension. Because there not exist that mapping. 

This is something that you can understand pretty well by looking the dataset.

The question that this guys are processed by something called **Pre processor**, what it does, how and why.