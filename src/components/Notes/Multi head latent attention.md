---
tags:
  - baby
author: Jorge
date: "2025-02-12 19:17"
---
It's pretty related to save memory [[Query and Key on Attention]], in each [[Self attention mechanism on one head]]

We compress in a way all the information in a latent space.

Applied to keys and values [[Query and Key on Attention]] [[Values - LLM]], query do not use this mechanism of latent because we need them all the time. It's not necessary to be cached.
Down Projection 

Up projection


✅ En lugar de almacenar los **keys (K) y values (V) completos**, los proyecta a un espacio **latente más pequeño**.  
✅ Usa **matrices de compresión WD,WUW_D, W_UWD​,WU​** para reducir el tamaño de los KV-cache y luego reconstruirlos cuando sean necesarios.  
✅ **Ahorra memoria** y permite manejar **contextos más largos** sin perder precisión.
