---
tags:
  - baby
  - ml
author: Jorge
date: "2025-04-10 18:04"
---
When we talk about quantization of **AI literature** we refer to the act to reduce the precision of the float numbers, this is cut the [[Bytes for computation|bites]].

By doing it, it increases the velocity of inference/training since the quantity of calculations is less (or at least that I guess) but of course the accuracy of the models decay, it's a good technique if you have a poor hardware.

The implementation we have it on [transformers](https://huggingface.co/docs/transformers/index) inside.

I mean forms part of the wide range of tools that allows us to use [[LLM's|llm's]] not high-eng GPUs. Llama.cpp

In [[DeepSeek-V3 Technical Report]] talk about a nice to implement.