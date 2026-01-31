---
tags:
  - baby
date: 2025-12-25 11:55
modified: 2025-12-31 17:30
---
It's important in the [[Training Recipe for VLAs|training phase]], using inference you don't want it. [^1]
You use [[Flow matching for VLAs]] for inference, and is clear that you don't want they attend between each one. 

You minimize the expression:
$$ \mathbb{E}_{\mathcal{D}, \tau, \omega} \Big[ H\big(x_{1:M}, f_\theta^{\ell}(o_t, \ell)\big) + \alpha \,\big\lVert \omega - a_{t:t+H} - f_\theta^{a}(a_{t:t+H}, o_t, \ell) \big\rVert^{2} \Big] $$

Where the first term is the one which interest to us.

And we need to make a implementation about it.

[^1]: [[FAST Efficient Action Tokenization for Vision-Language-Action Models]]
