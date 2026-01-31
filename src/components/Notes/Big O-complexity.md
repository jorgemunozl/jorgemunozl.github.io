---
tags:
  - baby
author: Jorge
date: 2025-04-06 16:00
modified: 2025-09-14 06:22
---
We know that a double `for` has a computational cost of $\mathcal{O(n^{2})}$ 
But what does it mean?

What does it mean spatial and temporal complexity. [[spatial and temporal complexity]].

Is about measure the asymptotic behavior of functions. What does it mean?


Un algorithm has complexity $\mathcal{O(f(x))}$ estamos diciendo que el tiempode ejecucion (o el uso de memorio u otro recurso) creace a lo sumo como una constante por f(n), obviamente nos interesa cuando $n$ se hace grande.

Osea que es una cota superior asistontica., el algoritmo no sera mas lento que eso.

Definicion We say that 
$$
f(n)\in \mathcal{O}(g(n))
$$
then exist a constant, if exist constant $C>0$ and $n_{0}$ such that. 

$$
\lvert f(n) \rvert\leq C.\lvert g(n) \rvert \forall n\geq n_{0}  
$$

This is also part form a family of functions that wikipedia say but I actually not interested.

And I think that for a computer science is like trivial say the complexity of well known algorithms