---
tags:
  - baby
author: Jorge
date: 2025-03-05 14:02
modified: 2025-08-16 15:13
---
Here apart from specific task experts also exist experts that are multitask, the output is given by:

$$
\mathcal{F}^{MoE}_{Share d}(\mathbf{x},\Theta,\{ W_{i} \}^{N+M}_{i=1}) =\sum_{i=1}^{M}  \mathcal{G}_{i,t}(x,\Theta)f_{i}(x,W_{i}) + \sum_{j=M+1}^{n}\mathcal{G}_{j,t}(x,\Theta)f_{j}(x,W_{j}) 
$$

And I don't know if it have sense! Ah!

Suppose that you have $M$ shared experts, $N$ specific experts.
We are introducing that T for one reason that is for introduce a task, of course you can simply ignore this, but if you are in project with multiple task then it's better use this, the idea is that exist experts that always are using. Of course that here you can use many variation at the end you want to do what you want.
