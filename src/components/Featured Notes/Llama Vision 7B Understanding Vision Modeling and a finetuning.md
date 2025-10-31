---
tags:
  - baby
author: Jorge
date: 2025-08-25 11:29
modified: 2025-10-25 11:24
---

Special thanks to [Joel Timana](https://wwww.linkedin.com/) for a lot of super valuable feedback during the process of this project.

# Why I would do that?

Agentic solutions had spread around the globe and had been widely aceppted , some incredibles examples are Lovable, Cursor, ClaudeCode  the most use for differents companies and start ups, the core of them are Multimodal Large Language Models, these are provided by companies such as OpenAI, Anthropic, Google, etc. 

The performance of such a models are amazingly good, the prices each time are more accesible, and the inference speed grews since the clusters get improved, the investment on infrastructure continue growing and all seems that is going to the hill.

Now there are cases when we want to use a model for an specific task that is not that complex, it worth use a model that big for this matter? 

**cite** proposes SLM's to tackle specifc-repetitive task. A small model should be less around 10 billion of parameters and they propose interesting stuff, but also the limitations that these models create. 

One matter relies on the finne tunne of SML's which in a near future, could be change or insert foot note to that post. And this the topic of this work.

Is clear that in high specialized environment each of the steps to tune a model is delegate to a expert group, so for a basic understanding of how this process is made this work exist.

We are gonna to realizing a fine-tune over the Llama Vision 3.2 model from META.AI with the goal of the recognisement of flowcharts for the translation into Mermaid code.
curated by [unsloth](https://unsloth.ai/).


# Why small models?

Is clear that talking in a more general case we are going always prefer a LLM rather than a SLM, they are indeed better, but stop there it doesn't have sense use a exagerately big model on a repetitive specif task, they are not economy and in comparation to a SLM the latency is !. 

Another more efficent but tedious approach is use a fine-tune model specific for the said task.

your task, we could take an open source model and we only worry about the hardware needed to inference. But actually exists a considerable amount of cloud services so let's suppose that is not actually a problem.

If we want to achieve a good performance in a specific task, have limited resources fine-tune is not a trivial task, there are also certain nuances that are necessary to face.

# Llama Vision 

Clip based.


# Tunning Challenges - LLM TO SLM

Choose a proper model, if we want a specific model that resolve that task, we need to answer the follow matters: the base model, data with train, the best ways and more cutting edge ways to train the model, the hardware and environment needed in order to make that, the metrics and benchmarks to know if indeed exist a improvements, and of course the knowledge necessary to implement all.

If it's true that currently exist a huge amount of tools available on internet published by the community which make the process more direct and seamsly there is still a considerable work to do it, 

## Explaining the Large Vision model
The computer vision is one field that trough

## Llama Vision 3.2 Architecture
> With focus eyes on the Finne Tunning.

Before to begin with the data-set obtain. A comprenhesive understanding of how this models works is important in order to understand the respective the parameters.
The family of Vision models is big exist different innovation that each company made, how you realize the pre-training is an important one

The first is find actual works on Lora I wonder if I can tweak the unsloth code to use QLora. First you have to make some reasearch on QLora, the pseudo code, how applied to where to find the data sets, generation of data synthetic, data augmentation where to find the data sets, generation of data synthetic, data Augmentation, some nice graphs during the training process, the GPUS used inference and training, finding metric, reference to the actual metrics. And further improvements.Yeah I can make the pdf and the .md version, so how to the Llama 3.11 models. vision instruct, we could make also llm tunning with the mermaid syntax, yeah we have until know. The visual large language models are funded on the convolutional layers which are quite amazing, the goal of this text is train a vllm more specificaly. I have one month to do it! Which it is the first part? The model is gonna to be fine-tune for the creation of diagrams using Mermaid.


# Synthetic Data

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
to use since if we want to apply QLora in the future


# Inference Time



# Benchmarks


# Take Aways

# Citation 

Or use BibTex citation:

```
@article{munoz2025vision,
  title = {Understanding Vision Models},
  author = {Munoz, Jorge},
  journal = {munBlog},
  year = {2025},
  month = {July},
  url = "https://lilianweng.github.io/posts/2025-05-01-thinking/"
}
```

# References

_Latex Based_