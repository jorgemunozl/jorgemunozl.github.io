---
tags:
  - atomic
  - ml
author: Jorge
date: "2025-04-06 16:03"
---
One way to [[Fine-tune on large language models]] a model is through use adapters. Exist a family of them to enhance the capability of this models.

One of them is Low-Rank-[[Adapter to improve model, finetune]][^1], you have a linear layer . (First why linear layers? I think it has sense because if were not linear maybe a tiny change could end pretty bad, I am not sure) defined by the tensor $W\in \mathbb{R}^{m\times n}$. Such that:
$$
f(\mathbf{x})=W\mathbf{x}
$$
You add an adapter $\Delta W=sBA$ such that with $s$ an scalar and $A\in \mathbb{R}^{r\times m}$ and $B\in \mathbb{R}^{r\times n}$ are matrices, normally is choose $r\ll min(m,n)$ because the [[Complexity on lora]]. $r$ is the so called rank. Thus we change that linear layer to:
$$
f(\mathrm{x})=(W+\Delta W)\mathrm{x}
$$

[[hyperparameters using lora]]

>The code implementation [PEFT](https://github.com/huggingface/peft.git) by [[Hugging Face]].
>Parameter Efficient Fine-Tunning) an important library, [[quantization of the parameters]] 

[^1]: [[Lora Low-Rank Adaptation of Large Language Models]]
