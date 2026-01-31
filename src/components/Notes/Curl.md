---
tags:
  - baby
author: Jorge
date: 2025-02-10 16:03
---
>[!definition]
>Give it a [[Vector field]] $A=(A_{x},A_{y},A_{z})$ the **curl** of $A$ is:
>$$
\nabla \times A=\begin{vmatrix} 
 \mathbf{i}&\mathbf{j}&\mathbf{k}\\ 
 \frac{\partial }{\partial x}&\frac{\partial }{\partial y}&\frac{\partial }{\partial z} \\
A_{x}&A_{y}&A_{z}
\end{vmatrix}
>$$

- Is the [[Cross product]] between the [[Nabla Differential Operator]] and $A$. So it's is another vector perpendicular to both. But again that operator don't have sense by itself. Is better to think it like a combination between the coordinates.
- **Property**: Let $A$ and $B$ two differentiable vector fields, then:
$$
\nabla \times (A\times B)=B\cdot( \nabla \times A)-A\cdot(\nabla \times B)
$$
- A physical representation is [[Curl Idea]]