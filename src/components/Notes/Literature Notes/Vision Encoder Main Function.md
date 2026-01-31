---
tags:
  - young
  - atomic
author: Jorge
date: 2025-08-06 23:16
modified: 2025-08-14 16:16
---
The vision encoder is responsible for take one image and process it, [[computer vision|understand the image]], what are the most and less features in the image, all the possible visual representations.

All that information is translate on the only language that [[large language model]] understands, vectors.

The how the visual encoder works is interesting, it remounts to [[Alex Net]] using [[Convolution Neural Network]] mostly, but now the sota models use the [[Attention mechanism]] with [[Transformer|transformers]] as the main architecture, the so called [[Vision transformer like encoder|Vit]].

Is important to mention that exist a mechanism to integrate the output of the vision encoders with the llm architecture, these has different names such as [[Connector Between Vision and LLm|connection mechanism]], integration mechanism, **multi-modal encoder**, etc. [^1] [^2]

Of course exist a huge amount of variations or techniques in order to approach this [[Why IA exist, pattern recognisition|vision problem]].

The images encoder what we care about:

[[vision encoder types]]

[^1]: [[Inside Multimodal LLama 3.2]]

[^2]: [[An introduction to Visual Language Modeling]]
