---
tags:
  - baby
author: Jorge
date: 2025-03-30 01:51
---
>[!definition]
>Let $f$ be a _function_: $f:\mathbb{R}\to \mathbb{R}^{n}$, such that $f(x)=[f_{0}(x),\dots,f_{n}(x)]$ we called to $f_{i}$ a component, (all the work relies on these), and $f$ is often called [[A practical way of talk of paths. Mathematically|parametric curve]].  

- [[Trace and graph]] are some definitions useful to talk about the "range".
- [[derivative parameterization]]
#### Limit
Let $t_{0}$ be a **_accumulation** **point_** of the domain (when we talk [[Accumulation Point - Real|accumulation point]], this works exactly that real function), the limit of the function when $t$ tends   
to $t_{0}$ is the vector $\vec{L}$ if: (Basically the same but here we use the [[Euclid Norm, product]])
$$
\forall \varepsilon >0,\ \exists  \delta>0, t\in D,0<\lvert t-t_{0} \rvert<\delta \implies\lVert f(t)-\vec{L} \rVert<\varepsilon 
$$
#### Continuity
The function is continuous on $t_{0}\in D$. Exactly the same.

$$
\forall \varepsilon >0,\ \exists  \delta>0, t\in D,\lvert t-t_{0} \rvert<\delta \implies\lVert f(t)-f(t_{0}) \rVert<\varepsilon 
$$

#### Chain Rule
Let $\phi:J\to I$ a [[Real function]] on $a$, and $f:I\to \mathbb{R}^{N}$ differentiable on $\phi(a)$. Then:
$$
(f\circ\phi)'(a)=\phi'(a)f'(\phi(a))
$$
#### Integration
Work equal than a the [[Real function]].
#### Example
In three variables:
$$
\begin{align} 
x(t)&=f(t) \\
y(t)&=g(t) \\
z(t)&=h(t), \quad t \in [a,b]
\end{align}
$$

Is very important to talk of [[Path]] when we talk of parametric curves.
