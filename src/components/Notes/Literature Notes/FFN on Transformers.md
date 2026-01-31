---
tags:
  - baby
author: Jorge
date: 2025-02-15 12:31
modified: 2025-08-15 23:01
---
>Lets called **MLP** (multi layer perceptron).

On the [[Transformer]] context the [[FFN working]] have an crucial role.
On a each [[Transform Architecture|transformer layer]] this are place after the [[Multi-head attention]] layer thus each word have more information inside therefore the input it's a vector that has passed the [[Self attention mechanism on one head|self attention mechanism]] this pass for a **Linear - ReLu - Linear**  [[Feed Forward Neural Network]] (there's no interaction with another vectors). The result of this process is added to the input [^1].

That is to say.
$$
\begin{align}
FFN(x)=&max(0,xW_{1}+b)W_{2}+b_{2} \\
x+=&FFN(x)
\end{align}
$$

$W_{1}$ expands the dimensionality) whereas the second compresses it back. We expand the dimensionality to make the vector more rich, it's like have more possibilities that it's the idea of dimension,it's like how many questions on the word you want, four time is used and the optimal trade off between capacity and efficiency.

We can think the result of the first like a vector formed by the dot product be the input vector and the nth row, whereas the second like the sum vector the columns scaled by the numbers of the input vector.

Conceptually we could this process like relate facts to a certain word, how knows the model that the word Einstein is related to physics, the model only see a vector of numbers, this is why FFN exists. Each layer have the mission of make interact concept, break down complex ideas.  

>Another way of describing this is as two convolutions with kernel size 1 ?? Yeah.

[^1]: [[Attention Is All You Need]] pp. 5
