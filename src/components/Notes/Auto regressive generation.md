---
tags:
  - baby
author: Jorge
date: 2025-02-07 15:27
modified: 2025-11-06 11:09
---
**Auto-regressive generation** is a method where a model generates text **one token at a time**, using previously generated tokens as context for predicting the next one.


### **How It Works**

1. **Start with an Input (Prompt):**
    - Example: _"The cat is on the"_
2. **Predict the Next Token:**
    - The model computes the probability of possible next words (e.g., "table", "roof", "moon").
    - It selects the most likely one (e.g., "table").
3. **Append the New Token & Repeat:**
    - The sequence becomes _"The cat is on the table"_.
    - Now, the model predicts the next word using this updated context.
4. **Continue Until Stopping Condition:**
    - The process stops when reaching a **special token** (like `<EOS>` for end-of-sentence) or after a fixed length. 

### **Key Properties**

✔ **Uses the last token to predict the next one** (causal).  
✔ **Each step depends on previous outputs**, making it sequential.  
✔ **Cannot revise previous words**, so errors can compound (exposure bias).


### **Where It’s Used**

- **GPT models (e.g., GPT-4, GPT-3, etc.)** → Text completion.
- **Language modeling** → Predicting missing words.
- **Music & Image Generation** → Generating content sequentially.
