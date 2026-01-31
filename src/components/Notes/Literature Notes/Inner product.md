---
tags:
  - baby
  - atomic
author: Jorge
date: 2025-02-08 18:09
modified: 2025-09-13 10:10
---
Memer Scaling Up Memory For Robot Control Via Experience Retrieval
Hi Robot Open Ended Instruction Following with Hierarchical Vision Language Action Models 
[[pi 0.6 a VLA That Learns From Experience


>[!definition]
>The **inner product** is a [[Multilinear Function|bilinear function]], this is $\langle \cdot,\cdot \rangle:V\times V\to \mathbb{F}$ that follows certain properties[^1].
- When $\mathbb{F}$ is $\mathbb{R}$ we don't talk about **conjugates** and we obtain a nice well behave [[Euclid Vector Space]].
- When the [[Field]] is $\mathbb{C}$ then we call to the funciton: **Hermitian sesquilinear form**. (Hermitian property in $\mathbb{C}$ this is:)
$$\langle u,v \rangle=\overline{\langle v,u \rangle}$$
- The [[Gram matrix]] I think is useful for the [[Change of basis on multi linear maps|change the of basis using multi linear maps]] and [[Change of coordinate multi|also the coordinates]].


[^1]: [[Linear Algebra Done Right]] pp. 197


With accurate solutions to the many-electron Schrodinger equation all the chemistry could be derived from
first principles, but analytical treatment is intractable due the intrinsic strong electron-electron correlations, anti
symmetry and cusp behavior. Neural wave functions models such as FermiNet and PauliNet have advanced accuracy, yet
computational cost and error typically grows steeply with system size, limiting applicability to larger molecules.
They also lack of strong architectures designed to capture long-range electronic correlations with scalable
attention. In this work I develop the Psiformer a transformer-based ansatz that couples scalable attention with
physics-aware structure. Training is formulated within Variational Monte Carlo (VMC), evaluation will be do
it by comparing ground state energy against another traditional methods, I also outline design questions for
further improvement, including sparsified/global attention and optimizer choices inspired by recent transformer
advances.

El estado cuántico de un sistema de muchos electrones está completamente determinado por su función de onda Ψ(R)Ψ(R), la cual satisface la ecuación de Schrödinger independiente del tiempo.

Debido al principio de exclusión de Pauli, la función de onda debe ser **antisimétrica** bajo el intercambio de electrones, lo que tradicionalmente se representa mediante determinantes de Slater.
 
La presencia de interacciones de Coulomb impone además **condiciones cusp** electrón–electrón y electrón–núcleo, esenciales para describir correctamente la energía del sistema.
 
En el enfoque variacional, la energía fundamental se obtiene minimizando el cociente de Rayleigh sobre un conjunto parametrizado de funciones de onda, lo que permite introducir ansätze flexibles basados en modelos neuronales.



PsiFormer representa la función de onda de muchos electrones mediante un ansatz neuronal parametrizado Ψθ(R)\Psi_\theta(\mathbf{R})Ψθ​(R).

Como entrada se utilizan las coordenadas electrónicas y los espines, los cuales son embebidos en un espacio latente y procesados mediante una arquitectura basada en _Transformers_, capaz de modelar correlaciones no locales entre partículas.

El modelo produce una representación de log⁡∣Ψθ(R)∣\log|\Psi_\theta(\mathbf{R})|log∣Ψθ​(R)∣, lo que mejora la estabilidad numérica durante el entrenamiento.

La energía se estima mediante **Monte Carlo variacional**, muestreando configuraciones electrónicas y minimizando el valor esperado del Hamiltoniano con respecto a los parámetros θ\thetaθ.


Se evaluó PsiFormer en sistemas modelo de pocos electrones, comparando la energía fundamental obtenida con métodos de referencia como Hartree–Fock y ansätze neuronales recientes.

Los resultados muestran que PsiFormer logra una reducción sistemática del error energético, evidenciando una mejor representación de las correlaciones electrónicas.

La arquitectura basada en atención permite capturar dependencias no locales entre electrones, lo que se refleja en una convergencia más estable durante la optimización variacional.


- PsiFormer es un ansatz neuronal viable para sistemas cuánticos de muchos electrones.
    
- El uso de _Transformers_ permite capturar correlaciones electrónicas complejas.
    
- La combinación con Monte Carlo variacional produce resultados energéticos competitivos.
    
- El método es escalable y extensible a sistemas de mayor interés físico.