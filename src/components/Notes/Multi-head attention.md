---
tags:
  - baby
author: Jorge
date: 2025-02-07 15:16
---
When we refer to multi-headed attention we are referring to a set of [[Self attention mechanism on one head|single heads]].

Conceptually talking each _attention head_ focus in different aspect of the input.
For instance one can focus on the grammar, another in adjectives, another in places, of course like all the process this emerge from learning and it's implicit on the respective matrices.

It's the need extract the maximum quantity of context from many angles in parallel. Only use a head it would be very linear.

It's important to remember that each head had it's own parameter for the [[Query and Key on Attention]] and [[Values - LLM]], these are completely independently one form each other. One reasons that they finish with different values is that they born with _random initialisation_.(training define them) 

**Multi-head attention** works splitting the input into multiple parts and applies **separate attention mechanisms** in parallel once finish we know that each head "return" a vector, the sum of each of these vector is like the "context". The sum of the word and this vector return the true meaning of the word.

[[Multi head latent attention]]

[[Where do facts live]]
[[Multitoken prediction]]
[[Mixture of experts]]
