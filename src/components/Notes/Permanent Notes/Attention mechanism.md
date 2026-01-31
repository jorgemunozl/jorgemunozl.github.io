---
tags:
  - baby
  - ml
author: Jorge
date: 2025-06-02 08:03
modified: 2025-11-01 17:51
---
The attention mechanism in the most abstract way. When it was used for first time.

The first raw version was from **Neural Machine Translation by Jointly Learning to Align and Translate**:

$$
e_{ti}=v_{a}^{T}\tanh(W_{a}s_{t-1}+U_{a}h_{i})
$$

Then apply softmax:

$$
\alpha_{ti}=\frac{\exp(e_{ti})}{\sum \exp(e_{tj})}
$$

Then compute the classic weigthed average:

$$
c_{t}=\sum\alpha_{ti} h_{i}
$$
---
Yes — and it’s a lovely one, because it’s deceptively simple.

In **Bahdanau et al. (2015)**, the attention mechanism is a _soft alignment_ between the decoder state (what you’ve generated so far) and each encoder hidden state (the “memory” of the input sentence).

Let’s unpack it piece by piece.

We have:

- Encoder hidden states: ( h_1, h_2, \ldots, h_{T_x} )
    
- Decoder hidden state at time ( t-1 ): ( s_{t-1} )
    

The _alignment model_ ( a(s_{t-1}, h_i) ) produces a scalar “score” that says how well position ( i ) in the input matches what the decoder needs next.

Bahdanau parameterized this with a small feedforward neural network:

[  
e_{ti} = v_a^{\top} \tanh(W_a s_{t-1} + U_a h_i)  
]

where:

- ( W_a ) and ( U_a ) are weight matrices,
    
- ( v_a ) is a learnable vector projecting to a scalar score.
    

Then they normalize these scores across all encoder positions with a softmax to get **attention weights**:

[  
\alpha_{ti} = \frac{\exp(e_{ti})}{\sum_{k=1}^{T_x} \exp(e_{tk})}  
]

Finally, they use those weights to compute the **context vector** — the weighted average of encoder states:

[  
c_t = \sum_{i=1}^{T_x} \alpha_{ti} h_i  
]

That ( c_t ) is then fed into the decoder RNN to generate the next word.

If you look closely, that’s the seed of what we now call _additive attention_ (as opposed to the _dot-product attention_ in Transformers).

In the Transformer, Vaswani replaced this little MLP scoring function with a simple scaled dot product and made the entire thing parallelizable — but the _core idea_ is exactly this:  
assigning weights to a set of vectors based on their relevance to a query, then taking their weighted sum.

If you visualize this, it’s like the model has a spotlight that dynamically brightens and dims parts of the input sentence as it reads and writes.