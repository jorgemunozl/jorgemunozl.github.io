---
date: 2024-12-01 19:12
tags:
  - young
author: Jorge
modified: 2025-10-16 19:26
---
>[!definition]
>Let $X$ be a square [[Matrix what it is]] with the field on the [[Complex Numbers]], its **conjugate** is notated as $X^{*}$ or $X^{\dagger}$ is defined as [^1]
$$X^{\dagger}=(\overline{X})^{T}$$

- Its also called also the **dagger, conjugate transpose, transjugate (for matrices)**.
- The reason of define it like that is that if $X$ is a vector then we could obtain the module making $XX^{*}$. (I think)
- But another strong reason is by the formal definition of the [[Adjoint Operator]].
- There is an interesting propierty
 ***Propierties***
 
$$
\begin{align}
5. \mathrm{Tr}(A A^{\dagger})&=\sum_{i=1}^{N} \lvert a_{ii} \rvert^{2} \\
6. \overline{AB}&=\overline{A} \ \overline{B}  \\
7. (AB)^{\dagger}&=B^{\dagger}A^{\dagger} \\
4.(A ^{-1})^{\dagger}&=(A^{\dagger})^{-1} \\
8. \overline{\mathrm{Tr}(A^{\dagger})}&=\mathrm{Tr}(A) \\
9. (A+B)^{\dagger}&= A^{\dagger}+B^{\dagger} \\
10. (\alpha A)^{\dagger}&=\overline{\alpha}A^{\dagger} \\
11. (A ^{\dagger})^{\dagger}&=A
\end{align}
$$

Now if we look in the matrix form [[Bra ket notation for make us the life easier]]
$$
\ket{\psi}^{\dagger}=\bra{\psi}     
$$

[[Observable Operators]]

**Observable Operators** Future Topic.

For and observable operator $\hat{O}$, wich must be [[Self Adjoint Operators|self adjoint]].
$$
\hat{O}^{\dagger}=\hat{O}
$$

- [[Lie Algebra]] another stuff
- [[Quantum Mechanics MOC]]

[^1]: [[Linear Algebra Done Right]] pp. 245

