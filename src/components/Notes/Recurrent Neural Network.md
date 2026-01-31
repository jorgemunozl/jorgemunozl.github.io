---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-12 13:35
modified: 2025-11-22 18:01
---

In the classic neural network if you give one input, this flow until became the output. Now what would happen if when is near to became the output we return it to the begin, it's like add a cycle. To this we call RNN.  

And it mention about the use of sequential data (orders matters) you need to keep it somewhere this is _hidden state_

, specifically how no idea. If the input is so long then it's probably that the [[Feed Forward Neural Network]] forget you know the vanishing problem, for that they create _LSMT_ (Long short term memory) networks.
GRU (Gated Recurrent Networks) no idea also. 

--- 

Some References:

```bibtex
@article{hochreiter1997long,
  title = {Long Short-Term Memory},
  author = {Hochreiter, Sepp and Schmidhuber, J{\"u}rgen},
  year = 1997,
  journal = {Neural Computation},
  volume = {9},
  number = {8},
  pages = {1735--1780},
  publisher = {MIT Press},
  doi = {10.1162/neco.1997.9.8.1735}
}
``` 
 
```bibtex
@article{elman1990finding,
  title = {Finding Structure in Time},
  author = {Elman, Jeffrey L},
  year = 1990,
  journal = {Cognitive Science},
  volume = {14},
  number = {2},
  pages = {179--211},
  publisher = {Wiley Online Library}
}
``` 
 