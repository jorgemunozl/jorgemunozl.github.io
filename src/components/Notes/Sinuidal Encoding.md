---
tags:
  - baby
author: Jorge
date: 2025-02-18 21:14
modified: 2025-08-19 08:47
---
One way to approach the [[Positional encoding]] issue but we are covering the way give it by the and is used by different model like _GPT, Bert, T5_.

Basically we create a matrix $P$, (not surprises it's deep learning). The dimensions of the matrix, is the dimension of the model $d_{n}$ and the quantity of words that we want to encode. And the values are obtained by.

$$
\begin{align}
P(k,2i)=\sin\left( \frac{k}{n^{2i/d_{n}}} \right)
 \\ P(k,2i+1)=\cos\left( \frac{k}{n^{2i/d_{n}}} \right)
\end{align}

$$

Where $0\leq i\leq \frac{d_{n}}{2}$, $k$ is the index of the word the classic. It's like assign two functions (cos and sine) to a word. (Discrete case).

Thus we for each word we have a vector called ***Positional Vector***, the sum of the [[Tokenizer|embedding vector]] and this is called the **Positional Encoding** and with this we begin to work.

Now why uses sines and cosines? [[Use of trigonometric function - Encoding]]

