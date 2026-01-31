---
tags:
  - baby
author: Jorge
date: 2025-03-05 14:43
modified: 2025-08-16 15:18
---
Let $t$ be amount of links in this chain. $t=1,2,3,4,\dots ,C$, for $t=1$ there two links.
Then we define $x^{(0)}=x$.

$$
x^{(t)}=\sum_{i=1}^{n}\hat{E}_{i}+\sum_{i=1}^{n}\mathcal{G}_{i,t}f(x^{(t-1)})+\mathbb{I}_{r}\cdot x^{(t-1)}  
$$

Where $\hat{E}_{i}$ are the shared experts, $\mathcal{G}$ the [[Gating Network]] $f$ and specific task expert, $\mathbb{I}$ the residual connection, it's like a recursive function.
And the output is $x^{(C)}$ that its is practically a chain of a lot of data.

I mean each $x^{(t)}$ if you forget the residual it's like forget a part of the anterior chain but equal exist thus chain because exist the function evaluated on $x^{(t-1)}$, and also the gating network it's has something of the information of the chain. 

Any ways it's was experimental proved that with $\mathbb{I}$ the model perform better, and also 

And the interpretation of T is for discuss I mean here it work to represent the iteration, in deepseek v2 represents the number of token in a bathc I guess and chatgtp tell me that represent the task specific in a multitask operation, then it could be many means.

The question and the constant in these three are that, the gating it's is not the same for each t, change in this specific case this $e_{t,i}$ it's is a router product of train the N.N gating network. it's a vector of course when we are talking on a single input that also it's is a vector.

I guess that we choose this notation to explain that refers the election of one expert $E$ and in the core $e$, this establish a relation between $E$ and $e$ it's merely notation. I mean If I want to know I must see the code. Learn to code

This emerges the independent gating mechanism,  using this mechanism perform better that the [[Sparse Moe]] which it's awesome. 

[[Chain-of-experts Unlocking the communication power of mixture-of-experts models]]