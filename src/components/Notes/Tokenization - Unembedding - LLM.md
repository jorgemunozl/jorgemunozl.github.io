---
tags:
  - baby
author: Jorge
date: "2025-02-07 13:16"
---
Suppose that we have already a form of doing the [[Tokenizer|embedding]] (exist different methods).
Now of course we have to be able to unembedding these vectors to bring it to human language.
First we initialize a matrix at random values and we train it (_somehow_) in such a way that this matrix called ___unembedding matrix___ $W_{U}$ multiplied by the [[Choose - final hidden state of the last token|final hidden state of the last token that is vector]] give us a vector that applying the [[Soft-Max Activation peaks or smooth]] give us the _probability_ of the follow would appear.

Naturally we choose the one with most probability, but also you can play with that.

In this process [[Logit]] appear, $h$ be said vector and $b$ a optional bias,  whose formula is:
$$
logits=W_{U}\cdot h+b
$$

>Now it's possible that $W_{U}=(W_{E})^{T}$ have its pros and cons

In the case that we have to train the unembedding matrix this would add new parameter, in the case of ChatGTP is :50,257 * 12,288 = 617,558,016 parameters.
