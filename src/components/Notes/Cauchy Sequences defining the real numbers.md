---
date: 2024-12-07
tags:
  - atomic
  - young
author: Jorge
modified: 2025-10-22 10:25
---
A interesting thing about this is that sequence obeys certain properties and is one formal way to define the [[Real Numbers]].

A real number can be defined as the limit of a **Cauchy sequence** of rational numbers.

- Consider all Cauchy sequences of rationales.
- Two sequences ${}\{a_n\}$ and $\{ b_{n} \}​$ are **equivalent** if $\lim_{n \to \infty} |a_n - b_n| = 0$
- Each equivalence class of these sequences defines a real number.

**Example:** The number $\sqrt{2}$​ can be approximated by the sequence: [^1]

$$1,1.4,1.41,1.414,…
$$

>Basically the same of Cantor's Fundamental Sequence
Any ways the properties that follow a Cauchy Sequence are:
- The sequence is bounded
- Converges in $\mathbb{R}$ (What about $\mathbb{C}$?)
- Are useful at the moment of talk about the [[Complete Metric Space]]

[^1]: [[The real Numbers and Real Analysis]] pp. 72
