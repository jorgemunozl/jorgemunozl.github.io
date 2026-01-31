---
tags:
  - baby
  - ml
author: Jorge
date: 2025-04-29 13:43
modified: 2025-08-11 22:30
---
We know that a part of what we call _context_ relies on the use of adjectives, what other words are around, the physical space between the receiver and speaker, all those factors.

This modifies the meaning of the word, but how could a model understand all these modifications? 

>[!example]
>That person is crying (a funeral) (a success-hard event).

Solution:
word -> vector + attention


---
for us this is translated to change the values of the [[Tokenizer|words trough its vector parameters]].

Thus, we have to know the position of the words and ask if there adjectives in front of a word, for that purpose exists the _query vector_.

This have all the implicit information of the context related to a specific word, thus to each vector we have associated a _query vector_ that encodes all that contextual information respect that word.