---
tags:
  - baby
  - atomic
author: Jorge
date: 2024-12-13 09:34
modified: 2025-10-14 14:42
---
>[!definition]
>Let $A$ be a set of the [[Vector Space]] $V$. $A$ is a **l.i maximal subset** if:
>$$\forall w\in V|A\cup \{ w \} \text{ is l.d}$$

- That sense of [[Linearly independent]] is implicit.
- Is not hard to prove that all [[Basis Of A Space Vector (Hamel)|basis]] is l.i maximal, and all l.i maximal subset is basis. (Prove by reduction to the absurd)
- From this one could define a [[Equivalence Relation]] and prove that all vector space have basis.
- If we prove that always exist this subset we prove it. [[All Vector Space have Basis Claim]]

- Creamos el conjunto parcialmente ordenado $(X,\subseteq)$, $X$ conjunto de subconjuntos l.i.
Ahora buscamos una forma de demostrar que toda [[Max min - equivalence Relation|cadena]] tiene una cota superior, lo cual es facil. Solo unes todo el subconjunto, ese es la cota superior de la cadena.

Lo unica pega seria demostrar que la union de l.i es tambien l.i , pero eso es facil ya que se solapan , alguno contiene al resto. Demuestras que la union tambien sea l.i. Por lo tanto como la cadena se elegio arbitrariamente sin ninguna restriccion, podemos decir toda cadena tiene cota superior.

Usamos el [[Zorn's Lema]] para decir que por lo menos existe un maximo en X, osea un grupo . l.i maximal.

Por lo tanto existe base para dicho espacio.

[[Zermelo's Theorem]]


[[Basis Of A Space Vector (Hamel)]]


