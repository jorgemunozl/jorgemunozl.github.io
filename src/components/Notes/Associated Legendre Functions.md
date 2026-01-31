---
tags:
  - baby
date: "2025-11-29 17:49"
modified: 2025-08-06T23:12:25-05:00
---
The functions:
$$
P_{l}^{m}(x)=(1-x^{2})^{m/2}\frac{d^{m}}{dx^{m}} P_{l}(x), (m\geq_{0})
$$

Then if you combine a exponential factor you obtain the [[Angular Eigen Functions]].
The question on how you take the derivatives? Using two facts 

Numerically you compute that by recurrence:

First from first principles:

$$
P_{m}^{m}(x)=(-1)^{m}(2m-1)!!(1-x^{2})^{m/2}
$$

Then:

$$
P^{m}_{m+1}(x)=x(2m+1)P^{m}_{m}(x)
$$

And then you should have that:

$$
P^{m}_{l}(x)=\frac{(2l-1)xP^{m}_{l-1}(x)-(l+m-1)P^{m}_{l-2}(x)}{l-m}
$$

Is not complicated obtain

But take the 