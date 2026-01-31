---
tags:
  - baby
date: 2025-10-29 17:56
modified: 2025-10-29 18:10
---
Perfect — let's actually _do it_. Let’s “plug the hydrogen atom” into the time-independent Schrödinger equation and walk through the math until we get the energy levels (E_n) and the general form of the wavefunction (\psi_{n\ell m}).

We’ll go step-by-step but skip only the messy algebraic middle parts, explaining what happens conceptually at each one.

---

### 1. Write the time-independent Schrödinger equation

For one electron in a Coulomb potential (V(r) = -\dfrac{e^2}{4\pi\varepsilon_0 r}),  
[  
\hat{H}\psi = E\psi  
]  
with  
[  
\hat{H} = -\frac{\hbar^2}{2\mu}\nabla^2 - \frac{e^2}{4\pi\varepsilon_0 r}.  
]  
Here (\mu) is the **reduced mass** of the electron–proton system (almost equal to the electron mass).

---

### 2. Express the Laplacian in spherical coordinates

Because (V(r)) depends only on (r), the problem has **spherical symmetry**.  
So use spherical coordinates ((r, \theta, \phi)):  
$$
\nabla^2 =  
\frac{1}{r^2}\frac{\partial}{\partial r}!\left(r^2\frac{\partial}{\partial r}\right)  
-\frac{\hat{L}^2}{\hbar^2 r^2},  
$$ 
where (\hat{L}^2) is the **angular momentum operator**.

---

### 3. Separate variables

Assume the wavefunction factorizes as  
[  
\psi(r,\theta,\phi) = R(r)Y(\theta,\phi).  
]  
Plug it into the equation, divide by (R Y), and rearrange terms. You get:  
[  
-\frac{\hbar^2}{2\mu}\frac{1}{R r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right)

- \frac{\hat{L}^2 Y}{2\mu r^2 Y}
    

- \frac{e^2}{4\pi\varepsilon_0 r} = E.  
    ]  
    The angular part must be constant, because the left side depends on (r) and the right side depends on angles. That constant is the **eigenvalue of** (\hat{L}^2):  
    [  
    \hat{L}^2 Y_\ell^m = \hbar^2 \ell(\ell+1) Y_\ell^m.  
    ]  
    So (Y(\theta,\phi)) must be a **spherical harmonic** (Y_\ell^m).
    

---

### 4. The radial equation

Now the remaining radial equation is:  
[  
\frac{1}{r^2}\frac{d}{dr}!\left(r^2\frac{dR}{dr}\right)

- \frac{\ell(\ell+1)}{r^2}R
    

- \frac{2\mu}{\hbar^2}!\left(E+\frac{e^2}{4\pi\varepsilon_0 r}\right)R = 0.  
    ]
    

---

### 5. Simplify the radial equation

It’s easier if we define (u(r) = r R(r)).  
Then the equation simplifies beautifully to:  
[  
\frac{d^2u}{dr^2}

- \frac{2\mu}{\hbar^2}!\left(E+\frac{e^2}{4\pi\varepsilon_0 r}\right)u
    

- \frac{\ell(\ell+1)}{r^2}u = 0.  
    ]  
    This is a one-dimensional Schrödinger equation for (u(r)) with an effective potential:  
    [  
    V_{\text{eff}}(r) = -\frac{e^2}{4\pi\varepsilon_0 r} + \frac{\hbar^2\ell(\ell+1)}{2\mu r^2}.  
    ]
    

---

### 6. Bound-state condition ((E<0))

For bound states, the energy (E) is negative.  
Define a few constants to make life easier:  
[  
\rho = \frac{2r}{a_0 n}, \quad \text{with } a_0 = \frac{4\pi\varepsilon_0 \hbar^2}{\mu e^2}.  
]  
After substituting and simplifying, you find the equation has polynomial-like solutions only if **the series for (u(r))** terminates — that’s the quantization condition.

---

### 7. Quantization condition (where magic happens)

That termination condition forces:  
[  
E_n = -\frac{\mu e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\frac{1}{n^2}, \quad n = 1,2,3,\dots  
]  
That’s your **energy spectrum**.  
Notice: it doesn’t depend on (\ell) or (m) — all states with the same (n) are degenerate (same energy).

---

### 8. The final wavefunctions

The full solutions are:  
[  
\psi_{n\ell m}(r,\theta,\phi) = R_{n\ell}(r)Y_\ell^m(\theta,\phi),  
]  
with  
[  
R_{n\ell}(r) = N_{n\ell}\left(\frac{2r}{na_0}\right)^{!\ell} e^{-r/(na_0)}  
L_{n-\ell-1}^{2\ell+1}!!\left(\frac{2r}{na_0}\right),  
]  
where (L_{n-\ell-1}^{2\ell+1}) are **associated Laguerre polynomials** and (N_{n\ell}) is a normalization constant.

---

### 9. Example: ground state

For (n=1,\ \ell=0,\ m=0),  
[  
\psi_{100}(r) = \frac{1}{\sqrt{\pi a_0^3}} e^{-r/a_0}.  
]  
Energy:  
[  
E_1 = -13.6,\text{eV}.  
]  
That’s hydrogen’s ground state — the simplest atom in the universe, perfectly described.

---

### 10. What you’ve obtained

From this single equation, you’ve extracted:

- The **quantized energy levels** of hydrogen.
    
- The **atomic orbitals** (wavefunctions).
    
- The **probability density shapes** (s, p, d...).
    
- The foundation for understanding **spectra**, **chemical bonds**, and **quantum numbers**.
    

---

If you want, I can show you the **explicit steps** of how the radial equation is solved into Laguerre polynomials — it’s a neat mix of substitution tricks and boundary-condition reasoning. Would you like to go into that part?


[[Quantum Numbers]]