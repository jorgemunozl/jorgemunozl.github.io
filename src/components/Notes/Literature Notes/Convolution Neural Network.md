---
tags:
  - baby
  - ml
author: Jorge
date: 2025-01-13 21:17
modified: 2025-12-05 14:22
---
So here we learn the values of the [[kernel convolution]].

Think on a one dimensional input, you learn a one dimensional kernel, which maps your one dimensional vector to another, practical use of this? They are pretty similar to NN in that cases of it. [^1]

Here the main type of input data are images and of course the output are also images.
When we talk of images on programming we are referencing a array with height, width and three channel to colors, or we can use only gay to black and white images.

A kernel that it's a matrix of lower dimension go trough the image, this extract patterns of the image like edges, textures or other features. 
For each step that it take on the image devolves a pixel, thus we obtain the output.

The image result of all these processes is the _feature map_, and the nature of this depends on the values of the _kernel_.

I mean this open a huge set of questions, how the I.A knows what a rabbit is? 

How relate token with images. 


[^1]: [[Deep Learning]] pp. 359.
[[Neural Networks and Deep Learning]]