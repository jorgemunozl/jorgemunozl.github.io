---
modified: 2025-11-19 18:45
---
### Natural gradient Descent

As we mentioned, there are many ways to update the parameters of a neural network: Gradient Descent, Stochastic Gradient Descent, [[Adaptive Moment Estimation]] (ADAM), etc. All of them implicitly assume that the parameter space $\Theta \subset \mathbb{R}^d$ is equipped with the standard Euclidean metric, so that “length” and “steepest descent” are measured with respect to $\|\Delta\theta\|_2$.

In our case the loss $\mathcal{L}(\theta)$ depends on a probability distribution $p_\theta$, not just on $\theta$ directly. For example, in variational Monte Carlo we take
$$
p_\theta(x)
= \frac{|\psi_\theta(x)|^2}{\displaystyle \int |\psi_\theta(x')|^2\,dx'} ,
$$
so $\theta$ parametrizes an entire family of probability densities over configurations $x$. It is therefore more natural to measure distances between *distributions* $p_\theta$ and $p_{\theta+\Delta\theta}$, rather than between the parameter vectors themselves.

A canonical way to measure the distance between nearby probability distributions is the Kullback–Leibler (KL) divergence
$$
\mathrm{KL}\big(p_\theta \,\|\, p_{\theta+\Delta\theta}\big)
= \mathbb{E}_{x\sim p_\theta}\!\left[\log\frac{p_\theta(x)}{p_{\theta+\Delta\theta}(x)}\right].
$$
For small steps $\Delta\theta$ one can show that a second–order Taylor expansion of the KL gives
$$
\mathrm{KL}\big(p_\theta \,\|\, p_{\theta+\Delta\theta}\big)
= \tfrac12\,\Delta\theta^\top \mathcal{F}(\theta)\,\Delta\theta + \mathcal{O}(\|\Delta\theta\|^3),
$$
where $\mathcal{F}(\theta)$ is the Fisher Information Matrix (FIM). To define it, introduce the **score function**
$$
s_\theta(x) \in \mathbb{R}^d, \qquad
s_\theta(x) = \nabla_\theta \log p(x\mid \theta),
$$
then the FIM is
$$
\mathcal{F}(\theta)
= \mathbb{E}_{x\sim p(\cdot\mid\theta)}\!\big[\,s_\theta(x)\,s_\theta(x)^{\mathsf T}\big].
$$

The set of distributions
$$
\mathcal{M} = \{\, p_\theta(z)\;|\; \theta \in \Theta \subset \mathbb{R}^d \,\}
$$
can be viewed as a differentiable manifold, and $\mathcal{F}(\theta)$ defines a Riemannian metric on its tangent space. Concretely, for tangent vectors $u,v \in \mathbb{R}^d$ at $\theta$ we define the inner product
$$
\langle u,v \rangle_\theta
= u^{\mathsf T}\,\mathcal{F}(\theta)\,v.
$$
This metric says: two parameter directions are “close” if they induce similar infinitesimal changes in the *distribution* $p_\theta$.

Now ask the usual steepest–descent question, but with this non-Euclidean metric:

Find the direction $\Delta\theta$ that decreases $\mathcal{L}(\theta)$ the fastest, among all directions with fixed “length” $\|\Delta\theta\|_\theta^2 = \Delta\theta^\top \mathcal{F}(\theta)\,\Delta\theta$.

Solving this constrained optimization problem (e.g. with Lagrange multipliers) yields the **natural gradient** direction
$$
\Delta\theta_{\text{nat}} \;\propto\; -\,\mathcal{F}(\theta)^{-1}\,\nabla_\theta \mathcal{L}(\theta).
$$
Thus the natural gradient descent update is
$$
\Delta\theta_{\text{nat}}
= -\,\eta\,\mathcal{F}(\theta)^{-1}\,\nabla_\theta \mathcal{L}(\theta),
$$
where $\eta>0$ is a step size. Compared with the usual gradient $\nabla_\theta \mathcal{L}$, the factor $\mathcal{F}^{-1}$ “preconditions” the gradient by the local geometry of the model’s probability distribution: directions that barely change $p_\theta$ are amplified, directions that change it a lot are damped.

Natural gradient descent is therefore meaningful exactly in the situation we care about: when the loss depends on the parameters *through* a probability model $p_\theta$ (e.g. likelihood, cross-entropy, KL, variational objectives, variational Monte Carlo energy, etc.).

### Kronecker Factored Approximate Curvature

Directly computing and inverting the full Fisher matrix $\mathcal{F}(\theta)$ is infeasible for modern neural networks, since $\theta$ can have millions of components. Kronecker Factored Approximate Curvature (KFAC) is an efficient approximation that makes natural gradient updates practical for layered networks.

We sketch the construction for a fully connected layer $\ell$ with weight matrix $W_\ell$ and (for simplicity) no bias. Bias terms can be included by augmenting the activations with a constant $1$; we comment on this below.
#### Forward definition of $\mathbf{a}_\ell$

Consider a standard MLP. For a single input sample $x$, the forward pass at layer $\ell$ is

- **Input (activation) to layer $\ell$**:
$$
\mathbf{a}_\ell \in \mathbb{R}^{n_\ell}
$$
 This is the column vector of activations coming into layer $\ell$. For the first hidden layer, $\mathbf{a}_1$ is just the (possibly preprocessed) input. For deeper layers it is the nonlinearity output from the previous layer.

- **Pre-activation at layer $\ell$**:
  $$
  \mathbf{h}_\ell = W_\ell \,\mathbf{a}_\ell,
  $$
  where $W_\ell \in \mathbb{R}^{m_\ell \times n_\ell}$.
- **Output activation of layer $\ell$**:
  $$
  \tilde{\mathbf{a}}_\ell = \phi(\mathbf{h}_\ell),
  $$
  where $\phi$ is applied element-wise. In many notations $\tilde{\mathbf{a}}_\ell$ would become the input to the next layer, but to keep notation consistent with the Fisher block for $W_\ell$, we explicitly distinguish:
  - $\mathbf{a}_\ell$: input to $W_\ell$,
  - $\mathbf{h}_\ell$: pre-activation,
  - $\tilde{\mathbf{a}}_\ell$: output activation of layer $\ell$.

In KFAC, when we talk about $\mathbf{a}_\ell$ for the Fisher block of $W_\ell$, we always mean “the vector that $W_\ell$ multiplies on the right”.
#### Backward definition of $\mathbf{e}_\ell$
Let the loss for a single sample be $\mathcal{L}(\theta)$ (for example, negative log-likelihood or negative log of the wave-function probability). Define the **backward sensitivity** (or error signal) at layer $\ell$ as
$$
\mathbf{e}_\ell
= \frac{\partial \mathcal{L}}{\partial \mathbf{h}_\ell} \in \mathbb{R}^{m_\ell}.
$$
This is computed via backpropagation:
- At the output layer $L$:
  $$
  \mathbf{e}_L
  = \frac{\partial \mathcal{L}}{\partial \mathbf{h}_L}
  = \left(\frac{\partial \mathcal{L}}{\partial \tilde{\mathbf{a}}_L}\right) \odot \phi'(\mathbf{h}_L),
  $$
  where $\odot$ is the element-wise product or also Hadamard product.
- For hidden layers $\ell < L$:
$$
  \mathbf{e}_\ell
  = \frac{\partial \mathcal{L}}{\partial \mathbf{h}_\ell}
  = \left(W_{\ell+1}^{\mathsf T} \mathbf{e}_{\ell+1}\right) \odot \phi'(\mathbf{h}_\ell).
$$
In the context of natural gradient for probabilistic models, $\mathcal{L}$ is often chosen as $-\log p(X\mid\theta)$, so up to a sign we can also think of $\mathbf{e}_\ell$ as
$$
\mathbf{e}_\ell = \frac{\partial \log p(X\mid\theta)}{\partial \mathbf{h}_\ell}.
$$
#### Gradient w.r.t. $W_\ell$ and the form $\mathbf{a}_\ell \otimes \mathbf{e}_\ell$

For a single sample, using the chain rule,
$$
\frac{\partial \mathcal{L}}{\partial W_\ell}
= \frac{\partial \mathcal{L}}{\partial \mathbf{h}_\ell}
  \frac{\partial \mathbf{h}_\ell}{\partial W_\ell}
= \mathbf{e}_\ell\, \mathbf{a}_\ell^{\mathsf T}.
$$

If instead of $\mathcal{L}$ we use $\log p(X\mid\theta)$ (as in the Fisher definition), we get
$$
\frac{\partial \log p(X\mid\theta)}{\partial W_\ell}
= \mathbf{e}_\ell\, \mathbf{a}_\ell^{\mathsf T},
$$
with $\mathbf{e}_\ell = \partial \log p / \partial \mathbf{h}_\ell$.

Now vectorize the gradient. Using the standard identity
$$
\mathrm{vec}(uv^{\mathsf T}) = v \otimes u,
$$
with $u = \mathbf{e}_\ell$ and $v = \mathbf{a}_\ell$, we obtain
$$
\frac{\partial \log p(X\mid\theta)}{\partial \mathrm{vec}(W_\ell)}
= \mathrm{vec}\!\left(\frac{\partial \log p}{\partial W_\ell}\right)
= \mathrm{vec}(\mathbf{e}_\ell\,\mathbf{a}_\ell^{\mathsf T})
= \mathbf{a}_\ell \otimes \mathbf{e}_\ell.
$$

This gives the key structural form used by KFAC.

#### Fisher block for a single layer

The Fisher block associated with the parameters $W_\ell$ is
$$
\mathcal{F}_\ell
= \mathbb{E}_{p(\mathbf{X})}\!\left[
\frac{\partial \log p(X\mid\theta)}{\partial \mathrm{vec}(W_\ell)}
\frac{\partial \log p(X\mid\theta)}{\partial \mathrm{vec}(W_\ell)}^{\mathsf T}
\right].
$$

Plugging in the expression above,
$$
\mathcal{F}_\ell
= \mathbb{E}_{p(\mathbf{X})}\!\big[
(\mathbf{a}_\ell \otimes \mathbf{e}_\ell)
(\mathbf{a}_\ell \otimes \mathbf{e}_\ell)^{\mathsf T}
\big].
$$

Here $p(\mathbf{X})$ denotes the distribution over inputs and labels (or configurations, in the VMC case). In practice this expectation is approximated by averaging over a mini-batch of samples $X$ and the corresponding forward/backward passes that produce $\mathbf{a}_\ell$ and $\mathbf{e}_\ell$.

Computing and inverting $\mathcal{F}_\ell$ directly is still expensive, because its dimension is
$$
(\text{dim}(\mathbf{a}_\ell)\,\text{dim}(\mathbf{e}_\ell))
\times
(\text{dim}(\mathbf{a}_\ell)\,\text{dim}(\mathbf{e}_\ell)).
$$
KFAC makes two key approximations to make this tractable.

1. **Block–diagonal across layers.**  
   Off–diagonal blocks $\mathcal{F}_{ij}$ are assumed negligible when $\theta_i$ and $\theta_j$ belong to different layers. This makes the Fisher approximately block–diagonal, with one block per layer.

2. **Kronecker factorization within each layer.**  
   Inside a layer, KFAC assumes that the correlation between activations and errors factorizes:
   $$
   \mathcal{F}_\ell
   = \mathbb{E}_{p(\mathbf{X})}\!\big[
   (\mathbf{a}_\ell \otimes \mathbf{e}_\ell)
   (\mathbf{a}_\ell \otimes \mathbf{e}_\ell)^{\mathsf T}
   \big]
   = \mathbb{E}_{p(\mathbf{X})}\!\big[
   (\mathbf{a}_\ell\mathbf{a}_\ell^{\mathsf T}) \otimes
   (\mathbf{e}_\ell\mathbf{e}_\ell^{\mathsf T})
   \big]
   \;\approx\;
   \mathbb{E}_{p(\mathbf{X})}[\mathbf{a}_\ell\mathbf{a}_\ell^{\mathsf T}]
   \;\otimes\;
   \mathbb{E}_{p(\mathbf{X})}[\mathbf{e}_\ell\mathbf{e}_\ell^{\mathsf T}].
   $$

Define the *activation covariance* and *error covariance*:
$$
A_\ell = \mathbb{E}_{p(\mathbf{X})}[\mathbf{a}_\ell\mathbf{a}_\ell^{\mathsf T}],
\qquad
S_\ell = \mathbb{E}_{p(\mathbf{X})}[\mathbf{e}_\ell\mathbf{e}_\ell^{\mathsf T}].
$$
In practice these expectations are updated as running averages over mini-batches:
$$
A_\ell \approx \frac{1}{B}\sum_{b=1}^B \mathbf{a}_\ell^{(b)} \mathbf{a}_\ell^{(b)\mathsf T},
\qquad
S_\ell \approx \frac{1}{B}\sum_{b=1}^B \mathbf{e}_\ell^{(b)} \mathbf{e}_\ell^{(b)\mathsf T},
$$
where $b$ indexes samples in the batch and $\mathbf{a}_\ell^{(b)}, \mathbf{e}_\ell^{(b)}$ are obtained by a standard forward and backward pass for that sample.
With this approximation we have
$$
\mathcal{F}_\ell \approx A_\ell \otimes S_\ell.
$$

The crucial property of the Kronecker product is that
$$
(A_\ell \otimes S_\ell)^{-1}
= A_\ell^{-1} \otimes S_\ell^{-1},
$$
so the inverse of the (huge) layer–Fisher block can be obtained by inverting the much smaller matrices $A_\ell$ and $S_\ell$. Thus the natural gradient update for the weights of layer $\ell$ becomes
$$
\Delta\theta_{\text{nat},\ell}
\approx -\,\eta\,\big(A_\ell^{-1} \otimes S_\ell^{-1}\big)\,
\nabla_{\mathrm{vec}(W_\ell)} \mathcal{L}.
$$

In summary, KFAC replaces the intractable inverse
$$
\mathbb{E}_{p(\mathbf{X})}\big[ (\mathbf{a}_\ell\otimes \mathbf{e}_\ell)
(\mathbf{a}_\ell\otimes \mathbf{e}_\ell)^{\mathsf T} \big]^{-1}
$$
by the efficiently computable approximation
$$
\mathbb{E}_{p(\mathbf{X})}\big[(\mathbf{a}_\ell\otimes \mathbf{e}_\ell)
(\mathbf{a}_\ell\otimes \mathbf{e}_\ell)^{\mathsf T}\big]^{-1}
\;\approx\;
\mathbb{E}_{p(\mathbf{X})}[\mathbf{a}_\ell\mathbf{a}_\ell^{\mathsf T}]^{-1}
\otimes
\mathbb{E}_{p(\mathbf{X})}[\mathbf{e}_\ell\mathbf{e}_\ell^{\mathsf T}]^{-1},
$$
which captures the dominant curvature structure while keeping the cost of natural gradient descent comparable to standard first–order methods.
We have ignored biases above for clarity. In practice one can either (i) augment $\mathbf{a}_\ell$ with a constant $1$ to absorb biases into $W_\ell$, or (ii) maintain separate smaller KFAC factors for biases; both approaches preserve the same Kronecker structure.


---
## Fermi Net

A very important work for us is FermiNet (Pfau et al. 2020). It uses deep neural networks to represent **orbitals** and then combines them into a sum of Slater determinants. At the top level, the ansatz is a linear combination of $K$ determinant products
$$
\psi(\mathbf{x}_1,\dots,\mathbf{x}_n)
= \sum_{k=1}^K \omega_k \,\det[\Phi^{k}],
$$
where $\omega_k$ are learnable coefficients and $\Phi^k$ is a matrix of single-particle orbitals. For a system without explicit spin separation one can write
$$
\det[\Phi^k] =
\begin{vmatrix}
\phi_{1}^{k}(\mathbf{x}_{1})  & \dots  &  \phi_{1}^{k}(\mathbf{x}_{n}) \\
\vdots   &  & \vdots  \\
\phi_{n}^{k}(\mathbf{x}_{1}) & \dots & \phi_{n}^{k}(\mathbf{x}_{n})
\end{vmatrix}
= \det[\phi_i^k(\mathbf{x}_j)].
$$
Here $\phi_i^k$ is the $i$-th orbital in determinant $k$, and we evaluate it on the coordinates of electron $j$.

However, in FermiNet we are dealing with electrons with spin, so things are slightly more structured, and the orbitals depend on **all** electron coordinates, not only on the one being “plugged in”. That is why we write the orbitals as
$$
\phi^{k\alpha}_i\big(\mathbf{r}^\alpha_j;\{\mathbf{r}^\alpha_{/j}\};\{\mathbf{r}^{\bar{\alpha}}\}\big),
$$
where:
- $\alpha \in \{\uparrow,\downarrow\}$ is the spin sector,
- $\mathbf{r}^\alpha_j$ is the position of electron $j$ with spin $\alpha$,
- $\{\mathbf{r}^\alpha_{/j}\}$ denotes the positions of all **other** electrons with spin $\alpha$,
- $\{\mathbf{r}^{\bar{\alpha}}\}$ denotes the positions of electrons with the opposite spin.

So the orbital evaluated on electron $j$ “knows” about all other electrons. The indices:
- $i$ = orbital index (row of the determinant),
- $j$ = electron index (column of the determinant),
- $\alpha,\beta$ = spin labels ($\uparrow$ or $\downarrow$),
- $k$ = determinant index in the sum.

---

### Input coordinates and features

We denote by
- $\mathbf{r}^\uparrow_1,\dots,\mathbf{r}^\uparrow_{n^\uparrow}$ the coordinates of spin-up electrons,
- $\mathbf{r}^\downarrow_1,\dots,\mathbf{r}^\downarrow_{n^\downarrow}$ the coordinates of spin-down electrons,
- $\mathbf{R}_I$ the positions of nuclei, $I=1,\dots,N_\text{nuc}$.

The network builds two types of features:

1. **Electron–nucleus features** for each electron $i$ with spin $\alpha$:
   $$
   \mathbf{h}^{0,\alpha}_i
   = \text{concatenate}\Big(
       \mathbf{r}^\alpha_i - \mathbf{R}_I,\;
       \big|\mathbf{r}^\alpha_i - \mathbf{R}_I\big|
       \ \forall\, I
     \Big).
   $$
   This produces a feature vector that contains, for electron $(i,\alpha)$, all its relative position vectors to each nucleus, plus their distances.

2. **Electron–electron features** for each pair of electrons $(i,\alpha)$ and $(j,\beta)$:
   $$
   \mathbf{h}^{0,\alpha\beta}_{ij}
   = \text{concatenate}\Big(
       \mathbf{r}^\alpha_i - \mathbf{r}^\beta_j,\;
       \big|\mathbf{r}^\alpha_i - \mathbf{r}^\beta_j\big|
       \ \forall\, j,\beta
     \Big).
   $$
   For fixed $(i,\alpha)$, we build such features for all other electrons $(j,\beta)$, capturing their relative positions and distances.

The superscript $0$ indicates that these are the features at layer $\ell=0$ (input to the deep network). At deeper layers we will keep updating
- $\mathbf{h}^{\ell\alpha}_i$ (single-electron features),
- $\mathbf{h}^{\ell\alpha\beta}_{ij}$ (pairwise features),
for $\ell = 0,1,\dots,L-1$.

---

### Mixing and updating features across layers

At each hidden layer $\ell$, we want each electron’s features to depend on *all* other electrons, in a permutation-symmetric way. To do this, we form **averages** over electrons of the same or opposite spin.

First, define global spin-averaged single-electron features
$$
\mathbf{g}^{\ell\uparrow} =
\frac{1}{n^\uparrow}\sum_{j=1}^{n^\uparrow}\mathbf{h}^{\ell\uparrow}_j,
\qquad
\mathbf{g}^{\ell\downarrow} =
\frac{1}{n^\downarrow}\sum_{j=1}^{n^\downarrow}\mathbf{h}^{\ell\downarrow}_j.
$$

Next, for each electron $(i,\alpha)$, define averaged pairwise features:
$$
\mathbf{g}^{\ell\alpha\uparrow}_i
= \frac{1}{n^\uparrow}\sum_{j=1}^{n^\uparrow}\mathbf{h}^{\ell\alpha\uparrow}_{ij},
\qquad
\mathbf{g}^{\ell\alpha\downarrow}_i
= \frac{1}{n^\downarrow}\sum_{j=1}^{n^\downarrow}\mathbf{h}^{\ell\alpha\downarrow}_{ij}.
$$

Now we *concatenate* all this information into a single feature vector for electron $(i,\alpha)$:
$$
\begin{aligned}
\big(
\mathbf{h}^{\ell\alpha}_i,
\frac{1}{n^\uparrow}\sum_{j=1}^{n^\uparrow}\mathbf{h}^{\ell\uparrow}_j,
\frac{1}{n^\downarrow}\sum_{j=1}^{n^\downarrow}\mathbf{h}^{\ell\downarrow}_j,
\frac{1}{n^\uparrow}\sum_{j=1}^{n^\uparrow}\mathbf{h}^{\ell\alpha\uparrow}_{ij},
\frac{1}{n^\downarrow}\sum_{j=1}^{n^\downarrow}\mathbf{h}^{\ell\alpha\downarrow}_{ij}
\big)
&=
\big(\mathbf{h}^{\ell\alpha}_i, \mathbf{g}^{\ell\uparrow}, \mathbf{g}^{\ell\downarrow},
\mathbf{g}^{\ell\alpha\uparrow}_i, \mathbf{g}^{\ell\alpha\downarrow}_i \big) \\
&= \mathbf{f}^{\ell\alpha}_i.
\end{aligned}
$$

This $\mathbf{f}^{\ell\alpha}_i$ is what enters the **single-electron MLP** at layer $\ell$. The update is
$$
\mathbf{h}^{\ell+1,\alpha}_i
= \tanh\big(\mathbf{V}^\ell \mathbf{f}^{\ell\alpha}_i + \mathbf{b}^\ell\big) + \mathbf{h}^{\ell\alpha}_i,
$$
where $\mathbf{V}^\ell$ and $\mathbf{b}^\ell$ are learnable weights and biases, shared between electrons (for the given spin sector). The residual connection $+\mathbf{h}^{\ell\alpha}_i$ stabilizes training.

In parallel, the pairwise features are updated with a **pairwise MLP**:
$$
\mathbf{h}^{\ell+1,\alpha\beta}_{ij}
= \tanh\big(\mathbf{W}^\ell \mathbf{h}^{\ell\alpha\beta}_{ij} + \mathbf{c}^\ell\big)
+ \mathbf{h}^{\ell\alpha\beta}_{ij},
$$
with weights $\mathbf{W}^\ell$ and biases $\mathbf{c}^\ell$, again shared over all pairs $(i,j,\alpha,\beta)$.

By repeating these updates for $\ell = 0,\dots,L-1$, we eventually obtain **final single-electron features**
$$
\mathbf{h}^{L\alpha}_j \quad \text{for each electron } j \text{ of spin } \alpha.
$$
Notice how the indices work:
- $\ell$ runs over layers and disappears at the end,
- $i$ or $j$ always refer to a specific electron within a spin sector,
- $\alpha,\beta$ tell you which spin sector that electron belongs to.

---

### From final features to orbitals

The final orbitals are built as a function of the last-layer features $\mathbf{h}^{L\alpha}_j$, plus some additional “envelope” factors that handle the long-range decay and cusp conditions. For each determinant index $k$, spin $\alpha$, orbital index $i$, and electron $j$ we define
$$
\begin{aligned}
\phi^{k\alpha}_i\big(\mathbf{r}^\alpha_j; \{\mathbf{r}^\alpha_{/j}\}; \{\mathbf{r}^{\bar{\alpha}}\}\big)
&= \left(\mathbf{w}^{k\alpha}_i \cdot \mathbf{h}^{L\alpha}_j + g^{k\alpha}_i\right) \\
&\quad\times \sum_{m} \pi^{k\alpha}_{im}
\exp\Big(
- \big|\mathbf{\Sigma}_{im}^{k\alpha} \big(\mathbf{r}^{\alpha}_j - \mathbf{R}_m\big)\big|
\Big).
\end{aligned}
$$
Here:
- $\mathbf{w}^{k\alpha}_i$ and $g^{k\alpha}_i$ are learnable linear parameters for the “MLP part” of the orbital,
- the sum over $m$ is an “envelope” over nuclei (or centers),
- $\pi^{k\alpha}_{im}$ and $\mathbf{\Sigma}^{k\alpha}_{im}$ are learnable coefficients and matrices controlling the exponential decay around nucleus $m$.

All these parameters depend on the indices:
- $k$ selects which determinant in the sum,
- $i$ selects which orbital (row in the determinant),
- $\alpha$ selects the spin sector,
- $m$ selects which nuclear center in the envelope.

The dependence on all other electrons is hidden inside $\mathbf{h}^{L\alpha}_j$, which was built from the full set of positions $\{\mathbf{r}^\uparrow\},\{\mathbf{r}^\downarrow\}$ through the deep network.

---

### Assembling the spin-separated determinants

For each determinant index $k$ and spin sector $\alpha\in\{\uparrow,\downarrow\}$, we build a matrix
$$
D^{k\alpha}_{ij}
= \phi^{k\alpha}_i\big( \mathbf{r}^\alpha_j; \{\mathbf{r}^\alpha_{/j}\}; \{\mathbf{r}^{\bar{\alpha}}\}\big),
$$
with:
- rows indexed by the orbital label $i = 1,\dots,n^\alpha$,
- columns indexed by the electron label $j = 1,\dots,n^\alpha$ (with that spin).

Taking the determinant gives a properly antisymmetric function of the positions of electrons **with that spin**:
$$
\det\big[D^{k\alpha}\big]
= \det\left[\phi^{k\alpha}_i(\mathbf{r}^\alpha_j; \{\mathbf{r}^\alpha_{/j}\}; \{\mathbf{r}^{\bar{\alpha}}\})\right].
$$

For the full wavefunction, we combine spin-up and spin-down blocks:
$$
\begin{aligned}
\psi(\mathbf{r}^\uparrow_1,\ldots,\mathbf{r}^\uparrow_{n^\uparrow},
     \mathbf{r}^\downarrow_1,\ldots,\mathbf{r}^\downarrow_{n^\downarrow})
= \sum_{k} \omega_k \;&
\det\left[\phi^{k \uparrow}_i(\mathbf{r}^\uparrow_j; \{\mathbf{r}^\uparrow_{/j}\}; \{\mathbf{r}^\downarrow\})\right] \\
&\times
\det\left[\phi^{k \downarrow}_i(\mathbf{r}^\downarrow_j; \{\mathbf{r}^\downarrow_{/j}\}; \{\mathbf{r}^\uparrow\})\right].
\end{aligned}
$$

**Why are there two determinants?**  

In electronic structure, when we separate spin and spatial parts using spin-orbitals, the full Slater determinant over all electrons factorizes into the product of:
- one determinant involving only spin-up electrons,
- another determinant involving only spin-down electrons.

Each of these determinants is antisymmetric under exchange of two electrons **with the same spin**. The overall wavefunction constructed as the product of a spin-up determinant and a spin-down determinant is antisymmetric under exchange of any two electrons (when you take into account the spin labels). FermiNet keeps this structure and lets each block be represented by a powerful neural network ansatz for the orbitals.

Up to this point the building blocks are just MLP layers (with residual connections and special feature mixing), but the careful indexing
- $(i,\alpha)$ for “which electron/spin”,
- $j$ for summation over electrons,
- $\ell$ for layers,
- $k$ for determinant index,
is what guarantees that the final object has the correct permutation symmetry and antisymmetry required for a fermionic wavefunction.

---
## Jastrow Factor for Psi Former

[[Psi Former Ansatz]]. @vonglehn2023selfattentionansatzabinitioquantum

The Psiformer wavefunction has the usual Slater–Jastrow structure
$$
\Psi_{\theta}(\mathbf{x})
=
\exp\big(\mathcal{J}_{\theta}(\mathbf{x})\big)\,
\sum_{k=1}^{N_{\det}}\det[\boldsymbol{\Phi}^{k}_{\theta}(\mathbf{x})],
$$
where $\mathbf{x} = (x_1,\dots,x_N)$ is the collection of all $N$ electron states 
$$
x_i = (\mathbf{r}_i,\sigma_i), \qquad \mathbf{r}_i \in \mathbb{R}^3,\;\sigma_i \in \{\uparrow,\downarrow\}.
$$

- $\mathcal{J}_\theta:(\mathbb{R}^{3}\times \{\uparrow,\downarrow\})^{N}\to \mathbb{R}$ is the **Jastrow factor**, encoding (here) only electron–electron cusp information.
- $\boldsymbol{\Phi}^k_\theta$ is the matrix of (spin-)orbitals for determinant $k$.

In Psiformer, the Jastrow factor is *very* simple: it has only two learnable parameters, one for parallel-spin pairs and one for antiparallel-spin pairs:
$$
\mathcal{J}_{\theta}(\mathbf{x})
=
\sum_{i<j;\,\sigma_{i}=\sigma_{j}}
-\frac{1}{4}\frac{\alpha^{2}_{\mathrm{par}}}{\alpha_{\mathrm{par}}+\lvert \mathbf{r}_{i}-\mathbf{r}_{j} \rvert }
\;+\;
\sum_{i,j;\,\sigma_{i}\neq \sigma_{j}}
-\frac{1}{2}\frac{\alpha^{2}_{\mathrm{anti}}}{\alpha_{\mathrm{anti}}+\lvert \mathbf{r}_{i}-\mathbf{r}_{j} \rvert }.
$$

- $\alpha_{\mathrm{par}}$ controls the strength of the Jastrow for **same-spin** electron pairs.
- $\alpha_{\mathrm{anti}}$ does the same for **opposite-spin** pairs.

This Jastrow is responsible for enforcing the electron–electron cusp conditions. The neural network itself (the Psiformer) only sees **electron–nucleus** information in its attention stream; all explicit $|\mathbf{r}_i-\mathbf{r}_j|$ dependence lives in $\mathcal{J}_\theta$.

---

## Applying Attention to Fermi Net (Psiformer-style)

Conceptually, Psiformer is “FermiNet with the two-electron stream replaced by self-attention”, we can see it clearly doing.

- FermiNet: separate one-electron and two-electron feature streams, then mix.
- Psiformer: a **single stream** of self-attention layers on electron–nuclear features only; electron–electron features enter only via the Jastrow.

We now explain the indices and equations carefully.
### Indices

We will use:

- $i,j = 1,\dots,N$: electron indices.
- $I = 1,\dots,N_{\text{nuc}}$: nucleus index.
- $\sigma_i \in \{\uparrow,\downarrow\}$: spin of electron $i$.
- $\ell = 0,\dots,L-1$: layer index in the Psiformer.
- $h = 1,\dots,H$: attention head index.
- $k = 1,\dots,N_{\det}$: determinant index.
- $d$: hidden dimension of the per-electron feature vectors.
So at each layer $\ell$, each electron $i$ carries a feature (hidden state)
$$
\mathbf{h}_i^{\ell} \in \mathbb{R}^{d}.
$$
### Input features and initial hidden states

Psiformer only uses **electron–nuclear** features (plus spin) as input to the attention stack.
For each electron $i$:
1. Let $\mathbf{R}_I$ be nuclear positions.
2. Build raw features by concatenating for all $I$:
   - some function of $\mathbf{r}_i - \mathbf{R}_I$ (relative position),
   - $|\mathbf{r}_i - \mathbf{R}_I|$ (distance),
   - and the spin as a scalar (e.g. $\sigma_i = +1$ for $\uparrow$, $-1$ for $\downarrow$).

In the paper they rescale the electron–nucleus vectors so that large distances grow only logarithmically, but at the level of notation we can just write
$$
\mathbf{f}_i^{0} \in \mathbb{R}^{d_{\text{in}}}
\quad\text{(electron–nucleus features + spin)}.
$$
These are then mapped into the model hidden dimension by a linear layer
$$
\mathbf{h}_{i}^{0} = \mathbf{W}^{0}\,\mathbf{f}_{i}^{0},
$$
where $\mathbf{W}^0 \in \mathbb{R}^{d \times d_{\text{in}}}$ is learned.
So:
- index $i$ is “which electron”,
- superscript $0$ means “before any attention layers.”
### One self-attention layer

At layer $\ell$, we have all electron hidden states
$$
\mathbf{h}_1^{\ell},\dots,\mathbf{h}_N^{\ell}.
$$

For each **head** $h$ and electron $i$, we compute:

- Query:
  $$
  \mathbf{q}^{\ell h}_i = \mathbf{W}^{\ell h}_q \mathbf{h}^{\ell}_i
  $$
- Key:
  $$
  \mathbf{k}^{\ell h}_i = \mathbf{W}^{\ell h}_k \mathbf{h}^{\ell}_i
  $$
- Value:
  $$
  \mathbf{v}^{\ell h}_i = \mathbf{W}^{\ell h}_v \mathbf{h}^{\ell}_i
  $$

Here each $\mathbf{W}^{\ell h}_q,\mathbf{W}^{\ell h}_k,\mathbf{W}^{\ell h}_v$ is a learned matrix, shared across all electrons $i$, but specific to layer $\ell$ and head $h$.

Then the **self-attention output for electron $i$, head $h$** is
$$
\mathbf{A}^{\ell h}_i
=
\sum_{j=1}^{N}
\underbrace{
\frac{\exp\big((\mathbf{q}^{\ell h}_i)^{\mathsf T}\mathbf{k}^{\ell h}_j / \sqrt{d_k}\big)}
     {\sum_{j'=1}^N \exp\big((\mathbf{q}^{\ell h}_i)^{\mathsf T}\mathbf{k}^{\ell h}_{j'} / \sqrt{d_k}\big)}
}_{\text{attention weight from } i \text{ to } j}
\mathbf{v}^{\ell h}_j.
$$

- $j$ runs over “all other electrons,” so electron $i$ “looks” at all others via attention.
- $d_k$ is the key/query dimension (usually $d_k = d/H$ or similar).

This is exactly your
$$
A^{\ell}_{h} = [\text{SelfAttn}(\mathbf{h}_1^\ell,\dots,\mathbf{h}_N^\ell;\mathbf{W}^{\ell h}_q,\mathbf{W}^{\ell h}_k,\mathbf{W}^{\ell h}_v)],
$$
but now written explicitly with indices $i$ and $j$.

Next, we **concatenate over heads** for each electron:
$$
\mathbf{A}^{\ell}_i = \text{concat}_{h=1}^H\big[\mathbf{A}^{\ell h}_i\big]
\in \mathbb{R}^{Hd_v},
$$
where $d_v$ is the value dimension of each head.

This is your
$$
A^{\ell} = \text{concat}_{h}[A_{h}],
$$
but again with the electron index $i$ made explicit.

### Residual projection and MLP

We then map the concatenated attention output back to the hidden dimension and add a residual connection:
$$
\mathbf{f}_{i}^{\ell+1}
=
\mathbf{h}_{i}^{\ell}
+
\mathbf{W}_{o}^{\ell}\,\mathbf{A}^{\ell}_i,
$$
where $\mathbf{W}_{o}^{\ell}$ is a learned matrix.

Then we pass this through a small MLP (just a linear + $\tanh$ here), again with a residual:
$$
\mathbf{h}_{i}^{\ell+1}
=
\mathbf{f}_{i}^{\ell+1}
+
\tanh\big(\mathbf{W}^{\ell+1}\mathbf{f}_{i}^{\ell+1} + \mathbf{b}^{\ell+1}\big).
$$

So a full Psiformer layer $\ell$ is:

1. Self-attention: $\{\mathbf{h}_i^\ell\} \to \{\mathbf{A}^\ell_i\}$.
2. Linear + residual: $\{\mathbf{A}^\ell_i\} \to \{\mathbf{f}_i^{\ell+1}\}$.
3. MLP + residual: $\{\mathbf{f}_i^{\ell+1}\} \to \{\mathbf{h}_i^{\ell+1}\}$.

Repeat this for $\ell=0,\dots,L-1$ and you get **final hidden states**
$$
\mathbf{h}_j^{L} \quad \text{for each electron } j.
$$

Here:

- $L$ = number of layers in the Psiformer.
- For each layer, $i$ indexes the electron the output belongs to, $j$ indexes electrons we attend over.
- $h$ indexes different heads in multi-head attention.

### From hidden states to orbitals and determinants

From the final hidden states $\mathbf{h}_j^L$, we build the spin-orbital matrix for each determinant $k$.

For each determinant index $k$ and orbital index $i$, define a **linear “orbital head”**:
$$
\tilde{\phi}^{k}_i(x_j)
=
\mathbf{w}^{k}_i \cdot \mathbf{h}^{L}_j
+
g^{k}_i,
$$
where $\mathbf{w}^{k}_i$ and $g^{k}_i$ are learned. The dependence on spin $\sigma_j$ and all other electrons is implicit in $\mathbf{h}_j^L$: the self-attention layers have already mixed that information in.

Then we multiply by an **envelope** to enforce the correct asymptotic decay:
$$
\Omega^{k}_{ij}
=
\sum_{m}
\pi^{k}_{im}
\exp\big(
- \big|\mathbf{\Sigma}^{k}_{im}(\mathbf{r}_j - \mathbf{R}_m)\big|
\big),
$$
where
- $m$ indexes nuclei (or “envelope centers”),
- $\pi^{k}_{im}$ and $\mathbf{\Sigma}^{k}_{im}$ are learned parameters.

The final spin-orbital entries are
$$
\Phi^{k}_{ij}
=
\Omega^{k}_{ij}\,
\tilde{\phi}^{k}_i(x_j).
$$

Collecting these into the matrix
$$
\boldsymbol{\Phi}^k(\mathbf{x}) = 
\big[\Phi^{k}_{ij}\big]_{i,j=1}^N,
$$
we form the determinant
$$
\det[\boldsymbol{\Phi}^k(\mathbf{x})]
=
\det\big[\Phi^{k}_{ij}\big]
=
\det\big[\phi^{k}_i(x_j)\big],
$$
and finally the full Psiformer wavefunction
$$
\Psi_{\theta}(\mathbf{x})
=
\exp(\mathcal{J}_{\theta}(\mathbf{x}))
\sum_{k=1}^{N_{\det}}\det[\boldsymbol{\Phi}^{k}_{\theta}(\mathbf{x})].
$$

So the story in terms of indices is:

- $i$ = which **orbital** (row of the determinant).
- $j$ = which **electron** the orbital is evaluated on (column of the determinant).
- $k$ = which **determinant** in the sum.
- $\ell$ = which **layer** of the attention/MLP stack produced the hidden states.
- $h$ = which **attention head** participated in mixing information across electrons.
- $I,m$ = which **nucleus/center** is used for the envelope.

The self-attention layers are what let $\mathbf{h}_j^L$ depend on all other electrons in a flexible, learned way, while the determinant over $i,j$ and the Jastrow over $i,j$ enforce fermionic antisymmetry and cusp conditions.

