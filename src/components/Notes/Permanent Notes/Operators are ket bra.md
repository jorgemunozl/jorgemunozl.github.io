---
tags:
  - baby
author: Jorge
date: 2025-08-23 15:53
modified: 2025-11-05 07:23
---
So an operator could be written as a **ket bra**, but for that have sense you have to use the [[outer product]]. [^1] 
This is:
$$ \Omega = \ket{\psi}\bra{\psi}   $$

Is just a Matrix

$\ket{\Omega v}=\Omega \ket{v}$ it have sense, that goes well with the the matrix multiplication and the definition, if we want to do the same with the **bra**? Since we can make $\bra{\Omega v}=\Omega \bra{v}$ ,$\Omega$ a [[Linear Operator]], that bad, so we would need another matrix in the left of that bra, so is a nice way to define the [[Adjoint Operator Demystified]].

Now we can also obtain the elements of the **operator**.

$$
\Omega_{mn}=\bra{m} \Omega \ket{n} 
$$

Using Dirac's notation that  theorem becomes trivial? Yeah, that is beauty.[^2]

And also is beauty the definition from dual using it

The matter relies that here you first have to define vectors to create the operator.

[^1]: [[Dirac's bra ket notation]] pp. 5

[^2]: [[Linear Algebra Done Right]] pp.  246
