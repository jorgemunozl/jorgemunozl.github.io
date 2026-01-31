---
tags:
  - baby
author: Jorge
date: "2025-05-22 16:04"
---
>[!definition]
Let $\sigma$ be a [[Permutation]] over a set $S$, let $i,j\in S\subset \mathbb{N}$, such that $i<j$. The pair form an **inversion** if: $$\sigma(i)>\sigma(j)$$

- **Example**. $\sigma(123)=231$, $\sigma(1)=2$ and $\sigma(2)=3$, so $1<2$, $\sigma(1)<\sigma(2)$ , the order get preserve.
- It could happen one, two, three, ... , $p$ inversions. You need to take in account each case.
- We need to compare $\binom{n}{2}$ times.  Being $n$ the number of elements of the set.
- A [[Permutation|permutation]] is **even** if the number of [[Inversion]] is **even**, and **odd** when that number is **odd**.

Reference: @acunaDeterminant