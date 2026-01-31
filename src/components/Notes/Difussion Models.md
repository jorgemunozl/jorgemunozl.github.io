---
tags:
  - baby
author: Jorge
date: 2025-07-22 20:19
modified: 2025-11-06 09:51
---
Okay, when a model generates an image how they do it.

>But here all your trained, looks like also parameters? Yeah they called (U-Net/Transformer).

Imagine that they initialize at random the values of that tensor and a model in such a way generate an image.
 
I mean it have sense that instead of create a random from a one shot, you take more time and more steps.

To this noise how is it that you change for generate a image from a Dog? Of course that first you have to train to your model,  but how?

You have a image of a dog, and you have to transform it on Noise by sequences.

Some thought is that the data it have already few "entrophy" and the noise a ton of "entrophy", we can consider this a cost function.


Of course that here we are talking about images. But the more general case [[Diffusion Problem]]

And you actually learn the total noise $\epsilon$. I don't get it.

- And here the must are DDPM
- DDIMs

[[Step by step Diffusion An Elementary Tutorial]]