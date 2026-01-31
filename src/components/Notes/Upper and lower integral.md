---
tags:
  - baby
author: Jorge
date: 2025-04-06 16:04
modified: 2025-08-15 14:56
---
>[!definition]
>Let a [[Real function]] bound $f_:[a,b]\to \mathbb{R}$,  the _upper integral_ is and a [[Partition for a one dimension function|partition]]. [^1]
>$$\overline{\int_{a}^{b}}f(x)dx=sup_{P} s(f,P)$$
The _lower integral_ analogously is:
$$
\begin{align} 
\underline{\int_{a}^{b}}f(x)dx & =inf_{P}S(f,P) \\
s(f,P) & =\sum_{i=1}^{n}m_{i}(t_{i}-t_{i-1}) \\
S(f,P) & =\sum_{i=1}^{n}M_{i}(t_{i}-t_{i-1}) \\
m_{i} & =inf\{ f(x):t_{i-1}\leq x\leq t_{i} \} \\
M_{i} & =sup\{ f(x):t_{i-1}\leq x\leq t_{i} \}
\end{align}
$$

[^1]: [[Analisis Real Elon Lages]] pp. 150
