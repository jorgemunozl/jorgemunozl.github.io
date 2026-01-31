---
tags:
  - baby
author: Jorge
date: 2025-09-20 14:05
modified: 2025-10-01 15:19
---
So yeah here is where all the [[Qubits, main piece of Quantum Computing]] live. [^1] 

But be careful is just a representation at the end you are going to need four numbers to represent them? But this numbers are not arbitrary. With the normalization condition you will have three, and why we just need two?

I mean you have two complex, which mean for real numbers:
But since you look for probabilities the normalization downgrade it to use three numbers

How you prove it? And why? From where it comes from?


What it's the difference between just use cartesian coordinates or just complex numbers?

[[Bloch sphere have any geometrical sense]]

Here  $\theta$ mean the $z$ axis. And $\phi$ represents the $xy$ axis.

[[global phase quantum computing]]

- This means for $\theta=0$ you obtain $\ket{0}$
- For $\theta=\pi$,  $\ket{1}$
- $\theta =\frac{\pi}{2}$ and $\phi=0$ $\ket{\psi}=\frac{1}{\sqrt{ 2 }}(\ket{0}+\ket{1})$
- $\theta =\frac{\pi}{2}$ and $\phi=\pi$ $\ket{\psi}=\frac{1}{\sqrt{ 2 }}(\ket{0}-\ket{1})$
- $\theta =\frac{\pi}{2}$ and $\phi=\frac{\pi}{2}$ $\ket{\psi}=\frac{1}{\sqrt{ 2 }}(\ket{0}+i\ket{1})$
- $\theta =\frac{\pi}{2}$ and $\phi=\frac{\pi}{2} +\pi$ $\ket{\psi}=\frac{1}{\sqrt{ 2 }}(\ket{0}-i\ket{1})$

Now if the states lives on the north of the sphere then it is 


This is for a [[Pure States - Quantum mechanics]] 

Inside the sphere mixes state.

We write [[Density  Operator]] like:



With $\theta \in[0,\pi],\phi \in[0,2\pi]$

And this is nothing but the a stereo graphic projection. 

[^1]: [[Quantum Computing A gentle introduction]] pp. 38
