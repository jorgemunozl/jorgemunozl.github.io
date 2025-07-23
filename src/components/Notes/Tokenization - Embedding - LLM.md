---
tags:
  - baby
  - ml
author: Jorge
date: "2025-02-07 08:34"
---
Because you could train your own tokenizer , that is not amazing?

We need to talk about the [[Bite Pair Algorithm]], that is the first part, once that you convert a "line" of words into tokens then you use that numbers to convert into to matrix or tensors ...

>And just about this days days (12 July) there is another kind of technology that proposes to replace to Tokens, which is  H-NET [https://arxiv.org/abs/2507.07955](https://t.co/AVW1RtyRAY) I think that the most important relies on the optimization make more cheaper and fast.

Practically only cares the [[Embedding matrix]]

Give to each human word a number, of course the word must be in the most primitive form . The obvious problem is that in general one word has many means. The context, the other words around matter. And if it's a large text even more. 

This is apart of only give a vector to a word is necessary to give the position in the text, add more complexity.
But I do not understand, what vector choose, to multiply this matrix?

_We are going to talk first how could work a autocomplete._

If a word represents a vector we could see it, if the vector only have three parameters , the would a vector on three dimensional space that we know.

About the nature of the vector, the vector home and the vector house would equal or similar?

Are similar I think, if we would able to visualize it, they would have a similar 
directions

And I think that thinking it isolate is something that everyone could think. 

How did it not occur to me before.?

How we could measure the similarity between two vector? [[Dot Product]]

[[Tokenization - Unembedding - LLM]]


[[Positional encoding - Sinuidal]]