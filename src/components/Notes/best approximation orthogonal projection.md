---
tags:
  - baby
author: Jorge
date: 2025-09-19 15:18
modified: 2025-09-19 15:41
---
First let's define a [[Sub Vector Space]] $U$, without you can "compare" anything.

$P$ is the **orthogonal** **projection** of $f\in V$ on $R$.
The **projection** **operator** is the [[Linear Map]] $E_{M}$
$$
\begin{align}
E_{M}:\mathcal{E}&\to M\subset \mathcal{E} \\
f&\mapsto E_{M}(f)=f^{\perp}
\end{align}
$$

Do you recall that I have that idea of a vector on $R^{3}$, what vectors are perpendicular to that vector? If we were talking about the [[Orthogonal complement]] then we can think of on a perpendicular plane but with this idea you can create a disk! Wait but this idea is a single vector not a set of vector. So we are wrong.

Now how we obtain that disk, We already define that vector. First let's find a [[Orthonormal basis]] for the space, (line in this case), choose a vector that don't belongs to this space. Then project that on that space, wait this looks familiar.

$$
P_{u}v=\sum_{i} \langle v,e_{i} \rangle e_{i}
$$

[[Parseval Identity]] is the same but with constraints not in all that plane. 


Don't forget that this at the end is also a [[Projection]]

[^1]: pp. 228
