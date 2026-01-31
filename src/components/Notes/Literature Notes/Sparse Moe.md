---
tags:
  - baby
author: Jorge
date: 2025-02-24 12:21
modified: 2025-08-16 14:51
---
Here only select a certain subset of experts, here we save computational perform.
Now the question is how we select the experts, we use the [[TopK function]] thus only use the experts with more closeness to a token. it's like also compute the wieghted sum but there are zeros and then only are necesarry, i guess that it's used a kind of conditional for not compute the expert
Now this direct to the [[Load balancing issue]], where like we are using only a subset certain of experts instead of using every expert, 