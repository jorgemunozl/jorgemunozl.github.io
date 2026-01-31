---
tags:
  - baby
date: 2025-10-26 22:35
modified: 2025-10-27 15:11
---
Our input feature $\mathbf{f}_{i}^{0}$ which is the positions of the electrons and the distances.

Then this guys goes to the first hidden dimension via: [^1]

$$ \mathbf{h}_{i}^{0}=\mathbf{W}^{0}\mathbf{f}_{i}^{0} $$

Let's say that we have $h$ heads.

So with this guy we enter on a iteration via:

But before what does it mean:

Compute 

Compute the value on each head.

$$ v_{h}=[\text{SelfAttn}(\mathbf{h}^{l}_{1},\dots,\mathbf{h}^{\ell}_{N};\mathbf{W}^{\ell h}_{q},\mathbf{W}^{\ell h}_{k},\mathbf{W}^{\ell h}_{v})] $$

$$ \mathbf{W}_{o}^{\ell}\text{concat}_{h}[\text{SelfAttn}(\mathbf{h}^{l}_{1},\dots,\mathbf{h}^{\ell}_{N};\mathbf{W}^{\ell h}_{q},\mathbf{W}^{\ell h}_{k},\mathbf{W}^{\ell h}_{v})] $$

Where for us (where makes special this):

$$ \text{SelfAttn}_{i}(\mathbf{h}^{l}_{1},\dots,\mathbf{h}^{\ell}_{N};\mathbf{W}^{\ell h}_{q},\mathbf{W}^{\ell h}_{k},\mathbf{W}^{\ell h}_{v})=\frac{1}{\sqrt{ d }}\sum_{j}\text{Softmax}(\mathbf{q}_{1}^{T}\mathbf{k}_{i},\dots,\mathbf{q}_{N}^{T}\mathbf{k}_{i})\mathbf{v}_{j} $$

$$ \mathbf{k}_{i}=\mathbf{W}_{k}\mathbf{h}_{i},\mathbf{q}_{i}=\mathbf{W}_{q}\mathbf{h}_{i},\mathbf{v}_{i}=\mathbf{W}_{v}\mathbf{h}_{i} $$

[[Self attention mechanism on one head]]
First is clear that we need to respect the shapes.

$$ \mathbf{f}_{i}^{\ell+1}=\mathbf{h}_{i}^{\ell}+\mathbf{W}_{o}^{\ell}\text{concat}_{h}[\text{SelfAttn}(\mathbf{h}^{l}_{1},\dots,\mathbf{h}^{\ell}_{N};\mathbf{W}^{\ell h}_{q},\mathbf{W}^{\ell h}_{k},\mathbf{W}^{\ell h}_{v})] $$

And then you take it and then:

$$ \mathbf{h}_{i}^{\ell+1}=\mathbf{f}_{i}^{\ell+1}+\tanh(\mathbf{W}^{\ell+1}\mathbf{f}_{i}^{\ell+1}+\mathbf{b}^{\ell+1}) $$

So it works exactly the same that [[Fermi Net]]
And what you make with them?

[^1]: [[A self attention ansatz for ab-initio quantum chemistry]]
