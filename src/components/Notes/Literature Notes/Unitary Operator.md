---
tags:
  - baby
author: Jorge
date: 2025-05-12 09:33
modified: 2025-09-30 16:35
---
>[!definition]
>A [[Linear Operator]] $U$ is **unitary** if $\forall f,g\in \xi$, $\mathscr{E}$ [[Euclid Vector Space]]:
>$$
(U(f),U(g))=(f,g)  $$

- Preserves the [[Inner product]] a **isometry**.
- The reason why we call it **unitary** is because its [[Bound of an operator|bound]] is **one**, this is:
- Their [[EigenValues]] should have norm one.
$$
\begin{align}
(U(f),U(f))&=(f,f) \\
\lVert U(f) \rVert^{2}&=\lVert f \rVert^{2} \implies \lVert U \rVert =1  
\end{align}
$$
-  A weak form could be see it as $A^{*}A=AA^{*}$ but not necessarily $\mathbb{1}$, these are so called **Normal Operators**.
- In the [[Euclid Vector Space]] is called [[Orthogonal operator]]
- [[Normal Operators]]

---
>[!theorem]
>An operator $A$ is **unitary** $\iff$ $A^{\dagger}A=\mathbb{1}$ 
>$$
A A^{\dagger}=A^{\dagger}A=I$$

- A pretty way to show is via [[Bra ket notation for make us the life easier|bra ket]].
- Then is $A$ is bijective. [[Dagger Operator, Conjugate Transpose Matrix]]

