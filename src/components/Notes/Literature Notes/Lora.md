---
tags:
  - baby
  - ml
author: Jorge
date: "2025-04-06 16:03"
---
>[!definition]
>The low-rank adapters (**Lora**) is [^1] 

And together with [[RAG]] best techniques to improve the capacity of LLMs

Buenos una forma eficiente y bastante bonita de hacer fine tunninng is using this method called Low-Rank Adaptation that I'm not gonna say its benefits until I comproved until I check it for my sefl.

Basically instead of change all the parameters, you add "layers" estas layers estarian formadas pro matrices creo yo.

Tienes un layer lineal tal que $W\in \mathbb{R}^{m\times n}$

$$
f(\mathbf{x})=W\mathbf{x}
$$

Despues de hacer finetunning tu tienes 

$$
W'=W+\Delta W
$$

Or well you can add a scalar for more flexibility $\Delta W=sBA$

This $\Delta W$ represent our finetunning, the fun when I say $\Delta W=BA$ in such a way that this natrices $B\in \mathbb{R}^{m\times r}$ and  $A\in \mathbb{R}^{r\times n}$, donde $r\ll min(m,n)$ , a el r le llamamos rank,
para $r=1$, basicamente la matriz de mn elementos esta contenida en m+n elementos eso no es hermoso.

Ahora para $r\neq1$, seria $r(m+n)$. Ahora algo mas chucha inclusive es [[multi head lora]]

siendo mas especifico esta cosa cambia del $\mathcal{O}(r(m+n))$ hacia $\mathcal{O}(mn)$. Donde $\mathcal{O}$ es la [[Big O-complexity]]

Este invencion si quieres fue desarrollada en 2022 tres años desde la creacion de esta nota. 

Ahora el siguiente paso en la eficiencia es [[multi head lora]]

como este es bastante pequeño.  Entonce todo el trabajo acabaria en encontrar esas dos matrices que 

Lo aplicamos al [[Query and key]] [[Values - LLM]]

[^1]: [[Training Neural Networks from Scratch with Parallel Low-Rank Adapters]] 
