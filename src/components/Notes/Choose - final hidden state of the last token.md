---
tags:
  - baby
author: Jorge
date: "2025-02-07 13:35"
---
Now the natural question is Why choose the final hidden state of the last token and not choose the one with the word that gives most context.

The reason is because the last contain all the contextual information of others.
We choose the final hidden state of the last token because contains all the textual information from the previous word.
Because text process is sequential. text generation
(this is very related to _auto-regressive_ generation- masked tokens)


**Auto-regressive generation** is a method where a model generates text **one token at a time**, using previously generated tokens as context for predicting the next one.


[[Auto regressive generation]]