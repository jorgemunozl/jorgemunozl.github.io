---
tags:
  - baby
  - ml
author: Jorge
date: "2025-04-29 14:29"
---

The query is ts asking if exist adjectives in front of a noun, the key vector is answer that question. (All implicitly of course, encoded in the values of the matrix).
- For each head we have one a unique $W_{Q}$ and $W_{K}$. 
- On each attention head operates on **smaller subspace** of the full model dimension.
- Creating the key and query vectors is something that happen on the RAM they are momentary.
- The dimension of the query and key vector are determined by the _dimension model (quantity of parameters)_ the numbers of _heads_ and the "head dimension"
