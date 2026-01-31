---
tags:
  - baby
date: "2025-11-12 17:36"
modified: 2025-08-06T23:12:25-05:00
---
So [[Qubits, main piece of Quantum Computing]] can teleport. Interesting

What **Phase Kickback** is? So its basically factorize a sign minus. Altough that is kind of tricky because there you have a [[tensor product]]. $$
\text{CNOT}(\ket{a} \otimes \ket{-} )=\ket{a} \otimes X^{a}\ket{-} 
$$
$$
=(-1)^{a}\ket{a} \otimes \ket{-} 
$$
If the target is on $\ket{-}$, $CNOT$ don't change of target and "retrocede" una fase (-1). Just with that target.

Circuito DJ? 

What $a=3$ sense?

**Deutsch**, tell you what kind of algorithm is. It is constante of balanceada.

Rules: Use the least amount of consultas.

Solucion Clasica. cuantas consultas tienes que hacer? dos si es constante o clasica.
Quantum Solution. How you do it? Use a Unitary gate.

$$
U_{f}\ket{x} \ket{y} =\ket{x} \ket{y\oplus f(x)} 
$$
But use kick back guy. This is:
$$
U_{f}\ket{x} \ket{-} =(-1)^{f(x)}\ket{x} \ket{-} 
$$

In practice: 
1. Start with $\ket{01}$
2. Apply $H$ in both qubits. $\ket{+-}$
3. Ask to the oraculo. 

And with some faith: you obtain that,

$$
\frac{1}{\sqrt{ 2 }}\begin{bmatrix}
(-1)^{f(0)} \\
(-1)^{f(1)}
\end{bmatrix}
$$

Apply hadamard: 

$$
\frac{1}{2}\begin{pmatrix}
(-1)^{f(0)}+(-1)^{f(1)} \\
(-1)^{f(0)}-(-1)^{f(1)}
\end{pmatrix}
$$
If f is constant: Obtain that:

$$
(-1)^{f(0)}\ket{0} 
$$
This means that you always measure zero, because the global phase doesn't care. 
If it is balance: One specific case, of course:

$$
(-1)^{f(0)}\ket{1} 
$$

We always measure at $\ket{1}$ con 100 de prueba, one time and you know it! How is that even possible? what? Where is speciffically the magic? the [[superposition]]

1986, pedagogical , the first quantum supremacy?



The

Funcion balencia:

$$
f:\{ 0,1 \}\to \{ 0,1 \}
$$
Garantia $f$ is constante o balenceada. Constante clear, clear ,the other a line. 

**Deutch Jozsa**. 1992
$$
f:\{ 0,1 \}^{n}\to \{ 0,1 \}
$$
$$
H^{\otimes n}\ket{0} ^{\otimes n}=\left( \frac{1}{\sqrt{ 2 }}(\ket{0} +\ket{1} ) \right)^{\otimes n}=\sum_{i=0}^{2^{n}-1} \ket{i} 
$$



And hos is this related to [[superdense coding]] what does it means?