---
tags:
  - baby
date: 2025-11-13 14:19
modified: 2025-11-13 14:22
---
So you take [[Hilbert Space Spin 1]] and then [[Hilbert Space Spin 1 2]] and take the [[tensor product]] and obtain a place where you can describe both particles: That's is useful?

First the space is: $\mathcal{H}_{\frac{1}{2}}\otimes \mathcal{H}_{1}$.

The basis of this space is:

$$ \mathcal{B}=\{ \ket{+}  \ket{1,1} ,\ket{+}\ket{1,0} ,\ket{+} \ket{1,-1} ,\ket{-}\ket{1,1} ,\ket{-}\ket{1, 0},\ket{-}\ket{1,-1}  \}
$$

Each one well defined. But lazy to write.
So easy ones are:
$$
\ket{+}\ket{1,1} =\ket{\frac{3}{2}, \frac{3}{2}}  
$$
$$
\ket{-} \ket{1,-1} =\ket{\frac{3}{2}, -\frac{3}{2}} 
$$
But what about the another four, that begin with $j=\frac{3}{2}$. And the what about when it begin with $j=\frac{1}{2}$, two the lacks. How you obtain them? I mean if you apply $J$ to the first, and also the last right?
To obtain the rest of the eigen states you make:
$$
\hat{J}_{-}\ket{\frac{3}{2},\frac{3}{2}}=\sqrt{3}\ket{\frac{3}{2}, \frac{1}{2}} =\frac{1}{\sqrt{ 3 }}\ket{-} \ket{1,1} +\sqrt{ \frac{2}{3} }\ket{+} \ket{1,0} 
$$

So you got it, the same for:
$$
\ket{\frac{3}{2},-\frac{1}{2}} =\frac{1}{\sqrt{ 3 }}(\sqrt{ 2 }\ket{-} \ket{1,0} +\ket{+} \ket{1,-1} )
$$
There is some tricks with, but here the interesting is that here you use $\hat{J}_{z}$, to obtain it. Is just the fact that the operator $J$ is [[Hermitian Operators]], so their eigenvector should be orthogonal, and that $m_{s}+m_{\text{l}}=\frac{1}{2}$.
$$
\ket{\frac{1}{2},\frac{1}{2}}= \frac{1}{\sqrt{ 3 }}\ket{+} \ket{1,-1} -\frac{\sqrt{ 2 }}{\sqrt{ 3 }}\ket{-} \ket{1,1} 
$$
And and the same game:
$$
\ket{\frac{1}{2},-\frac{1}{2}} =\sqrt{ \frac{2}{3} }\ket{+} \ket{1,-1} -\frac{1}{\sqrt{ 3 }}\ket{-} \ket{1,1} 
$$
So how you obtain that matrix? To prove the result of [[Diagonalizing Total Angular Momentum Operator]]

With this values you actually has the [[clebsch gordan coefficients]] for a specific change!

Just arrange them smartly, I mean is just write the values
$$
\hat{J}\ket{j,m} =c_{ij}\ket{+,-} \ket{1,1,0,-1} 
$$
Write it term of the old basis. And the $\hat{J}$, which comes from just old information completely possible to obtain it.

And then via:

$$
\hat{J}'=C^{-1}\hat{J}C
$$
It's [[Change of basis matrix steps to obtain it]]. And what is the action of this space? The [[Total Angular Momentum Operator]].