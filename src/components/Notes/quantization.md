---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-10 18:04
modified: 2025-11-06 10:07
---
And yes reduce the quantity of [[Byte]] to the numbers to increase the velocity of use of these but of course the performance of the models decay, it's a good technique if you have a poor hardware.
I guess that in somehow you cut the numbers. I mean it sounds easy but in the practical to create a package for make this is really complex I don't know.

In [[DeepSeek-V3 Technical Report]] it's talked about this. (Complex)

|Format|Bits|Representation type|Typical use|Pros|Cons|
|---|---|---|---|---|---|
|FP32|32|full floating-point|baseline/training|lots of precision & range|heavy memory, compute|
|FP16 / BF16|16|half-precision floating|many models for training/inference|good compromise|less precision/range than FP32|
|INT8|8|integer|quantized inference|small size, fast|very limited range/precision|
|FP8|8|floating (exponent+mantissa)|modern inference/training|better range than INT8, small size|still challenging, hardware must support|
|INT4|4|integer|extreme quantisation/inference|tiny footprint|severe precision/range restrictions|
|FP4|~4|floating (minifloat)|bleeding-edge training/inference|ultra-small size|very risky, needs clever techniques/hardware support|