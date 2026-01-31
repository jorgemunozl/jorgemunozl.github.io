---
tags:
  - young
  - ml
author: Jorge
date: 2025-03-06 12:17
modified: 2025-08-22 09:18
---
>[!definition]
> A **bit** is represented by a zero or one, a turn off or a turn on, true or false, positive or negative, for computers it means if there exist electrical current or not.
> The [[CPU First Peek]] knows this and from this makes operations.
> Instead a **byte** is a set of bits, more specifically eight bits. With this we could represent $2^{8}-1$ numbers this is 255 numbers. (The minus one to counting the zero).

- The important part of this abstraction of the [[Binary system]] allows to us make the common operations using [[Apply the Boolean Algebra by Logic Gates Classic|logic gates]].
- It's difficult to believe that a set of bits really represents information, I mean how is it possible that a set of numbers represents my voice for instance but no worries this framework is a product of [[Information Theory]].
- A set of bytes could represent more complex numbers for instance an integer is represented by $2^{32}-1$ (four bites). Which is $\pm2,147,483,647$, but well that depends on the context, exist `int8` or `int16`.
- A char is represented by a byte $2^{8}-1$ (one bite), 255 numbers to represent all the characters. (ASCII system)
- And of course for float numbers we can use four or even eight bytes.  $2^{32}$ $$
2^{64}
$$

>And if you ever wonder what means this of `WindowsX32` or `Windows X64`, is the precision used.
