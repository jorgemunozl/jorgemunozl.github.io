---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-29 14:35
modified: 2025-09-25 10:59
---
Allows token attend each others in parallel.

The _parallelisation_ it's possible for the [[Gpu paralellism-deep learning-computational costs]],it's perform in the _multi head attention_ task

Basically (_inference_), give it a set of words in its vector form, apply this mechanism makes change the values of the vector by summing vector, a single head make change a little, but the sum of many heads change considerably the words. [[Multi-head attention]].

This is vector that change the meaning of the words is obtained by **Attention Formula**. 