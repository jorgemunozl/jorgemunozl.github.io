---
tags:
  - baby
author: Jorge
date: 2025-02-10 08:47
modified: 2025-08-09 15:57
---
Is like a boundary there we can apply all the related to the _context_. This is how many tokens the [[Birth of LLMs]] can attend on once.

Respect the [[Self attention mechanism on one head|self attention mechanism]] with a context size of $n$ this scales like $O(n^{2})$. Thus is important to careful set this number.

Of course the power computations is several affected for exaggeratedly numbers of the context size.

The network only can process a fix number of vectors at a time. Context size GPT3=2048

Now Gemini (Google's model) achieve one million of tokens