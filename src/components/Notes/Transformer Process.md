---
tags:
  - baby
date: 2025-10-19 08:14
modified: 2025-12-31 11:48
---
- From a sentence using your [[Vocabulary - Tokenizer|vocabulary]] obtain a vector $\mathbf{x}=\{ x_{1},x_{2},\dots,x_{n} \},x_{i}\in \mathbb{N}$.
- From the [[Embedding matrix]] you obtain $\mathbf{e}_{i}\in \mathbb{R}^{d}=\mathbf{E}[x_{i}]$, a column, the $x_{i}$ is acting as a index. (The shape of the **embedding matrix** is $\mathbf{E}\in \mathbb{R}^{d\times\lvert   \mathcal{V} \rvert}$ )
- The [[Positional encoding|positional encoding]] is $\mathbf{p}_{i}\in \mathbb{R}^{d}$ obtained using [[DIscrete Cosine Transform]], thus your first **hidden state becomes** is:
$$
\mathbf{h}_{i}^{(0)}=\mathbf{e}_{i}+\mathbf{p}_{i}
$$
And you obtain your first matrix of **hidden states**,$(B,\text{seq len},\text{embd})$, stack them.

What it's important for us is the **last hidden state** $\mathbf{h}^{(\ell)}$ your predicted token, (the question is what happened to the past tokens, they changed? Or they were only useful to compute the last hidden state, they are freeze?).

- You um embed that last hidden state.
$$
(B,\text{embd})\times \mathbf{U}=(B,\lvert \mathcal{V} \rvert )
$$
- Obtain the **logits**, $(B,\lvert \mathcal{V} \rvert)$, apply the [[SoftMax Function]], and choose the most probable logit. Using a hyperparameter $T$ or if $T=0$, be deterministic (almosst) [[Arg min and max]]. 
- And **detokenize** using the obtained index.

Now what happens between layer and layer, well the [[Attention mechanism]], and the [[Optimization for Transformers]]