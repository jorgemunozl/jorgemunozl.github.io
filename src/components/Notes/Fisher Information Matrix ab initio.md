K-FAC is basically **“natural gradient you can actually run on a GPU”**.

It takes the gigantic Fisher matrix that natural gradient needs, notices a hidden Kronecker structure layer-by-layer, and uses that to make the inverse cheap.

Let’s build it from the ground up.

---

## 1. Where K-FAC lives: natural gradient

Natural gradient wants to update parameters by

[
\theta_{\text{new}} = \theta - \eta, F^{-1} g
]

* (g = \nabla_\theta L): usual gradient of the loss
* (F): Fisher information matrix (expectation of score outer products)

The Fisher is huge:

* If you have (n) parameters, (F) is (n \times n).
* Inverting that directly is (O(n^3)) → hopeless for deep nets.

So the game is: **approximate (F^{-1})** in a way that’s:

* cheap,
* still “kind of” respects the geometry.

K-FAC (Kronecker-Factored Approximate Curvature) is one clever way.

---

## 2. Look at one layer: where the Kronecker shows up

Take a fully-connected layer:

[
s = W a + b,\quad y = \phi(s)
]

* (a): input activations (vector of size (n_{\text{in}}))
* (W): weight matrix ((n_{\text{out}} \times n_{\text{in}}))
* (s): pre-activations
* (g_s = \frac{\partial L}{\partial s}): backprop signal flowing into that layer (size (n_{\text{out}}))

Gradient w.r.t. weights:

[
\frac{\partial L}{\partial W} = g_s, a^{\top}
]

That’s already interesting: gradient is an **outer product** of backprop signal and activations.

Now vectorize the weights:
(\mathrm{vec}(W)) is a long vector of size (n_{\text{out}} n_{\text{in}}).

Then

[
\mathrm{vec}!\left(\frac{\partial L}{\partial W}\right)
= \mathrm{vec}(g_s a^{\top})
]

Using standard identity:

[
\mathrm{vec}(g_s a^{\top}) = (a \otimes I), g_s
]

or equivalently ((I \otimes g_s) a), depending how you write it. The key is: **Kronecker product appears naturally when you vectorize outer products.**

---

## 3. The Fisher block for one layer

The Fisher is the expectation of score outer products. For that layer’s weights, the block of the Fisher corresponding to (\mathrm{vec}(W)) is roughly:

[
F_W = \mathbb{E}\Big[
\mathrm{vec}!\left(\frac{\partial L}{\partial W}\right)
\mathrm{vec}!\left(\frac{\partial L}{\partial W}\right)^{\top}
\Big]
]

Plug in the expression:

[
\mathrm{vec}!\left(\frac{\partial L}{\partial W}\right)
= \mathrm{vec}(g_s a^{\top})
]

So:

[
F_W
= \mathbb{E}\big[ \mathrm{vec}(g_s a^{\top}), \mathrm{vec}(g_s a^{\top})^{\top} \big]
]

Now comes the **K-FAC approximation:**

1. Use the Kronecker identity:
   (\mathrm{vec}(g_s a^{\top}) = (a \otimes I), g_s), etc.
2. Assume **statistical independence** between (a) and (g_s) under the model’s distribution.
3. Pull expectations apart.

After a bit of algebra, you get the famous approximation:

[
F_W \approx A \otimes G
]

where

* (A = \mathbb{E}[a a^{\top}]): covariance (really 2nd moment) of activations
* (G = \mathbb{E}[g_s g_s^{\top}]): covariance of backprop signals

So instead of a huge Fisher block of size ((n_{\text{out}} n_{\text{in}}) \times (n_{\text{out}} n_{\text{in}})), we approximate it as a **Kronecker product of two small matrices**:

* (A): (n_{\text{in}} \times n_{\text{in}})
* (G): (n_{\text{out}} \times n_{\text{out}})

This is the core K-FAC idea.

---

## 4. Why Kronecker form is golden: inversion

We want the natural-gradient direction:

[
\Delta \theta \approx F^{-1} g
]

For the weights of one layer:

[
\Delta w = F_W^{-1} , \mathrm{vec}!\left(\frac{\partial L}{\partial W}\right)
]

K-FAC says: use

[
F_W \approx A \otimes G
]

Property of Kronecker products:

[
(A \otimes G)^{-1} = A^{-1} \otimes G^{-1}
]

So:

[
\Delta w
\approx (A^{-1} \otimes G^{-1})
\mathrm{vec}!\left(\frac{\partial L}{\partial W}\right)
]

Now use another Kronecker identity:

[
(A^{-1} \otimes G^{-1}) \mathrm{vec}(M)
= \mathrm{vec}\big( G^{-1} M A^{-1} \big)
]

Therefore we can implement the natural-gradient update for that layer as:

[
\Delta W \approx G^{-1}
\left(\frac{\partial L}{\partial W}\right)
A^{-1}
]

No explicit Kronecker, no giant Fisher. Just:

* compute two small inverses (or solves): (G^{-1}) and (A^{-1})
* sandwich the gradient.

That’s the magic trick.

---

## 5. What K-FAC does in practice (per training step-ish)

For each layer:

1. **Forward pass**: get activations (a).
   Accumulate (A = \mathbb{E}[a a^{\top}]) using an exponential moving average.

2. **Backward pass**: get backprop signals (g_s).
   Accumulate (G = \mathbb{E}[g_s g_s^{\top}]) similarly.

3. **Damping**:
   To make things stable, use

   [
   \tilde{A} = A + \lambda I,\quad \tilde{G} = G + \lambda I
   ]

   where (\lambda) is a damping parameter (like Tikhonov regularization).

4. **Compute inverses (or Cholesky solves)** of (\tilde{A}) and (\tilde{G}).
   This can be done every few steps, not necessarily every step.

5. **Precondition gradients**:

   [
   \Delta W = \tilde{G}^{-1}
   \left(\frac{\partial L}{\partial W}\right)
   \tilde{A}^{-1}
   ]

6. **Update parameters**:

   [
   W \leftarrow W - \eta, \Delta W
   ]

For biases, there’s a similar but simpler story; for conv layers, you adapt the definitions of (A) and (G) using “unfolded” patches or appropriate spatial averaging (that’s conv-K-FAC variants).

---

## 6. Geometric / “physicsy” intuition

Natural gradient wants to make steps that are “unit length” in the **Fisher metric**, not in the naïve Euclidean metric in parameter space. Rough analogy:

* Plain SGD: measure distance in parameter space → step size means “how far weights moved”.
* Natural gradient: measure distance in **function space** → step size means “how much the distribution (p(y\mid x,\theta)) changed”.

K-FAC’s layerwise Kronecker approximation roughly corresponds to:

* “Whitening” the activations by (A^{-1/2})
* “Whitening” the backprop signals by (G^{-1/2})

Then the gradient in that whitened space is more isotropic, so a simple step is closer to a true natural gradient step.

In other words, K-FAC is like **second-order preconditioning** tailored to the network’s statistics, not just elementwise scaling like Adam.

---

## 7. Where it shines and where it hurts

Nice parts:

* Much closer to natural gradient than Adam/SGD.
* Often **faster convergence in number of steps** (especially for smaller nets, RNNs, some vision models).
* Has a clear theoretical grounding in information geometry.

Annoying parts:

* Still heavier than Adam per step (you invert small matrices per layer, keep stats, tune damping).
* Assumes independence of (a) and (g_s), and block-diagonal Fisher across layers. Not exact.
* For massive modern transformers, people often use variants/approximations or go back to AdamW because engineering is simpler.

---

## 8. Quick “executive summary” in equations

For a linear/affine layer:

[
\frac{\partial L}{\partial W} = g_s a^{\top}
]

K-FAC approximates the Fisher block as

[
F_W \approx A \otimes G,\quad A = \mathbb{E}[a a^{\top}],\quad G = \mathbb{E}[g_s g_s^{\top}]
]

Then the natural gradient step for that layer is approximated by

[
\Delta W \approx G^{-1}\left(\frac{\partial L}{\partial W}\right)A^{-1}
]

and that’s the whole show.

---

If you want to go one level deeper next, we can derive the Kronecker form **explicitly** from the Fisher definition and the vec–Kronecker identities, or look at how K-FAC is modified for convolutional layers and recurrent nets, where the structure gets richer but the same spirit survives.
