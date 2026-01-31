---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-29 14:29
modified: 2025-10-19 11:41
---
The query is ts asking if exist adjectives in front of a noun, the key vector is answer that question. (All implicitly of course, encoded in the values of the matrix). [^1]

Now let's relate this idea to the [[Key Value Cache]], if the **key** just can look at the past, why recompute it again? And the values are the same so its has all the sense.

Now it the training we use this trick? I don't think so. [[Use of batch in Deep Learning]].
[[Key Value Cache Training]]


- For each head we have one a unique $W_{Q}$ and $W_{K}$. 
- On each attention head operates on **smaller subspace** of the full model dimension.
- Creating the key and query vectors is something that happen on the RAM they are momentary.
- The dimension of the query and key vector are determined by the _dimension model (quantity of parameters)_ the numbers of _heads_ and the "head dimension"

[^1]: [[Natural Language Processing with Transformers]] pp. 14
