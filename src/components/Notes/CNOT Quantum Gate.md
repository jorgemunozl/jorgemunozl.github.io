---
tags:
  - baby
date: 2025-10-11 11:53
modified: 2025-10-11 15:51
---
What it does is flip. [^1]. To the first [[Two Qubits|qubit]] we call **control** to the second qubit **target**. If the first one is $0$ then the second stays the same. If the first is $1$ then the second flips $0$.
$$
\text{CNOT} = \begin{bmatrix} 1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}
$$

Thinking on a circuit, how it exactly happens?

[^1]: [[Quantum Computing and Information Nielsen]] pp. 55
