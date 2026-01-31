---
tags:
  - baby
date: 2025-11-01 15:54
modified: 2025-11-09 12:10
---
So all of this is [^1]


$$
\mathbf{h}_{i}^{\ell \alpha} \gets \text{concatenate}(\mathbf{r}^\alpha_i - \mathbf{R}_I, |\mathbf{r}^\alpha_i - \mathbf{R}_I|\ \forall\ I)
$$
$$
\mathbf{h}_{ij}^{\ell \alpha\beta} \gets \text{concatenate}(\mathbf{r}^\alpha_i - \mathbf{r}^\beta_j, |\mathbf{r}^\alpha_i - \mathbf{r}^\beta_j|\ \forall\ j,\beta)
$$
$$
\begin{align}
    &\left(
    \mathbf{h}^{\ell\alpha}_i,
    \frac{1}{n^\uparrow}\sum_{j=1}^{n^\uparrow} \mathbf{h}^{\ell\uparrow}_j, \frac{1}{n^\downarrow} \sum_{j=1}^{n^\downarrow} \mathbf{h}^{\ell\downarrow}_j,
    \frac{1}{n^\uparrow} \sum_{j=1}^{n^\uparrow} \mathbf{h}^{\ell\alpha\uparrow}_{ij},
    \frac{1}{n^\downarrow} \sum_{j=1}^{n^\downarrow} \mathbf{h}^{\ell\alpha\downarrow}_{ij}\right) \nonumber \\
    &\qquad =
    \left(\mathbf{h}^{\ell\alpha}_i, \mathbf{g}^{\ell\uparrow}, \mathbf{g}^{\ell\downarrow}, \mathbf{g}^{\ell\alpha\uparrow}_i, \mathbf{g}^{\ell\alpha\downarrow}_i\right) = \mathbf{f}^{\ell \alpha}_i,
\end{align}
$$

$$
\begin{align}
    \mathbf{h}^{\ell+1 \alpha}_i &= \mathrm{tanh}\left(\mathbf{V}^\ell \mathbf{f}^{\ell \alpha}_i + \mathbf{b}^\ell\right) + \mathbf{h}^{\ell\alpha}_i \nonumber \\
    \mathbf{h}^{\ell+1 \alpha\beta}_{ij} &= \mathrm{tanh}\left(\mathbf{W}^\ell\mathbf{h}^{\ell \alpha\beta}_{ij} + \mathbf{c}^\ell\right) + \mathbf{h}^{\ell \alpha\beta}_{ij}
\end{align}
$$
$$
\begin{multline}
    \phi^{k\alpha}_i(\mathbf{r}^\alpha_j; \{\mathbf{r}^\alpha_{/j}\}; \{\mathbf{r}^{\bar{\alpha}}\}) =
    \left(\mathbf{w}^{k\alpha}_i \cdot \mathbf{h}^{L\alpha}_j + g^{k\alpha}_i\right)\\
	\sum_{m} \pi^{k\alpha}_{im}\mathrm{exp}\left(-|\mathbf{\Sigma}_{im}^{k \alpha}(\mathbf{r}^{\alpha}_j-\mathbf{R}_m)|\right),
\end{multline}
$$

$$
\begin{align}
	\psi(\mathbf{r}^\uparrow_1,\ldots,\mathbf{r}^\downarrow_{n^\downarrow}) = \sum_{k}\omega_k &\left(\det\left[\phi^{k \uparrow}_i(\mathbf{r}^\uparrow_j; \{\mathbf{r}^\uparrow_{/j}\}; \{\mathbf{r}^\downarrow\})\right]\right.\nonumber\\
	&\left.\hphantom{\left(\right.}\det\left[\phi^{k\downarrow}_i(\mathbf{r}^\downarrow_j; \{\mathbf{r}^\downarrow_{/j}\});
	\{\mathbf{r}^\uparrow\};\right]\right).
\end{align}
$$

[^1]: `ferminet/networks.py` In the class `FermiNet` method `features` to begin and `_build` for the output indeed.
