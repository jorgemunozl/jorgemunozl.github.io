---
date: 2025-01-09 15:45
modified: 2025-08-10 15:20
tags:
  - old
  - atomic
author: Jorge
---
>[!definition] 
>A **group** is a 2-tuple $(G,g)$ where $G$ is a nonempty set, and $g$ is an application $G$ $\times$ $G$ $\rightarrow$ $G$ such that: [^1] $$\begin{align}
>A&:\forall \ a,b,c  \in G: g(a,g(b,c))=g(g(a,b),c)\\		N&: \exists  \ e  \in G \ \forall a \in G: g(a,e)=a \ (\text{existence  of  the right  neuter})\\
I&: \forall \ a \in G ,\ \exists a^{-1} \in G: g(a,a^{-1})=e \ \text{(existence  of  the  inverse)}\end{align}$$

- A group is an [[Algebraic Structure]] (one of the simplest), that only requires one operator.
- We notate a group as a 2-tuple, such as $(G, \cdot )$ where $G$ is a nonempty set, and $\cdot$ is an [[Binary Operation|binary operation]] respect a $G$.
- This operator must satisfy three axioms: **associativity** , the existence of a element called **neuter** and for each element in the set the existence of its **inverse**.
- In group theory we call order of $G$ $(\lvert G \rvert)$ , to the **cardinal** of $G$.

[^1]: [[Group Theory]] pp. 5
