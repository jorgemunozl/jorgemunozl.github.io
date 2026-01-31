---
tags:
  - baby
date: 2025-10-13 14:12
modified: 2025-10-15 09:38
---
You have:
$$
\begin{align}
\mathbf{a}^{(2)} = \mathbf{W}^{(2)}\mathbf{x}^{(1)}+\mathbf{b}^{(2)} \\
\mathbf{a}^{(3)} = \mathbf{W}^{(3)}\mathbf{a}^{(2)}+\mathbf{b}^{(3)}
\end{align}
$$
Then:
$$
\begin{align}
\mathbf{a}^{(3)}  & = \mathbf{W}^{(3)}(\mathbf{W}^{(2)}\mathbf{x}^{(1)}+\mathbf{b}^{(2)})+\mathbf{b}^{(3)} \\
\mathbf{a}^{(3)}  & = \mathbf{W}^{(3)}\mathbf{W}^{(2)}\mathbf{x}^{(1)}+\mathbf{W}^{(3)}\mathbf{b}^{(2)}+\mathbf{b}^{(3)} \\
\mathbf{a}^{(3)}  & = \mathbf{W}{x}^{(1)}+\mathbf{b}
\end{align}
$$

But if we use [[Activation function]] we have:

$$
\begin{align}
\mathbf{a}^{(2)} & = \sigma(\mathbf{\mathbf{z}}^{(2)})  =\sigma(\mathbf{W}^{(2)}\mathbf{x}^{(1)}+\mathbf{b}^{(2)}) \\
\mathbf{a}^{(3)}  & = \mathbf{z}^{(3)}= \mathbf{W}^{(3)}\mathbf{a}^{(2)}+\mathbf{b}^{(3)}
\end{align}
$$

More precise:

$$
\begin{align}
\mathbf{a^{(2)}}=\sigma ^{(2)} & (\mathbf{z}^{(2)})\land \mathbf{a^{(3)}}=\sigma ^{(3)}(\mathbf{z^{(3)}})
\end{align}
$$

Finally:
$$
\begin{align}
\mathbf{a}^{(3)}  & = \sigma ^{(3)}(\mathbf{W}^{(3)}\sigma ^{(2)}(\mathbf{W}^{(2)}\mathbf{a}^{(1)}+\mathbf{b}^{(2)})+\mathbf{b}^{(3)} )
\end{align}
$$

This is: (We have to see it like function)
$$
\begin{align}
  \mathbf{a}^{(3)}  & = \sigma ^{(3)}\circ \mathbf{z}^{(3)}\circ \sigma ^{(2)} \circ \mathbf{z}^{(2)} \\
\mathbf{a}^{(L)} & =\sigma^{(L)}\circ \mathbf{z}^{(L)}\circ\dots \circ\sigma ^{(2)}\circ \mathbf{z}^{(2)}
\end{align}
$$

For more than one single Layer?

Doing: 
$$
f^{(l)}=\sigma ^{(l)}\circ \mathbf{z}^{(l)}
$$

$$
\mathbf{a}^{(L)}=f^{(L)}\circ f^{(L-1)}\circ\dots \circ f^{(1)}(\mathbf{a^{(1)}})
$$

$$
\begin{align}
\mathbf{a}^{(L)}=\mathbf{z}^{(L)}\circ \sigma ^{(L-1)}\circ \mathbf{z}^{(L-1)}\circ \sigma ^{(L-2)}\circ \dots.
\end{align}
$$
For our paremeters:

$$\{ \mathbf{W}^{(l)},\mathbf{b}^{(l)}\}_{l=2}^{L}=\theta$$

Now take the derivatives of  this: [[Chain rule for Neural Networks]]
