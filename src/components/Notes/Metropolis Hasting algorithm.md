---
tags:
  - baby
date: 2025-10-23 22:12
modified: "{{2025-12-02}} {{13:59}}"
---
The name indeed is **Metropolis Hasting Algorithm**.
What's is the goal? Generate samples such that in the long run, the distribution of those is a chosen target distribution.

You have 
And what are the requirements? You need to know the target distribution up to a constant.

- The network draws the map.
- Metropolis is your hiker: propose  a step, maybe accept.
- Record local energy, where you've stood.
- Average the notes. For the integral that you are looking for

1. Take a initial configuration $\mathbf{X}_{0}\in E$ arbitrary:
2. Propose $\mathbf{X}'=\mathbf{X}_{0}+\eta$ ,where $\eta \sim q(\eta)$, $q$ is a probability density on $E$ called **proposal kernel**. In our case we are going to a [[symmetric Gaussian]].
3. Compute the quantity:
$$
A(\mathbf{X_{0}}, \mathbf{X}')=\text{min}\left( 1,\frac{\rho(\mathbf{X}')}{\rho(\mathbf{X}_{0})} \frac{q(\mathbf{X}'-\mathbf{X}_{0})}{q(\mathbf{X}_{0}-\mathbf{X}')}\right)
$$
Where $\rho$ is the target distribution where we want sample, In the case where $q$ is symmetric, this simplifies to:
$$
A(\mathbf{X}_{0},\mathbf{X}')=\text{min}\left( 1,\frac{\rho(\mathbf{X}_{l})}{\rho(\mathbf{X}_{0})} \right)
$$
4. Generate a uniform number $U\in[0,1]$
5. If: $U<A(\mathbf{X}_{0}\to \mathbf{X'}_{l})$ then $\mathbf{X_{1}}=\mathbf{X}'$, otherwise try another $\mathbf{X}'$. Accept or decline.
6. Repeat until obtain $N_{eq}$ accepted, the change stabilizes (stationary distribution) this phase is called **burn in**.
7. From $\mathbf{X}_{N_{\text{eq}}}$ generate $M$ samples until reach the sample $\mathbf{X}_{N_{\text{eq}}+M+1}$.
In each sample generates $E_{L}(\mathbf{R}_{k})$ then average to obtain $\mathbb{E}(E_{L})$ and begin the back propagation step.

Start at $\mathbf{R}_{0}$.
Perform $N_{\text{burn}}$ metropolis steps.
Start recording $M$samples:
In each step $N_{\text{burn}+k}$ compute local Energy $E_{L}(\mathbf{R}_{k})$ and four us the for the gradients. 
When finish averages and you have it.
, after that get samples, and evaluate energy, we have to make this every optimization step. Which I know is computationally expensive.

But how it borns? And how other obtain their $\rho$. For us it comes from a neural network. [^1]

[^1]: [[A quick introductio to Markov Chains and Markov Chain Monte Carlo]]
