---
tags:
  - baby
author: Jorge
date: 2025-08-12 11:29
modified: 2025-11-01 23:20
---
# Vision modeling with Transformers and a fine tunning

## Table of Contents

1. [Motivation](#Motivation)
2. [The age of agents](#The%20age%20of%20agents)
3. [Why small models?](#Why%20small%20models?)
4. [Llama Vision](#Llama%20Vision)
5. [Tunning Challenges - LLM TO SLM](#Tunning%20Challenges%20-%20LLM%20TO%20SLM)
	1. [Explaining the Large Vision model](#Explaining%20the%20Large%20Vision%20model)
	2. [Llama Vision 3.2 Architecture](#Llama%20Vision%203.2%20Architecture)
6. [Synthetic Data](#Synthetic%20Data)
7. [Data Preparation](#Data%20Preparation)
8. [Training process using Lora](#Training%20process%20using%20Lora)
9. [Inference Time](#Inference%20Time)
10. [Benchmarks](#Benchmarks)
11. [Take Aways](#Take%20Aways)
12. [Citation](#Citation)
13. [References](#References)

---
>Special thanks to [Joel Timana](https://github.com/joevidev) for a lot of super valuable feedback during the process of this project.

# Motivation

Fine tunning a model is complicated (then I like it), but in first place why I would do that?

[[Tune problems-challenges]] and [[How re use a model - recicle SLM to specific SLM]] are the the reasons of the work. 

# The age of agents

Agentic solutions had spread around the globe and had been widely aceppted , some incredibles examples are Lovable, Cursor, ClaudeCode  the most use for differents companies and start ups, the core of them are Multimodal Large Language Models, these are provided by companies such as OpenAI, Anthropic, Google, etc. 


The performance of such a models are amazingly good, the prices each time are more accesible, and the inference speed grews since the clusters get improved, the investment on infrastructure continue growing and all seems that is going to the hill.

Now there are cases when we want to use a model for an specific task that is not that complex, it worth use a model that big for this matter? 

**cite** proposes SLM's to tackle specifc-repetitive task. A small model should be less around 10 billion of parameters and they propose interesting stuff, but also the limitations that these models create. 

One matter relies on the finne tunne of SML's which in a near future, could be change or insert foot note to that post. And this the topic of this work.

Is clear that in high specialized environment each of the steps to tune a model is delegate to a expert group, so for a basic understanding of how this process is made this work exist.

We are gonna to realizing a fine-tune over the Llama Vision 3.2 model from META.AI with the goal of the recognisement of flowcharts for the translation into Mermaid code curated by [unsloth](https://unsloth.ai/).

# Why small models?

Is clear that talking in a more general case we are going always prefer a LLM rather than a SLM, they are indeed better, but stop there it doesn't have sense use a exagerately big model on a repetitive specif task, they are not economy and in comparation to a SLM the latency is !. @belcak2025smalllanguagemodelsfuture

Another more efficent but tedious approach is use a fine-tune model specific for the said task.

your task, we could take an open source model and we only worry about the hardware needed to inference. But actually exists a considerable amount of cloud services so let's suppose that is not actually a problem.

If we want to achieve a good performance in a specific task, have limited resources fine-tune is not a trivial task, there are also certain nuances that are necessary to face.

# Llama Vision and the Vit Architecture

So there exist the clear case of the AlexNet but those are using convolutional neural networks.

@dosovitskiy2021imageworth16x16words , 


and I care about how OpenAI build its model.

And here CLIPS it seem it a lot interesting.

[[computer vision evolution]]
[[Vision encoder main function]] [[Connector Between Vision and LLm]]
[[Llama Vision Instruct 3.2]]


# Tunning Challenges - LLM TO SLM

Choose a proper model, if we want a specific model that resolve that task, we need to answer the follow matters: the base model, data with train, the best ways and more cutting edge ways to train the model, the hardware and environment needed in order to make that, the metrics and benchmarks to know if indeed exist a improvements, and of course the knowledge necessary to implement all. @radford2021learningtransferablevisualmodels

If it's true that currently exist a huge amount of tools available on internet published by the community which make the process more direct and seamsly there is still a considerable work to do it, 

## Explaining the Large Vision model

The computer vision is one field that pass trough a lot, an important breakthrough was Alex Net. @krizhevsky2012imagenet

![[Screenshot From 2025-10-31 21-52-06.png|500x255]]
Visual Transformer architecture.

$$
x \in \mathbb{R}^{H \times W \times C} \quad \rightarrow \quad N = \frac{HW}{P^2} \text{ patches of size } P \times P

$$

$$
z_0 = [x_p^1 E; x_p^2 E; \dots; x_p^N E] + E_{\text{pos}}
$$

## Llama Vision 3.2 Architecture

Before to begin with the data-set obtain. A comprenhesive understanding of how this models works is important in order to understand the respective the parameters.
The family of Vision models is big exist different innovation that each company made, how you realize the pre-training is an important one. @krizhevsky2012imagenet


The first is find actual works on Lora I wonder if I can tweak the unsloth code to use QLora. First you have to make some reasearch on QLora, the pseudo code, how applied to where to find the data sets, generation of data synthetic, data augmentation where to find the data sets, generation of data synthetic, data Augmentation, some nice graphs during the training process, the GPUS used inference and training, finding metric, reference to the actual metrics. And further improvements.Yeah I can make the pdf and the .md version, so how to the Llama 3.11 models @qi24insidemllama . vision instruct, we could make also llm tunning with the mermaid syntax, yeah we have until know. The visual large language models are funded on the convolutional layers which are quite amazing, the goal of this text is train a vllm more specificaly. I have one month to do it! Which it is the first part? The model is gonna to be fine-tune for the creation of diagrams using Mermaid. @bordes2024introductionvisionlanguagemodeling

To fine-tune the model we are gonna to use a big

We could create Synthetic data easily with Langgraph and an API.


# Data Preparation

Since we are gonna to be training a model to from images create code, we are
gonna to use a collator to merge them.
The HugginFace repositories are always available, we are gonna to use four
repositories more Data augmentation techniques
you can easily find the data set on


# Training process using Lora

The training process is straighforward since the library PEFT from HugginFace do
all the work for us. Our work relies on know what hiper parameters are gonna to use
to use since if we want to apply QLora in the future.

Is amazing see the big difference between the inference of OPENai Anthropic and another guys compared with a modest GPU. 


# Citation 

Or use BibTex citation:

```
@article{munoz2025vision,
  title = {Understanding Vision Models},
  author = {Munoz, Jorge},
  journal = {munBlog},
  year = {2025},
  month = {July},
  url = "https://jorgemunoz.github.io
}
```

# References

Belcak, P., Heinrich, G., Diao, S., Fu, Y., Dong, X., Muralidharan, S., Lin, Y. C., & Molchanov, P. (2025). _Small language models are the future of agentic AI_. [https://arxiv.org/abs/2506.02153](https://arxiv.org/abs/2506.02153)

Bordes, F., Pang, R. Y., Ajay, A., Li, A. C., Bardes, A., Petryk, S., Mañas, O., Lin, Z., Mahmoud, A., Jayaraman, B., Ibrahim, M., Hall, M., Xiong, Y., Lebensold, J., Ross, C., Jayakumar, S., Guo, C., Bouchacourt, D., Al-Tahan, H., … Chandra, V. (2024). _An introduction to vision-language modeling_. [https://arxiv.org/abs/2405.17247](https://arxiv.org/abs/2405.17247)

Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., & Houlsby, N. (2021). _An image is worth 16x16 words: Transformers for image recognition at scale_. [https://arxiv.org/abs/2010.11929](https://arxiv.org/abs/2010.11929)

Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. In F. Pereira, C. J. C. Burges, L. Bottou, & K. Q. Weinberger (Eds.), _Advances in neural information processing systems 25_ (pp. 1097–1105). Curran Associates, Inc. [https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf](https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)

Qi, J. (2024). Inside MLLaMA 3.2: Understanding meta’s vision-language model architecture. _Medium_. [https://j-qi.medium.com/inside-mllama-3-2-understanding-metas-vision-language-model-architecture-ae12ad24dcbf](https://j-qi.medium.com/inside-mllama-3-2-understanding-metas-vision-language-model-architecture-ae12ad24dcbf)

Radford, A., Kim, J. W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J., Krueger, G., & Sutskever, I. (2021). _Learning transferable visual models from natural language supervision_. [https://arxiv.org/abs/2103.00020](https://arxiv.org/abs/2103.00020)