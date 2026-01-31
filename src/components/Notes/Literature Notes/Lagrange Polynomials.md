---
date: 2024-10-02
hour: 14:40
tags:
  - baby
  - atomic
author: Jorge
modified: 2025-10-13 15:12
---
In the moment of use that we try with a [[Interpolation with Polynomials -classic way|classic interpolation]] , we can say that implicitly we are working with the standard basis of the vector space of polynomials.
What Lagrange think was use another base. This base is convenient for us, now how we find such basis?

>[!tip] Core Idea 
>Let $\phi_{j}(x)$ a [[Polynomial]], and $y_{i}$ and $x_{j}$ set of points that we want to interpolate.
$$y_{i}=v(x_{i})=\sum_{j=1}^{N}y_{j} \phi_{j}(x) $$

- We see that the polynomial $\phi_{j}$ must be 0 when $j$ it's different of  $i$ and one when it is $i$, this is the [[Kronecker's Delta]], with these we can easily find each polynomial that follow that rule.
- If we want to interpolate a set of $k+1$ node we are going to need $k+1$ polynomials of degree $k$, we are going to use a basis known as ___Lagrange Basis___.
$$
\{ L_{0}(x),L_{1}(x),\dots,L_{k}(x) \}
$$
- Thus we can give a explicit formula for each polynomial.
$$
L_{i}(x)=\prod_{i\neq m}^{0\leq m\leq k} \frac{x-x_{m}}{x_{i}-x_{m}}  
$$
- Finally the polynomial sought is: [^1]
$$
L(x)=\sum_{j=0}^{k}y_{j}L_{j}(x) 
$$

Now which is the form of the matrix;associated ?


And are another fancy ways to interpolate?

[^1]: [[Numerical Analysis]] pp. 126
