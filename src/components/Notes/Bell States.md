---
tags:
  - baby
date: 2025-10-11 10:38
modified: 2025-10-20 17:03
---
They are important for [[Two Qubits]]
$$
\begin{align}
 \phi ^{+}=(\ket{00} +\ket{11} )\frac{1}{\sqrt{ 2 }}  \\
 \phi ^{-}=(\ket{00} -\ket{11} )\frac{1}{\sqrt{ 2 }}  \\
 \psi ^{+}=(\ket{01} +\ket{10} )\frac{1}{\sqrt{ 2 }} \\
 \psi ^{+}=(\ket{01} -\ket{10} )\frac{1}{\sqrt{ 2 }} \\
\end{align}
$$

- The question relies on how you do it using [[Quantum Gates]], you have to use the [[CNOT Quantum Gate]] and the [[Hadamard Gate]] and the [[Pauli Matrix X as a quantum gate].
- You can obtain $\ket{\phi ^{+}}=CNOT\times(H\otimes I)\ket{00}$.