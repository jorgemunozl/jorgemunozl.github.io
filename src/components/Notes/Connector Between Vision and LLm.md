---
tags:
  - baby
author: Jorge
date: 2025-08-13 10:47
modified: 2025-08-15 15:35
---
We need to connect the visual tokens, from the [[Vision Encoder Main Function|vision encoder]] output with the [[large language model]]. 

The fact is that exist a good examples of this:
- A simple [[linear projection visual tokens|linear projection]]
- The [[MLP projector]] scaled by Llava.
- The [[Cross attention adapter]] from the [[Llama Vision Instruct 3.2]] model.
- And the BIP one.