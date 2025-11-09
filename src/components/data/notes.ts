// Auto-generated file - do not edit manually
// Generated on: 2025-11-09T02:45:31.714Z

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  uploadDate: string;
  readTime: string;
  fileName: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    "id": "1",
    "title": "Development Of A Transformed Based Architecture To Solve The Time Independent Many Electron Schrodinger Equation",
    "excerpt": "With accurate solutions to the many electron Schrodinger equation all the chemistry could derived from first principles. Try to find analytical is pro...",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2025-10-13 11:29\nmodified: 2025-10-25 11:24\n---\n# Abstract\n\nWith accurate solutions to the many electron Schrodinger equation all the chemistry could derived from first principles. Try to find analytical is prohibitively hard due the intrinsic relations between each component on a molecule. In this work I develop the use of a architecture based on the Transformer architecture to tackle this problem.\n\n# Introduction\n\nThe success of deep Learning across different fields like protein folding  @jumper2021highly, visual modeling @dosovitskiy2021imageworth16x16words, ODEs solvers @RAISSI2019686 has sparked great interest from the scientific community to apply DL methods to their fields. \n\nQuantum Chemistry, specifically finding a good aproximmation for the Quantum Many-Body wave eqaution  the is one of those places where have shown that deep learning could overpass traditional methods @Luo_2019 , @Qiao_2020, but there is still many challenges specifically, the computational power needed for large molecules becomes prohibitively expensive. \n\nTackling that problem the Transformer architecture had demonstrate that scaling laws are not so much complicated for him. Cite\n\nMotivated for that in this work I develop a transformer architecture called Psifomer. @vonglehn2023selfattentionansatzabinitioquantum  \n\n# Objectives\n\n- Obtain a model which is able to replicate the energy ground states of certain atoms.\n- Compare our model with another State of the art methods to solve the Many electrons Schrodinger equation\n\n\n# Overview\n\nI provide an outline of the model architecture and procedure \nIn theoretical frame work we  will and in methodology we will \n\n\n# Theoretical Framework\n\nIn order to solve the problem we have to grasp the physics laws that our solution have to follow, \n\n## The problem\n\nWe consider the follow:\n\n### The Schrodinger Equation\n\nThe schrodinger equation was presented in a series of publication made it by Schrodinger in the year 1916.\n\nIt was received pretty well by the scientific comunnity. \n\nAnd its relevance is high, in principle it is able to explain all the atomic phenomena and all the facts of chemical bindings.\n\n### The many electron Schrodinger Equation\n\nIn quantum chemistry is regular used atomic units, the unit of distance is the Bohr Radious and the unit of energy is Hartree (Ha).\n\nIn its time-independent form the Schrodinger equation can be written as a eigenfunction equation.\n\n\n$$ \\hat{H}\\psi(\\mathbf{x}_{0},\\dots ,\\mathbf{x}_{n})=E\\psi(\\mathbf{x}_{1},\\dots ,\\mathbf{x}_{n}) $$\n\nWhere $\\hat{H}$ is a Hermitian linear operator called the Hamiltonian and the scalar eigenvalue $E$ corresponds to the energy of a particular solution.\n\n$$\nU=\\frac{1}{4\\pi\\varepsilon_{0}}\\frac{e^{2}}{\\lvert r_{i}-r_{j} \\rvert }\n$$\n\nUsing atomic units we [[Quantum Chemistry units|Atomic Units]]:\n\nThe Hamiltonian using the [[Quantum Chemistry units]] becomes:\n\n$$ \\hat{H}=-\\frac{1}{2}\\sum \\nabla^{2}+\\sum \\frac{1}{\\lvert r_{i}-r_{j} \\rvert }-\\sum \\frac{Z_{I}}{\\lvert r_{i}-R_{I} \\rvert }+\\sum \\frac{Z_{I}Z_{J}}{\\lvert R_{i}-R_{j} \\rvert }$$\n\nWhere $Z_{I}$ are the [[atomic number]] $r_{i}$ is the distance from a reference frame \n\nNow the [[Fermi Dirac Statistics]] tell us that this solution of this equation should be **anti symmetric** this is:\n\n$$\n\\psi(\\dots,\\mathbf{x}_{i},\\dots,\\mathbf{x}_{j},\\dots)=-\\psi(\\dots ,\\mathbf{x}_{j},\\dots ,\\mathbf{x}_{i},\\dots)\n$$\n\nThe potential energy becomes infinite when two electrons overlap , this could be formalized via the [[Kato Cusp Conditions]], a Jastrow factor $\\exp(\\mathcal{J})$. The explicit form of $\\mathcal{J}$ depends on the author.\n\n## Approximating a solution\n\nFind possible solution in the traditional way is prohibitively hard. So what people have doing and it seem that it becomes a success is guess that solution and using another techniques to improve the solution, to this guess solution we called **Ansatz**.\n\nOnce that you have your Ansatz, which normally depends on depends on certain parameters.\n\n### Variational Monte Carlo\n\nOnce that you guess an **Ansatz** you optimize using the **rayleight quotient**.\n\n$$ \\mathcal{L}=\\frac{\\bra{\\psi} \\hat{H}\\ket{\\psi} }{\\braket{ \\psi | \\psi } }=\\frac{\\int d\\mathbf{r}\\psi ^{*}(\\mathbf{r})\\hat{H}\\psi(\\mathbf{r})}{\\int d\\mathbf{r}\\psi ^{*}(\\mathbf{r})\\psi(\\mathbf{r})} $$\n\n\nSo how we optimized this. Here appears [[Variational Quantum Monte Carlo]].\n\nWhich can be re-written as:\n\n$$\nE_{L}(x)=\\Psi ^{-1}_{\\theta}(x)\\hat{H}\\Psi_{\\theta}(x)\n$$\n\n$$ \\mathcal{L}_{\\theta}=\\mathbb{E}_{x\\sim \\Psi^{2}_{\\theta}}[E_{L}(x)] $$\n\nAnd here we use [[Metropolis algorithm]] to work in real life.\n\n## Using Deep Learning\n\nThey are a quite example of it.\n\nexamples @shangSolvingManyelectronSchrodinger2025 Related work\n\n### Neural Networksee\n\n### RNN\n\n\n### Fermi Net\n\nA very important work for us is: Fermi Net @Pfau_2020  it uses different MLP to learn the forms of the orbitals. Their ansatz is: [[Fermi Net]]\n\n$$ \\psi(\\mathbf{x}_{i},\\dots,\\mathbf{x}_{n})=\\sum_{k}\\omega_{k}\\det[\\Phi ^{k}] $$\n\nWith:\n\n$$\n\\begin{vmatrix}\n\\phi_{1}^{k}(\\mathbf{x}_{1})  & \\dots  &  \\phi_{1}^{k}(\\mathbf{x}_{n}) \\\\\n\\vdots   &  & \\vdots  \\\\\n\\phi_{n}^{k}(\\mathbf{x}_{1}) & \\dots & \\phi_{n}^{k}(\\mathbf{x}_{n})\n\n\\end{vmatrix}=\\det[\\phi_{i}^{k}(\\mathbf{x}_{j})]=\\det[\\Phi ^{k}]\n$$\n\nThe elements of the determinant are obtained via\n\n$\\alpha \\in \\{ \\uparrow,\\downarrow \\}$\n\n$$\n\\mathbf{h}_{i}^{\\ell \\alpha} \\gets \\text{concatenate}(\\mathbf{r}^\\alpha_i - \\mathbf{R}_I, |\\mathbf{r}^\\alpha_i - \\mathbf{R}_I|\\ \\forall\\ I)\n$$\n$$\n\\mathbf{h}_{ij}^{\\ell \\alpha\\beta} \\gets \\text{concatenate}(\\mathbf{r}^\\alpha_i - \\mathbf{r}^\\beta_j, |\\mathbf{r}^\\alpha_i - \\mathbf{r}^\\beta_j|\\ \\forall\\ j,\\beta)\n$$\n\n$$\n \\begin{align}\n    &\\left(\n    \\mathbf{h}^{\\ell\\alpha}_i,\n    \\frac{1}{n^\\uparrow}\\sum_{j=1}^{n^\\uparrow} \\mathbf{h}^{\\ell\\uparrow}_j, \\frac{1}{n^\\downarrow} \\sum_{j=1}^{n^\\downarrow} \\mathbf{h}^{\\ell\\downarrow}_j,\n    \\frac{1}{n^\\uparrow} \\sum_{j=1}^{n^\\uparrow} \\mathbf{h}^{\\ell\\alpha\\uparrow}_{ij},\n    \\frac{1}{n^\\downarrow} \\sum_{j=1}^{n^\\downarrow} \\mathbf{h}^{\\ell\\alpha\\downarrow}_{ij}\\right) \\nonumber \\\\\n    &\\qquad =\n    \\left(\\mathbf{h}^{\\ell\\alpha}_i, \\mathbf{g}^{\\ell\\uparrow}, \\mathbf{g}^{\\ell\\downarrow}, \\mathbf{g}^{\\ell\\alpha\\uparrow}_i, \\mathbf{g}^{\\ell\\alpha\\downarrow}_i\\right) = \\mathbf{f}^{\\ell \\alpha}_i,\n\\end{align}\n$$\n\n\n$$\n\\begin{align}\n    \\mathbf{h}^{\\ell+1 \\alpha}_i &= \\mathrm{tanh}\\left(\\mathbf{V}^\\ell \\mathbf{f}^{\\ell \\alpha}_i + \\mathbf{b}^\\ell\\right) + \\mathbf{h}^{\\ell\\alpha}_i \\nonumber \\\\\n    \\mathbf{h}^{\\ell+1 \\alpha\\beta}_{ij} &= \\mathrm{tanh}\\left(\\mathbf{W}^\\ell\\mathbf{h}^{\\ell \\alpha\\beta}_{ij} + \\mathbf{c}^\\ell\\right) + \\mathbf{h}^{\\ell \\alpha\\beta}_{ij}\n\\end{align}\n$$\n\n$$\n\\begin{multline}\n    \\phi^{k\\alpha}_i(\\mathbf{r}^\\alpha_j; \\{\\mathbf{r}^\\alpha_{/j}\\}; \\{\\mathbf{r}^{\\bar{\\alpha}}\\}) =\n    \\left(\\mathbf{w}^{k\\alpha}_i \\cdot \\mathbf{h}^{L\\alpha}_j + g^{k\\alpha}_i\\right)\\\\\n\t\\sum_{m} \\pi^{k\\alpha}_{im}\\mathrm{exp}\\left(-|\\mathbf{\\Sigma}_{im}^{k \\alpha}(\\mathbf{r}^{\\alpha}_j-\\mathbf{R}_m)|\\right),\n\\end{multline}\n$$\n\n$$ \\phi ^{k\\alpha}_{i}(\\mathbf{r}^{\\alpha}_{j};\\{ \\mathbf{r}^{\\alpha}_{/j} \\};\\{ \\mathbf{r}^{\\bar{\\alpha}} \\})=(\\mathbf{w}^{k\\alpha}_{i}\\cdot \\mathbf{h}^{L\\alpha}_{j}+g^{k\\alpha}_{i})\\sum_{m}\\pi_{im}^{k\\alpha}\\exp\\left( -\\left\\lvert \\Sigma _{im}^{k\\alpha}(\\mathbf{r}^{\\alpha}_{j}-\\mathbf{R}_{m})\\right\\rvert  \\right)$$.\n\n$$\n​￼\\begin{align}\n\t\\psi(\\mathbf{r}^\\uparrow_1,\\ldots,\\mathbf{r}^\\downarrow_{n^\\downarrow}) = \\sum_{k}\\omega_k &\\left(\\det\\left[\\phi^{k \\uparrow}_i(\\mathbf{r}^\\uparrow_j; \\{\\mathbf{r}^\\uparrow_{/j}\\}; \\{\\mathbf{r}^\\downarrow\\})\\right]\\right.\\\\&\\left.\\hphantom{\\left(\\right.}\\det\\left[\\phi^{k\\downarrow}_i(\\mathbf{r}^\\downarrow_j; \\{\\mathbf{r}^\\downarrow_{/j}\\});\n\t\\{\\mathbf{r}^\\uparrow\\};\\right]\\right).\n\\end{align}\n$$\n\nYou com\n\n![ferminet.png](ferminet.png)\n\nMotivated for the antisymmetry and the Kato cusp conditions our **Ansatz** take the form of: [\n### Transformers\n\nThere exist several architectures that I can use Recurrent Neural Network, Long Short Term Memory. \n\n@Vaswani2017 \n\nRecurrent Neural Network are: [[Recurrent Neural Network]]\nAnd long short term memory are: [[Long Short Memory]]\n\nWhy on earth I would use [[Transformer]]? They are extremely good finding relations between its elements. And the best is that scale well due its [[Transform Architecture]]\n\nAttention mechanism appear with @bahdanau2014neural but it didn't work so:\n\n- [[Attention mechanism]]\n- [[Self attention mechanism on one head]]\n- [[Multi-head attention]]\n$$\n\\mathbf{o}_{t,i}=\\sum_{j=1}^{t}\\text{Softmax}\\left( \\frac{\\mathbf{q}^{T}_{t,i}\\mathbf{k}_{j,i}}{\\sqrt{ d_{h} }} \\right) \\mathbf{v}_{j,i}\n$$\n$$\n\\mathbf{u}_{t}=W^{O}[\\mathbf{o}_{t,1};\\mathbf{o}_{t,2};\\dots ;\\mathbf{o}_{t,n_{h}}]\n$$\n\n# Psi Former\n\n[[Psi Former Ansatz]]. @vonglehn2023selfattentionansatzabinitioquantum\n$$ \\Psi_{\\theta}(\\mathbf{x})=\\exp(\\mathcal{J}_{\\theta}(\\mathbf{x}))\\sum_{k=1}^{N_{\\det}}\\det[\\boldsymbol{\\Phi}_{\\theta}^{k}(x)] $$\n\nWhere $\\mathcal{J}_{\\theta}$ is the [[Jastrow Factor for si Former]] and $\\Phi$ are [[orbital for neural network fermi net|orbitals]]. \n\n\nWhere $\\mathcal{J}_{\\theta}:(\\mathbb{R}^{3}\\times \\{ \\uparrow,\\downarrow \\})^{n}\\to \\mathbb{R}$\n\n- So the question is how you define the outputs of that functions:\n- [[Jastrow Factor]]\n$$\n\\mathcal{J}_{\\theta}(x)=\\sum_{i<j;\\sigma_{i}=\\sigma_{j}}-\\frac{1}{4}\\frac{\\alpha^{2}_{par}}{\\alpha_{par}+\\lvert \\mathbf{r}_{i}-\\mathbf{r}_{j} \\rvert }+\\sum_{i,j;\\sigma_{i}\\neq \\sigma_{j}}-\\frac{1}{2}\\frac{\\alpha^{2}_{anti}}{\\alpha_{anti}+\\lvert \\mathbf{r}_{i}-\\mathbf{r}_{j} \\rvert }\n$$\n\nArchitecture\n\n![psiformer.png](psiformer.png)\n\n### Loss function\n\nWe are going to take the [[Rayleigh Quotient like Expectation Value]] like loss function.\n\n### Optimizer \n\n[[Kroenecker factored Approximate Curvature]]\n\n### Flow of the architecture\n\nFirst compute:\n$$ v_{h}=[\\text{SelfAttn}(\\mathbf{h}^{l}_{1},\\dots,\\mathbf{h}^{\\ell}_{N};\\mathbf{W}^{\\ell h}_{q},\\mathbf{W}^{\\ell h}_{k},\\mathbf{W}^{\\ell h}_{v})] $$\n\nStart with:\n\n$$\\mathbf{W}_{o}^{\\ell}\\text{concat}_{h}[\\text{SelfAttn}(\\mathbf{h}^{l}_{1},\\dots,\\mathbf{h}^{\\ell}_{N};\\mathbf{W}^{\\ell h}_{q},\\mathbf{W}^{\\ell h}_{k},\\mathbf{W}^{\\ell h}_{v})]$$\n\nWith it you can obtain you hidden states, and then how you use it\n\n\n\nWith them you create the [[orbital for neural network fermi net]]\n\nAnd you have it.\n\n# Methodology\n\nTo implement the code, the choose of the library is important.\n\nThe three options to implement this kind of matter are JAX, Tensor Flow and pytorch, each one with his advantages and disadvantages.\n\n## Environment\n\nFor this project we are going to be using Pytorch due his user-friendly and support. Python. with UV\n\n## Training\n\nDue the high computational power needed we are going to using GPUS and of course CUDA.\n\nIs clear that we are going to use virtual GPUS, for that matter we have two option or well use a GPU via SSH or directly using services like Azure , Colab, or anothers matters.\n\nThe election of the GPU is not trivial. use TPUS are not a bad idea.\n\n# References \nBahdanau, D., Cho, K., & Bengio, Y. (2014). Neural machine translation by jointly learning to align and translate. _arXiv Preprint arXiv:1409.0473_.\n\nDosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., & Houlsby, N. (2021). _An image is worth 16x16 words: Transformers for image recognition at scale_. [https://arxiv.org/abs/2010.11929](https://arxiv.org/abs/2010.11929)\n\nJumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žı́dek, A., Potapenko, A., & others. (2021). Highly accurate protein structure prediction with AlphaFold. _Nature_, _596_(7873), 583–589.\n\nLuo, D., & Clark, B. K. (2019). Backflow transformations via neural networks for quantum many-body wave functions. _Physical Review Letters_, _122_(22). [https://doi.org/10.1103/physrevlett.122.226401](https://doi.org/10.1103/physrevlett.122.226401)\n\nPfau, D., Spencer, J. S., Matthews, A. G. D. G., & Foulkes, W. M. C. (2020). Ab initio solution of the many-electron Schrödinger equation with deep neural networks. _Physical Review Research_, _2_(3). [https://doi.org/10.1103/physrevresearch.2.033429](https://doi.org/10.1103/physrevresearch.2.033429)\n\nQiao, Z., Welborn, M., Anandkumar, A., Manby, F. R., & Miller, T. F. (2020). OrbNet: Deep learning for quantum chemistry using symmetry-adapted atomic-orbital features. _The Journal of Chemical Physics_, _153_(12). [https://doi.org/10.1063/5.0021955](https://doi.org/10.1063/5.0021955)\n\nRaissi, M., Perdikaris, P., & Karniadakis, G. E. (2019). Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations. _Journal of Computational Physics_, _378_, 686–707. [https://doi.org/10.1016/j.jcp.2018.10.045](https://doi.org/10.1016/j.jcp.2018.10.045)\n\nShang, H., Guo, C., Wu, Y., Li, Z., & Yang, J. (2025). Solving the many-electron Schrödinger equation with a transformer-based framework. _Nature Communications_, _16_(1), 8464. [https://doi.org/10.1038/s41467-025-63219-2](https://doi.org/10.1038/s41467-025-63219-2)\n\nVaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. _Advances in Neural Information Processing Systems (NeurIPS)_, _30_.\n\nvon Glehn, I., Spencer, J. S., & Pfau, D. (2023). _A self-attention ansatz for ab-initio quantum chemistry_. [https://arxiv.org/abs/2211.13672](https://arxiv.org/abs/2211.13672)",
    "uploadDate": "2025-10-13 11:29",
    "readTime": "25 min read",
    "fileName": "Development of a Transformed based architecture to solve the time independent many electron Schrodinger equation.md",
    "featured": true
  },
  {
    "id": "2",
    "title": "CLIP Model Vision, How The Dot Product Is Everywhere",
    "excerpt": "So once that you understand how LLM's works and how improve them now you want to visualize them but at that scale, not by using just freak CNN's.",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2025-08-25 11:29\nmodified: 2025-10-25 11:24\n---\n\nSo once that you understand how LLM's works and how improve them now you want to visualize them but at that scale, not by using just freak CNN's.\n\nHow that happen, ",
    "uploadDate": "2025-08-25 11:29",
    "readTime": "1 min read",
    "fileName": "CLIP model vision, how the dot product is everywhere.md",
    "featured": true
  },
  {
    "id": "3",
    "title": "Llama Vision 7B Understanding Vision Modeling And A Finetuning",
    "excerpt": "1. [Motivation](#Motivation)",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2025-08-12 11:29\nmodified: 2025-11-01 23:20\n---\n\n\n# Vision modeling with Transformers and a fine tunning\n\n## Table of Contents\n\n1. [Motivation](#Motivation)\n2. [The age of agents](#The%20age%20of%20agents)\n3. [Why small models?](#Why%20small%20models?)\n4. [Llama Vision](#Llama%20Vision)\n5. [Tunning Challenges - LLM TO SLM](#Tunning%20Challenges%20-%20LLM%20TO%20SLM)\n\t1. [Explaining the Large Vision model](#Explaining%20the%20Large%20Vision%20model)\n\t2. [Llama Vision 3.2 Architecture](#Llama%20Vision%203.2%20Architecture)\n6. [Synthetic Data](#Synthetic%20Data)\n7. [Data Preparation](#Data%20Preparation)\n8. [Training process using Lora](#Training%20process%20using%20Lora)\n9. [Inference Time](#Inference%20Time)\n10. [Benchmarks](#Benchmarks)\n11. [Take Aways](#Take%20Aways)\n12. [Citation](#Citation)\n13. [References](#References)\n\n---\n\n>Special thanks to [Joel Timana](https://github.com/joevidev) for a lot of super valuable feedback during the process of this project.\n\n# Motivation\n\nFine tunning a model is complicated (then I like it), but in first place why I would do that?\n\n[[Tune problems-challenges]] and [[How re use a model - recicle SLM to specific SLM]] are the the reasons of the work. \n\n# The age of agents\n\nAgentic solutions had spread around the globe and had been widely aceppted , some incredibles examples are Lovable, Cursor, ClaudeCode  the most use for differents companies and start ups, the core of them are Multimodal Large Language Models, these are provided by companies such as OpenAI, Anthropic, Google, etc. \n\n\nThe performance of such a models are amazingly good, the prices each time are more accesible, and the inference speed grews since the clusters get improved, the investment on infrastructure continue growing and all seems that is going to the hill.\n\nNow there are cases when we want to use a model for an specific task that is not that complex, it worth use a model that big for this matter? \n\n**cite** proposes SLM's to tackle specifc-repetitive task. A small model should be less around 10 billion of parameters and they propose interesting stuff, but also the limitations that these models create. \n\nOne matter relies on the finne tunne of SML's which in a near future, could be change or insert foot note to that post. And this the topic of this work.\n\nIs clear that in high specialized environment each of the steps to tune a model is delegate to a expert group, so for a basic understanding of how this process is made this work exist.\n\nWe are gonna to realizing a fine-tune over the Llama Vision 3.2 model from META.AI with the goal of the recognisement of flowcharts for the translation into Mermaid code curated by [unsloth](https://unsloth.ai/).\n\n# Why small models?\n\nIs clear that talking in a more general case we are going always prefer a LLM rather than a SLM, they are indeed better, but stop there it doesn't have sense use a exagerately big model on a repetitive specif task, they are not economy and in comparation to a SLM the latency is !. @belcak2025smalllanguagemodelsfuture\n\nAnother more efficent but tedious approach is use a fine-tune model specific for the said task.\n\nyour task, we could take an open source model and we only worry about the hardware needed to inference. But actually exists a considerable amount of cloud services so let's suppose that is not actually a problem.\n\nIf we want to achieve a good performance in a specific task, have limited resources fine-tune is not a trivial task, there are also certain nuances that are necessary to face.\n\n# Llama Vision and the Vit Architecture\n\nSo there exist the clear case of the AlexNet but those are using convolutional neural networks.\n\n@dosovitskiy2021imageworth16x16words , \n\n\nand I care about how OpenAI build its model.\n\nAnd here CLIPS it seem it a lot interesting.\n\n[[computer vision evolution]]\n[[Vision encoder main function]] [[Connector Between Vision and LLm]]\n[[Llama Vision Instruct 3.2]]\n\n\n# Tunning Challenges - LLM TO SLM\n\nChoose a proper model, if we want a specific model that resolve that task, we need to answer the follow matters: the base model, data with train, the best ways and more cutting edge ways to train the model, the hardware and environment needed in order to make that, the metrics and benchmarks to know if indeed exist a improvements, and of course the knowledge necessary to implement all. @radford2021learningtransferablevisualmodels\n\nIf it's true that currently exist a huge amount of tools available on internet published by the community which make the process more direct and seamsly there is still a considerable work to do it, \n\n## Explaining the Large Vision model\n\nThe computer vision is one field that pass trough a lot, an important breakthrough was Alex Net. @krizhevsky2012imagenet\n\n![Screenshot From 2025-10-31 21-52-06.png](Screenshot From 2025-10-31 21-52-06.png)\nVisual Transformer architecture.\n\n$$\nx \\in \\mathbb{R}^{H \\times W \\times C} \\quad \\rightarrow \\quad N = \\frac{HW}{P^2} \\text{ patches of size } P \\times P\n\n$$\n\n$$\nz_0 = [x_p^1 E; x_p^2 E; \\dots; x_p^N E] + E_{\\text{pos}}\n$$\n\n## Llama Vision 3.2 Architecture\n\nBefore to begin with the data-set obtain. A comprenhesive understanding of how this models works is important in order to understand the respective the parameters.\nThe family of Vision models is big exist different innovation that each company made, how you realize the pre-training is an important one. @krizhevsky2012imagenet\n\n\nThe first is find actual works on Lora I wonder if I can tweak the unsloth code to use QLora. First you have to make some reasearch on QLora, the pseudo code, how applied to where to find the data sets, generation of data synthetic, data augmentation where to find the data sets, generation of data synthetic, data Augmentation, some nice graphs during the training process, the GPUS used inference and training, finding metric, reference to the actual metrics. And further improvements.Yeah I can make the pdf and the .md version, so how to the Llama 3.11 models @qi24insidemllama . vision instruct, we could make also llm tunning with the mermaid syntax, yeah we have until know. The visual large language models are funded on the convolutional layers which are quite amazing, the goal of this text is train a vllm more specificaly. I have one month to do it! Which it is the first part? The model is gonna to be fine-tune for the creation of diagrams using Mermaid. @bordes2024introductionvisionlanguagemodeling\n\nTo fine-tune the model we are gonna to use a big\n\nWe could create Synthetic data easily with Langgraph and an API.\n\n\n# Data Preparation\n\nSince we are gonna to be training a model to from images create code, we are\ngonna to use a collator to merge them.\nThe HugginFace repositories are always available, we are gonna to use four\nrepositories more Data augmentation techniques\nyou can easily find the data set on\n\n\n# Training process using Lora\n\nThe training process is straighforward since the library PEFT from HugginFace do\nall the work for us. Our work relies on know what hiper parameters are gonna to use\nto use since if we want to apply QLora in the future.\n\nIs amazing see the big difference between the inference of OPENai Anthropic and another guys compared with a modest GPU. \n\n\n# Citation \n\nOr use BibTex citation:\n\n```\n@article{munoz2025vision,\n  title = {Understanding Vision Models},\n  author = {Munoz, Jorge},\n  journal = {munBlog},\n  year = {2025},\n  month = {July},\n  url = \"https://jorgemunoz.github.io\n}\n```\n\n# References\n\nBelcak, P., Heinrich, G., Diao, S., Fu, Y., Dong, X., Muralidharan, S., Lin, Y. C., & Molchanov, P. (2025). _Small language models are the future of agentic AI_. [https://arxiv.org/abs/2506.02153](https://arxiv.org/abs/2506.02153)\n\nBordes, F., Pang, R. Y., Ajay, A., Li, A. C., Bardes, A., Petryk, S., Mañas, O., Lin, Z., Mahmoud, A., Jayaraman, B., Ibrahim, M., Hall, M., Xiong, Y., Lebensold, J., Ross, C., Jayakumar, S., Guo, C., Bouchacourt, D., Al-Tahan, H., … Chandra, V. (2024). _An introduction to vision-language modeling_. [https://arxiv.org/abs/2405.17247](https://arxiv.org/abs/2405.17247)\n\nDosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., & Houlsby, N. (2021). _An image is worth 16x16 words: Transformers for image recognition at scale_. [https://arxiv.org/abs/2010.11929](https://arxiv.org/abs/2010.11929)\n\nKrizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. In F. Pereira, C. J. C. Burges, L. Bottou, & K. Q. Weinberger (Eds.), _Advances in neural information processing systems 25_ (pp. 1097–1105). Curran Associates, Inc. [https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf](https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)\n\nQi, J. (2024). Inside MLLaMA 3.2: Understanding meta’s vision-language model architecture. _Medium_. [https://j-qi.medium.com/inside-mllama-3-2-understanding-metas-vision-language-model-architecture-ae12ad24dcbf](https://j-qi.medium.com/inside-mllama-3-2-understanding-metas-vision-language-model-architecture-ae12ad24dcbf)\n\nRadford, A., Kim, J. W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J., Krueger, G., & Sutskever, I. (2021). _Learning transferable visual models from natural language supervision_. [https://arxiv.org/abs/2103.00020](https://arxiv.org/abs/2103.00020)",
    "uploadDate": "2025-08-12 11:29",
    "readTime": "12 min read",
    "fileName": "Llama Vision 7B Understanding Vision Modeling and a finetuning.md",
    "featured": true
  },
  {
    "id": "4",
    "title": "Linux",
    "excerpt": "The less time is thirty minutes and well.Linux is a [[OpenSource]] [[Kernel]] developed by Linus Torvald_ on 1991. It's based on *Unix*. Imagine like ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-19 21:13\"\n---\nThe less time is thirty minutes and well.Linux is a [[OpenSource]] [[Kernel]] developed by Linus Torvald_ on 1991. It's based on *Unix*. Imagine like this exist a company that has has own closed kernel but you want your own because the security.Then you decide create your own, and you have the model of the actual but you write all your code on your own.\n\nAnd exist many advantages for use Linux, like automation, lightness, security, customization, I mean if you code you can change everything. \n\n[[Distributions]]\n[[shell]]\n[[reason to use linux]]\nLinux it's a great example for understand how computer works, instead of Windows that it's very easy to use, very intuitive using the Graphic Interface, instead of the Bash Interface that in essence it's more complicated but it's programming craw. \n\nOf,course like Ubuntu dont have that users my wifi usb need a lot of settings to work\n\nDefinition.- Linux is an operating system (OS), more specif to the Kernel.\nIt's like an intermediary of the Hardware and the software. Created on 1991 by Linus Torvalds\n\nBut then what operating system.\n\nDefinition and operating system is system software that manages computer hardware and software.\nSee it like the path between the hardware and user. Using drivers, system calls, and the kernel,\n\nI mean one you entrance to this world of Linux programming it's convert a import part on your life,\n\nAfter battle and battle with Linux, I finally make this thing of synchronize with all my devices, also I read something about the Linux. \n\n[[Software]]\n\n\n![LinuxOverview.svg](LinuxOverview.svg)\n\n[[learning rate]]\n[[arch linux the first step to minimalism digitial]]",
    "uploadDate": "2025-06-19 21:13",
    "readTime": "2 min read",
    "fileName": "Linux.md",
    "featured": false
  },
  {
    "id": "5",
    "title": "What Mean Being Trainable On Pytorch",
    "excerpt": "I mean is kind of confusing what it means all about this graphs, what it means grad. I mean torch to be very efficient, faster I guess that behind the...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-07 20:58\"\n---\nI mean is kind of confusing what it means all about this graphs, what it means grad. I mean torch to be very efficient, faster I guess that behind there be things weird. And to have a fully understanding I think it is necessary!",
    "uploadDate": "2025-06-07 20:58",
    "readTime": "1 min read",
    "fileName": "what mean being trainable on pytorch.md",
    "featured": false
  },
  {
    "id": "6",
    "title": "Table Of Parameters",
    "excerpt": "Here some examples of how the [[parameters]] are distributed.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-06-07 13:59\n---\nHere some examples of how the [[parameters]] are distributed.\n\n- [[gpt3p.png|175 B parameters to GPT-3]]\n- [GPT-124M parameters](https://github.com/openai/gpt-2)\n\n\n\n\n",
    "uploadDate": "2025-06-07 13:59",
    "readTime": "1 min read",
    "fileName": "Table of parameters.md",
    "featured": false
  },
  {
    "id": "7",
    "title": "Linearity On DL",
    "excerpt": "The less time is thirty minutes and well.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-03 08:37\"\n---\nThe less time is thirty minutes and well.",
    "uploadDate": "2025-06-03 08:37",
    "readTime": "1 min read",
    "fileName": "linearity on DL.md",
    "featured": false
  },
  {
    "id": "8",
    "title": "Flash Attention",
    "excerpt": "Well this is more faster (computationally talking) than [[Self attention mechanism on one head]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 14:13\"\n---\nWell this is more faster (computationally talking) than [[Self attention mechanism on one head]].\n\nThe question is why it is? ",
    "uploadDate": "2025-06-02 14:13",
    "readTime": "1 min read",
    "fileName": "flash attention.md",
    "featured": false
  },
  {
    "id": "9",
    "title": "Initialization Parameters",
    "excerpt": "So when I was trying to create a [[Feed Forward Neural Network]], I take some arbitrary decision, (remember what they were).",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 12:11\"\n---\nSo when I was trying to create a [[Feed Forward Neural Network]], I take some arbitrary decision, (remember what they were).\n\nOne was when I initialize the [[parameters]] (the weights and bias), and of course I put a uniform distribution from -10 to 10, and it never converge. \n\nSo they tell me about that I need to initialize it in specially ways, and I guess that depends on some factors,  like the [[Activation function]], and I guess that from the [[Optimizer]].\n\nSo also exist more theory here. \n\n",
    "uploadDate": "2025-06-02 12:11",
    "readTime": "1 min read",
    "fileName": "initialization parameters.md",
    "featured": false
  },
  {
    "id": "10",
    "title": "Learning Rate",
    "excerpt": "So this numbers is close to zero, so the parameters don't change that bad, ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 12:07\"\n---\nSo this numbers is close to zero, so the parameters don't change that bad, \n\n\nand also exist something about alpha and beta that comes from other way,\n\nSo this also depends on the chose of the [[Optimizer]]. ",
    "uploadDate": "2025-06-02 12:07",
    "readTime": "1 min read",
    "fileName": "learning rate.md",
    "featured": false
  },
  {
    "id": "11",
    "title": "Parameters",
    "excerpt": "So we call parameters to the numbers in the [[Tensor - Computation|tensors]], and his life also depends on the [[learning rate]] , and what technique ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 12:02\"\n---\nSo we call parameters to the numbers in the [[Tensor - Computation|tensors]], and his life also depends on the [[learning rate]] , and what technique used on [[initialization parameters]].\nAnd of course when talking about [[Sparse Moe]] we talk of [[Active Parameters]]\n\n\n[[Table of parameters]]",
    "uploadDate": "2025-06-02 12:02",
    "readTime": "1 min read",
    "fileName": "parameters.md",
    "featured": false
  },
  {
    "id": "12",
    "title": "Embedding Matrix",
    "excerpt": ">Let $W_{E}$ be the **embedding matrix** which shape is [[Embedding dimension]] times the [[vocabulary size]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 11:06\"\n---\n>[!definition]\n>Let $W_{E}$ be the **embedding matrix** which shape is [[Embedding dimension]] times the [[vocabulary size]].\n\n- This matrix is obtained by training it, each column represents a word. [[what mean being trainable on pytorch]]\n- How we use it specifically?\n\n\n\n\nFor instance ChatGTP-3 token 50.257. with rows of 12,228 giving = 617,558,016 parameters. \n\nVector lives in a 12,228 dimensional space.\n\naja",
    "uploadDate": "2025-06-02 11:06",
    "readTime": "1 min read",
    "fileName": "Embedding matrix.md",
    "featured": false
  },
  {
    "id": "13",
    "title": "Positional Embedding Matrix",
    "excerpt": "The less time is thirty minutes and well.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 11:05\"\n---\nThe less time is thirty minutes and well.",
    "uploadDate": "2025-06-02 11:05",
    "readTime": "1 min read",
    "fileName": "positional embedding matrix.md",
    "featured": false
  },
  {
    "id": "14",
    "title": "Pipe Line And Dual Pipe Line",
    "excerpt": "The less time is thirty minutes and well.In software Pipe line refers to the convey of information, data through two devices.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 09:56\"\n---\nThe less time is thirty minutes and well.In software Pipe line refers to the convey of information, data through two devices.\nIn [[DeepSeek-V3 Technical Report]] introduces the word _Dual Pipe Line_. \n\nAnd something that I really like it was the in one video of platzi they combine four macs and the quantity of [[teraflops]] are added, was simply amazing.\n\n> The idea is to overlap the computation and communication within a pair of individual forward and backwards chunks. Each chunk is devided in four components.\n\nI mean it would be a bomb that you can use the power of many CPU's and GPU's like a one. The communication between devices is important we need write and read a lot of data and being actualized constantly.\n\nThis word \n\nI know the NVlink that allows to connect two GPUs. And a more old technology is the SLI. This are of GPU consume, now what is the name of the technology that cluster, servers use, because they meed to connect not only GPU but also CPUs and memory virtual space. And it's amazing how something so abstract could be take form on a virtual space.\n\nThey say that for servers NVlink and Nvidia Infiniband, or more rustic with PCIe scaling  and Nvidia DGX systems. \n\nAnd was thinking on a miner (cryptocurrency) that needs knows pretty well, because they need to use many GPUS.\n\n[[Cryptocurrency]]",
    "uploadDate": "2025-06-02 09:56",
    "readTime": "1 min read",
    "fileName": "Pipe Line and Dual Pipe Line.md",
    "featured": false
  },
  {
    "id": "15",
    "title": "LLM'S Basic Working",
    "excerpt": "What it would be a beauty definition of LLM, then is important differentiate I think that the model itself is only that but without the tokenizer neit...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 09:17\"\n---\nWhat it would be a beauty definition of LLM, then is important differentiate I think that the model itself is only that but without the tokenizer neither the choose of the token, once that you have the logits.\n\nSo a function multilinear stochastic predictive token I need to be very cautious.\n\nWe could understand **LLMs** like functions but for words, we can give it a uncompleted sentence as input and the output will be the missing word. If we iterate this process we could obtain sentences.\nSo we could say that the function depends on: before words, the message intention, the context/place, the receptors, and a ton of variables. How we integrate that amount information? Let's give the first step, and that is grasp the follow [[Architecture of a transform|architecture]] of course is not the unique architecture but is the most efficient.\n![transformerArchitecture.png](transformerArchitecture.png)\n\nOnce that you understand all, to have your own model follow the next steps.\nFirst it's obvious that we need data, data that \"easily\" could be extract form internet. Books, papers, websites, code, repositories, everything that reflect the human language.\nNow let's say you have a file with millions of PDFs with all this data. What do I do with this?\nI mean we can give a each word a number this is know like [[Tokenization - Embedding - LLM]]\n[[Transformer]]\nOnce you have all the data, what's next?\n\nYou need to choose a structure, (here I'm gonna to do a remark) I'm gonna to talk before that said paper that change the game.\n\n[[Choose the model architecture LLM]]\n[[Training Phase LLM]]\n# YouTube Video\n\n ![](https://www.youtube.com/watch?v=LPZh9BOjkQs&t=56s)\n\n\n![](https://youtu.be/FdZ8LKiJBhQ)\n\n\nhe less time is thirty minutes and well.",
    "uploadDate": "2025-06-02 09:17",
    "readTime": "2 min read",
    "fileName": "LLM's basic working.md",
    "featured": false
  },
  {
    "id": "16",
    "title": "Head Model",
    "excerpt": "No excerpt available",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 08:46\"\n---\n>[!definition]\n\n**Ref**. \n\n[[Birth of LLMs]]",
    "uploadDate": "2025-06-02 08:46",
    "readTime": "1 min read",
    "fileName": "head model.md",
    "featured": false
  },
  {
    "id": "17",
    "title": "Attention Mechanism",
    "excerpt": ">The original and most primite!",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 08:03\"\n---\n>[!definition]\n>The original and most primite!\n\n**Ref**. ",
    "uploadDate": "2025-06-02 08:03",
    "readTime": "1 min read",
    "fileName": "attention mechanism.md",
    "featured": false
  },
  {
    "id": "18",
    "title": "Ethernet",
    "excerpt": "Before always that I see a ethernet cable it seem it to me bored. But I was missing that those things are really excited.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-05-22 08:44\"\n---\nBefore always that I see a ethernet cable it seem it to me bored. But I was missing that those things are really excited.\n\n\nTHe same with the router that internet give to us. I was wrong\n\n",
    "uploadDate": "2025-05-22 08:44",
    "readTime": "1 min read",
    "fileName": "ethernet.md",
    "featured": false
  },
  {
    "id": "19",
    "title": "Hyperparameters",
    "excerpt": "So judging by the name what is the difference with [[parameters]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-05-21 10:14\"\n---\nSo judging by the name what is the difference with [[parameters]]\n\n\nAll the parameters reside on the matrices and vectors (weights and bias)? of the [[Feed Forward Neural Network]].\n\nAnd also while using pytorch those matrices in some way are different from normal matrices.\n\nHyper parameters of the model like the embed dimension and that stuff. For chatgtp2 we have the follow hyperparameters, general because really exist a ton. and well all make reference, we could say that this define the [[Architecture of a transform]].\n\nThe vocabulary size. ```vocab_size```[[vocabulary size]] \nThe block size. ```block_size``` \nThe number the heads for layers. ```n_head``` \nThe embedding size. ```n_embd``` [[Embedding dimension]]\nThe numbers of layers. ```n_layer``` \n\nOnce you define this parameters you could define the [[Embedding matrix]] and the [[positional embedding matrix]].",
    "uploadDate": "2025-05-21 10:14",
    "readTime": "6 min read",
    "fileName": "hyperparameters.md",
    "featured": false
  },
  {
    "id": "20",
    "title": "PowerOfWork",
    "excerpt": "Here is another place where we observe the importance of the [[cluster servers]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-05-14 12:39\"\n---\nHere is another place where we observe the importance of the [[cluster servers]].\nBasically this is what we called mine, people with some knowledge enter to the [[Blockchain]] and they are playing like mini lotteries to earn some bitcoin. \n\nBasically is like a job they \"check\" that everything ",
    "uploadDate": "2025-05-14 12:39",
    "readTime": "1 min read",
    "fileName": "PowerOfWork.md",
    "featured": false
  },
  {
    "id": "21",
    "title": "Self Attention Idea",
    "excerpt": "Allows token attend each others in parallel.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 14:35\"\n---\nAllows token attend each others in parallel.\n\nThe _parallelisation_ it's possible for the [[Gpu paralellism-deep learning-computational costs]],it's perform in the _multi head attention_ task\n\nBasically (_inference_), give it a set of words in its vector form, apply this mechanism makes change the values of the vector by summing vector, a single head make change a little, but the sum of many heads change considerably the words. [[Multi-head attention]].\n\nThis is vector that change the meaning of the words is obtained by **Attention Formula**. ",
    "uploadDate": "2025-04-29 14:35",
    "readTime": "1 min read",
    "fileName": "Self attention idea.md",
    "featured": false
  },
  {
    "id": "22",
    "title": "Query And Key Idea",
    "excerpt": "The query is ts asking if exist adjectives in front of a noun, the key vector is answer that question. (All implicitly of course, encoded in the value...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 14:29\"\n---\n\nThe query is ts asking if exist adjectives in front of a noun, the key vector is answer that question. (All implicitly of course, encoded in the values of the matrix).\n- For each head we have one a unique $W_{Q}$ and $W_{K}$. \n- On each attention head operates on **smaller subspace** of the full model dimension.\n- Creating the key and query vectors is something that happen on the RAM they are momentary.\n- The dimension of the query and key vector are determined by the _dimension model (quantity of parameters)_ the numbers of _heads_ and the \"head dimension\"\n",
    "uploadDate": "2025-04-29 14:29",
    "readTime": "2 min read",
    "fileName": "Query and key Idea.md",
    "featured": false
  },
  {
    "id": "23",
    "title": "Embedding Dimension",
    "excerpt": "The **embedding dimension** defines how many parameters a token will have.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 14:05\"\n---\nThe **embedding dimension** defines how many parameters a token will have.\n\nExist a whole paper about how is this\nWe are going to notate it simply like : $d$\n\n>The interesting thing is that while more bigger this numbers we have more options to express one word over a complex context.\n>Even exist a theorem that relate the exponential- ",
    "uploadDate": "2025-04-29 14:05",
    "readTime": "1 min read",
    "fileName": "Embedding dimension.md",
    "featured": false
  },
  {
    "id": "24",
    "title": "Context Problem",
    "excerpt": "We know that a part of what we call _context_ rely on use adjectives and what others word that are around. This modify the means of the word for us th...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 13:43\"\n---\nWe know that a part of what we call _context_ rely on use adjectives and what others word that are around. This modify the means of the word for us this is translated to change the values of the [[Tokenization - Embedding - LLM|words trough its vector parameters]].\n\nThus, we have to know the position of the words and ask if there adjectives in front of a word, for that purpose exists the _query vector_.\n\nThis have all the implicit information of the context related to a specific word, thus to each vector we have associated a _query vector_ that encodes all that contextual information respect that word.\n",
    "uploadDate": "2025-04-29 13:43",
    "readTime": "1 min read",
    "fileName": "Context Problem.md",
    "featured": false
  },
  {
    "id": "25",
    "title": "Blockchain",
    "excerpt": "Study and more study. It's only about study all the day man, read all the day, and being smart to earn money from that.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 08:36\"\n---\nStudy and more study. It's only about study all the day man, read all the day, and being smart to earn money from that. ",
    "uploadDate": "2025-04-29 08:36",
    "readTime": "1 min read",
    "fileName": "Blockchain.md",
    "featured": false
  },
  {
    "id": "26",
    "title": "DCGAN Deep Convolutional GAN",
    "excerpt": "I guess that this is a step further of the [[GAN-Generative Adversarial Network]]. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-28 07:38\"\n---\nI guess that this is a step further of the [[GAN-Generative Adversarial Network]]. \n\nOf course that is a little more complex.",
    "uploadDate": "2025-04-28 07:38",
    "readTime": "1 min read",
    "fileName": "DCGAN-Deep Convolutional GAN.md",
    "featured": false
  },
  {
    "id": "27",
    "title": "GAN Generative Adversarial Network",
    "excerpt": "The idea is quite good, you have a generator that creates images and a discriminator that try of say if the image is fake or new.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-28 07:27\"\n---\nThe idea is quite good, you have a generator that creates images and a discriminator that try of say if the image is fake or new.\n\nI guess that it would be a certain limit where this properly works, (the model don't improve) \n\nAnd this for me is considered [[Reinforcement Learning]], exist a punishment a reward, a agent action and state space.  ",
    "uploadDate": "2025-04-28 07:27",
    "readTime": "1 min read",
    "fileName": "GAN-Generative Adversarial Network.md",
    "featured": false
  },
  {
    "id": "28",
    "title": "Image Generator",
    "excerpt": "The idea is that the exist the matrix where you could act this three dimensional matrix, over this a [[Model]] could act, it has its parameter that sa...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-28 07:25\"\n---\nThe idea is that the exist the matrix where you could act this three dimensional matrix, over this a [[Model]] could act, it has its parameter that say to the model if \"brush\" this square of a certain color, we tweak this parameters using what actually we know. \n\nThe model can't generate new pixels only form a random matrix called it noise at first it could tweak this.\n\nAnd here exist some terms useful to manage Pooling, padding.\n\n\nSome architectures:\n- [[GAN-Generative Adversarial Network]]\n- [[DCGAN-Deep Convolutional GAN]]",
    "uploadDate": "2025-04-28 07:25",
    "readTime": "1 min read",
    "fileName": "image generator.md",
    "featured": false
  },
  {
    "id": "29",
    "title": "Surprise",
    "excerpt": "And this could be obtained from two perspectives (Artem) surprise or (Lemnis) that comes from [[Information Theory]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-27 12:22\"\n---\nAnd this could be obtained from two perspectives (Artem) surprise or (Lemnis) that comes from [[Information Theory]]\n[[Cross entropy]]",
    "uploadDate": "2025-04-27 12:22",
    "readTime": "1 min read",
    "fileName": "Surprise.md",
    "featured": false
  },
  {
    "id": "30",
    "title": "Adaptive Moment Estimation",
    "excerpt": "For each weight $\\theta$, we have $m_{t}$ the average of past gradients, $v_{t}$ the average of past squared gradients.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-24 11:15\"\n---\n>Adam\n\nFor each weight $\\theta$, we have $m_{t}$ the average of past gradients, $v_{t}$ the average of past squared gradients.\n\nThe update is $$\\theta_{t+1}=\\theta_{t}-\\alpha.\\frac{\\hat{m}_{t}}{\\sqrt{ \\hat{v}_{t}+\\epsilon }}$$\n$\\alpha$ the learning rate, and epsilon a number close to zero.\n",
    "uploadDate": "2025-04-24 11:15",
    "readTime": "3 min read",
    "fileName": "Adaptive Moment Estimation.md",
    "featured": false
  },
  {
    "id": "31",
    "title": "Optimizer",
    "excerpt": "We call **optimizer** to the method picked to change the parameters and reduce the [[Cost-Loss Function]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-24 11:09\"\n---\nWe call **optimizer** to the method picked to change the parameters and reduce the [[Cost-Loss Function]].\n\nFirst we have the forward process, computation of the loss function, using the [[Back propagation algorithm]], we compute the gradients, with these we choose a way of how change the parameters. The optimizer is that way, using those gradients we minimize the loss function.\n\n- Some popular optimizer are : [[Stochastic Gradient Descent|SGD]], [[Adaptive Moment Estimation|ADAM]], RMSprop, Adagrad, AdamW, we use one specifically for the task of the [[Model]]. The  are ones that works much better in certain cases. \n  ",
    "uploadDate": "2025-04-24 11:09",
    "readTime": "1 min read",
    "fileName": "Optimizer.md",
    "featured": false
  },
  {
    "id": "32",
    "title": "Mean Squared Error",
    "excerpt": "Let's imagine that we have a vector of inputs and output that we want that our _N.N_ learn.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-24 10:50\"\n---\nLet's imagine that we have a vector of inputs and output that we want that our _N.N_ learn.\nLet $n$ be the number of all the inputs that we are going to give to the function, $w$ the _weights_ $b$ the _bias_, $y(x)$ the actual out put that gives the [[Neural Network Idea]] and $a_{x}$ the expected output for one specific input. \n\n$$\nC(w,b)=\\frac{1}{2n}\\sum_{x}||y(x)-a_{x}||^{2}\n$$\n\nIs easy observe that our model is doing well if the output of these function is close to zero, if the number instead is a big number then we need to change in somehow the values for the parameters.\n\n[[Least squares algorithm]]",
    "uploadDate": "2025-04-24 10:50",
    "readTime": "4 min read",
    "fileName": "Mean Squared Error.md",
    "featured": false
  },
  {
    "id": "33",
    "title": "Encapsulation",
    "excerpt": "In python also exist **private attributes**. What are these? ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-23 15:51\"\n---\nIn python also exist **private attributes**. What are these? \nSetters and getters.",
    "uploadDate": "2025-04-23 15:51",
    "readTime": "1 min read",
    "fileName": "Encapsulation.md",
    "featured": false
  },
  {
    "id": "34",
    "title": "Polymorphism",
    "excerpt": "Basically a have class that are [[Inheritance]] a method for the _SuperClass_.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-23 15:47\"\n---\nBasically a have class that are [[Inheritance]] a method for the _SuperClass_.\n\n",
    "uploadDate": "2025-04-23 15:47",
    "readTime": "1 min read",
    "fileName": "Polymorphism.md",
    "featured": false
  },
  {
    "id": "35",
    "title": "NVIDIA",
    "excerpt": "I say the second biggest companiy. And it's maxima product are the graphics card but they also offer another devices and any type of software, we can'...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-22 09:37\"\n---\nI say the second biggest companiy. And it's maxima product are the graphics card but they also offer another devices and any type of software, we can't forget Omniverse.\n\nAnd also they are the biggest person doing research on new technologies like Ray Tracing and a lot of more stuff.\n\nOne time I saw a brief video of the CEO, this Taiwanese Jen-Hsun Huang he study electrical engineer and I guess that he shine on Standfors like play table tennis and he works and AMD, and the idea of make GPU's where comes from? \nAl.\n\n[[GPU]]\n\n[[Big Tech Companies]]",
    "uploadDate": "2025-04-22 09:37",
    "readTime": "1 min read",
    "fileName": "NVIDIA.md",
    "featured": false
  },
  {
    "id": "36",
    "title": "Cuda",
    "excerpt": ">We only need to know what is, and a basic understanding, if someone aims to or it seem it interesting/funny could study software engineering some yea...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-22 09:13\"\n---\n>We only need to know what is, and a basic understanding, if someone aims to or it seem it interesting/funny could study software engineering some years and literally use tweak it on his own. \n\n**Cuda** (Compute Unified Device Architecture) is a parallel computing platform and programming model developed by [[NVIDIA]]. Give you the chance of tweak the NVIDIA's [[GPU]] for specific purposes, leveraging the [[Gpu paralellism-deep learning-computational costs|paralellism]], the performance that we can obtain using cuda is surprising highly. To works like [[Cryptocurrency]] \n\n\nWe could say that cuda is one of the more relevant technologies behind all [[Model]], this comes with the GPU, inside of it, to this you add the right drivers and you are ready. ",
    "uploadDate": "2025-04-22 09:13",
    "readTime": "1 min read",
    "fileName": "cuda.md",
    "featured": false
  },
  {
    "id": "37",
    "title": "Python",
    "excerpt": "Python is the more use [[Language Program]] used around the globe. And for many reasons it super easy to learn it, you can run a python script easily ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 20:33\"\n---\nPython is the more use [[Language Program]] used around the globe. And for many reasons it super easy to learn it, you can run a python script easily to difference to C++, (well in Linux you have to create a executable) an in windows is quite hard!.\n\nNow that we are renting GPU's, I wonder if it .py script can run with any problem only on a GPU! I guess so, at the end are not that different.",
    "uploadDate": "2025-04-18 20:33",
    "readTime": "1 min read",
    "fileName": "Python.md",
    "featured": false
  },
  {
    "id": "38",
    "title": "C++",
    "excerpt": "I know the basics of this [[Language Program]], but currently compare it to [[Python]] it's hard have the gains of learn python. But like all in life,...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 20:32\"\n---\nI know the basics of this [[Language Program]], but currently compare it to [[Python]] it's hard have the gains of learn python. But like all in life, if you want to have a deeper understanding of programming i's a good language.\n\nI mean C++ is pretty good if you like developer wants make an upgrade in a line specific, all this thing of pointers, abstractions, compilations give you this insight of what is doing the computers. In **Python** is more straightforward, you don't need to know a lot of theory behind. \n\nBut of course that depends on your interests, if this don't having nothing to do with the mention don't worth learn this language.\n\nIt seems interested to me how a senior programmer learns a new code. \n\n>Respect _Anki_ we are covering everything I remember, we are not going expand our acknowledges in this language, I only want the ideas behinds. \n\nIt low level the we could use it for programming the [[Kernel]] what?",
    "uploadDate": "2025-04-18 20:32",
    "readTime": "1 min read",
    "fileName": "C++.md",
    "featured": false
  },
  {
    "id": "39",
    "title": "Internet",
    "excerpt": "Reading this book about startup the most profitable business is on internet.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 18:30\"\n---\nReading this book about startup the most profitable business is on internet.\n\nExist the history of how Internet evolve from 1990, until what actually is, the first search engine like [[Google]] \n\nIt's interesting that all the big millionaires were the first on think that Internet, was serious stuff, we need that kind of mindset, no matter, artificial. \n\nAnd I think that a good first step is begin to use a linux distro, because the environment of windows is simply awful.  \n\n\nMan and talking between how the connection works some terminology interesting is IP, proxy, gate ,DNS. And it's really interesting one thing more to learn\n\n[[ethernet]]",
    "uploadDate": "2025-04-18 18:30",
    "readTime": "1 min read",
    "fileName": "Internet.md",
    "featured": false
  },
  {
    "id": "40",
    "title": "Cyber Security",
    "excerpt": "This is note aim more to a reminder, that we need to be very careful to where places on [[Internet]], I actually have money on the BCP, but that is th...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 18:29\"\n---\nThis is note aim more to a reminder, that we need to be very careful to where places on [[Internet]], I actually have money on the BCP, but that is the best way? Is really secure? Yape is secure?\n\nI remember that Diana was stolen by connecting to a open WiFi. I use open services they are actually secure? \n\nExist a lot of words to understand this whole word where I'm not interested on, like Proxy, Servers, and a lot more. But each time with time have basic acknowledges on this field are more important, and for an average person the best is being careful, when one give the credit card. ",
    "uploadDate": "2025-04-18 18:29",
    "readTime": "1 min read",
    "fileName": "Cyber Security.md",
    "featured": false
  },
  {
    "id": "41",
    "title": "Vector Graphics",
    "excerpt": "They are images that don't lose quality if one make a zoom in. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-16 19:57\"\n---\nThey are images that don't lose quality if one make a zoom in. \nAre a form of computer graphics.\nand what about [[computer vision]]\nWe have the PDF, svg. \n",
    "uploadDate": "2025-04-16 19:57",
    "readTime": "1 min read",
    "fileName": "vector graphics.md",
    "featured": false
  },
  {
    "id": "42",
    "title": "Tensor   Computation",
    "excerpt": "In the [[Deep learning, what it is?]], a tensor basically _matrices_ of _high dimensions_, you can simply iterate using brackets and that is what we  ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-15 09:40\"\n---\nIn the [[Deep learning, what it is?]], a tensor basically _matrices_ of _high dimensions_, you can simply iterate using brackets and that is what we  call _Tensor_, of course from a more mathematical perspective that is a joke comparing to [[Tensor]], but of course this is more practical and have more easy, although is not that pretty for it's mere existence. \n\nIs what I liked, math, (solve problems), computation!",
    "uploadDate": "2025-04-15 09:40",
    "readTime": "1 min read",
    "fileName": "Tensor - Computation.md",
    "featured": false
  },
  {
    "id": "43",
    "title": "Cloud",
    "excerpt": "Basically the use of [[cluster servers]] to store data, because those already have more utilities.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-15 08:51\"\n---\nBasically the use of [[cluster servers]] to store data, because those already have more utilities.\n\n>What are those words that describe it properly? Use of analogies? Examples, predict.",
    "uploadDate": "2025-04-15 08:51",
    "readTime": "1 min read",
    "fileName": "cloud.md",
    "featured": false
  },
  {
    "id": "44",
    "title": "TPU",
    "excerpt": "It's pretty the same of [[CPU]] and [[GPU]] but aims to the manage of [[Tensor - Computation]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-15 07:59\"\n---\nIt's pretty the same of [[CPU]] and [[GPU]] but aims to the manage of [[Tensor - Computation]].\n\n\n\nPractically is used more in the [[Deep learning, what it is?]] field.\nNow the follow step is the [[NPU]]",
    "uploadDate": "2025-04-15 07:59",
    "readTime": "1 min read",
    "fileName": "TPU.md",
    "featured": false
  },
  {
    "id": "45",
    "title": "Inheritance",
    "excerpt": "In the [[Object Oriented Programming]] the inheritance is that _inherit_ the properties of super class.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 20:36\"\n---\nIn the [[Object Oriented Programming]] the inheritance is that _inherit_ the properties of super class. \n",
    "uploadDate": "2025-04-13 20:36",
    "readTime": "1 min read",
    "fileName": "Inheritance.md",
    "featured": false
  },
  {
    "id": "46",
    "title": "Jupyter Notebooks",
    "excerpt": "Well there you can run Notes pretty the same of Colab but it's locally (files with the .ipynb extension), they are part of the _Jupyter Project_ (2014...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 13:10\"\n---\nWell there you can run Notes pretty the same of Colab but it's locally (files with the .ipynb extension), they are part of the _Jupyter Project_ (2014) , and it's amazing.\n\nYou could use **Markdown** and **Latex** two of the things who I really like, run code (originally Julia, R, python) graphs, tables  and images practically the same what I did with Obsidian but adding code.  `print(\"hello)`\n\nI mean if you live making code takes notes in that way it's pretty useful. Also exist the application *Evernotes* but die. (If a company not advances die, amazing example)\nIt's really comfortable know that people take notes in this way from 2014.\n\nAnd in some way it use [[Anaconda]]\n\nAnd the well known _Colab_ is a hosted Jupyter Notebook, (if you don't have the need [[Hardware]] it's a pretty good option) that basically is a [[cloud|cloud service]]",
    "uploadDate": "2025-04-13 13:10",
    "readTime": "1 min read",
    "fileName": "Jupyter Notebooks.md",
    "featured": false
  },
  {
    "id": "47",
    "title": "Anaconda",
    "excerpt": ">Is a distribution of the Python and R languages, here distribution mean , is specifically designed for scientific computing, data science, machine le...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 13:00\"\n---\n>Is a distribution of the Python and R languages, here distribution mean , is specifically designed for scientific computing, data science, machine learning and big [[Data]] processing\n\nComes with **conda**, basically and environment to work fine, and comes with preinstalled libraries which always makes more fast the work. and more things that I don't gonna to write without use it before. \n\nAnd the question what is conda, well I don't know I need to try it.\n\n[[Machine Learning MOC]]",
    "uploadDate": "2025-04-13 13:00",
    "readTime": "1 min read",
    "fileName": "Anaconda.md",
    "featured": false
  },
  {
    "id": "48",
    "title": "Lang Chain",
    "excerpt": "Basically give steroids to [[Birth of LLMs]], and you use it in your day a day, that is not crazy.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 12:49\"\n---\nBasically give steroids to [[Birth of LLMs]], and you use it in your day a day, that is not crazy.\n\n>It's a framework that enable the connection between [[Model]] with other tools like [[API]] and even your [[Data]]. \n\n\n",
    "uploadDate": "2025-04-13 12:49",
    "readTime": "1 min read",
    "fileName": "Lang Chain.md",
    "featured": false
  },
  {
    "id": "49",
    "title": "Model",
    "excerpt": "In the [[Machine Learning]] literature a model is anything that was build from resolve a problem. In this path you have to make some abstractions.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-13 08:14\n---\nIn the [[Machine Learning]] literature a model is anything that was build from resolve a problem. In this path you have to make some abstractions.\n\n[[Birth of LLMs]] were created to resolve the Language problem, you create a model of how we use words and you works on that.\n\nbecause they are the most seen actually, but also exist the [[Multimodal Large Language Model]] and the model that only use [[computer vision]], but exist ton.",
    "uploadDate": "2025-04-13 08:14",
    "readTime": "1 min read",
    "fileName": "Model.md",
    "featured": false
  },
  {
    "id": "50",
    "title": "Hugging Face",
    "excerpt": ">Is an American company that develops computation tools for [[Machine Learning]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-13 08:09\n---\n>Is an American company that develops computation tools for [[Machine Learning]]\n\n\nThis is another startup related to AI, well it begin on 2016 founded by French people, thinking make a Chat bot for teenagers, but for some reason they [[OpenSource]] the model and they change the the [[Machine Learning]] field. \n\nI would say that is the best social network (surpass to reddit, anc twitter), the question is that here you could find many [[Model]], and also the question research is always a constant,  I love this page. \n\nAnd it's true that they don't have the same quantity of user that another webs, but they are pretty good.",
    "uploadDate": "2025-04-13 08:09",
    "readTime": "1 min read",
    "fileName": "Hugging Face.md",
    "featured": false
  },
  {
    "id": "51",
    "title": "How Internet Works Servers",
    "excerpt": "Maybe I retiring from the machine learning field. But I'm pretty sure that [[satelite]] have something to do with this. More realted of 5G technology.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 21:32\"\n---\nMaybe I retiring from the machine learning field. But I'm pretty sure that [[satelite]] have something to do with this. More realted of 5G technology.\nI mean If I would be a backend developer I would say that this is important.\nBut ok I give up respect curiosity. \nI mean it's very complex, all these I will skip it, it has to be with id, servers, and more stuff.\nIf I would be on 2020 I will try to understand strongly, but actually I'm race against time.\n\nThe use of servers are imprescinble. When you enter (using internet) for instance to [[Hugging Face]] you enter to its server, and I guess that in the local of its servers there are all the models and [[Data]]. We call the local of that server [[cloud]].\n\n[[Internet]]\n\n",
    "uploadDate": "2025-04-12 21:32",
    "readTime": "1 min read",
    "fileName": "how internet works servers.md",
    "featured": false
  },
  {
    "id": "52",
    "title": "Google",
    "excerpt": ">And google also begun like a startup, Larry Page and Sergey Brin founded it on 1996, and all begin as search engines, I guess that internet is starti...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 21:18\"\n---\n>And google also begun like a startup, Larry Page and Sergey Brin founded it on 1996, and all begin as search engines, I guess that internet is starting.\n\nAnd currently I'm very curious on how Internet begin. [[how internet works servers]]\n\nMan this is one the biggest [[Big Tech Companies]] that exist, I remember when they realize bard, and now they recalled like _Gemini_ because they have one problem with one add they realized, man just this week they realized a model with one million context size, that is a madness. \n\n",
    "uploadDate": "2025-04-12 21:18",
    "readTime": "1 min read",
    "fileName": "Google.md",
    "featured": false
  },
  {
    "id": "53",
    "title": "Antrophic",
    "excerpt": ">They are a startup founded by seven man people who worked on [[OpenAI]], I mean it's pretty normal that people from a [[Big Tech Companies]] renounce...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 20:51\"\n---\n>They are a startup founded by seven man people who worked on [[OpenAI]], I mean it's pretty normal that people from a [[Big Tech Companies]] renounce to fund it's own company or start up. It happen with [[Apple]], Nuvia and Qualcomm. They said the essential thing is not that complex, we could make that. \n\nAnd something that I find interesting is that you can send you CV, pretty easy and if you are good maybe you could be accepted, it's full meritocracy, and they ask Github-Git, linkdelin, Curriculum Vitae, and that kind of stuff.\n\nIt's model is Claude Sonnet has a very good performance.\n\nThis week together with [[Google]] ",
    "uploadDate": "2025-04-12 20:51",
    "readTime": "1 min read",
    "fileName": "Antrophic.md",
    "featured": false
  },
  {
    "id": "54",
    "title": "Operative System OS",
    "excerpt": "Man this is so confusing. Are the same of [[Distributions]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 17:39\"\n---\nMan this is so confusing. Are the same of [[Distributions]]\nWell here we have windows for instance Windows eleven, MacOs, linux (the kernel only).\n\n\n\n",
    "uploadDate": "2025-04-12 17:39",
    "readTime": "1 min read",
    "fileName": "Operative System OS.md",
    "featured": false
  },
  {
    "id": "55",
    "title": "Language Program",
    "excerpt": "Examples are python (the most used),C,C++, Java, Rust,Go, etc.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 17:18\"\n---\nExamples are python (the most used),C,C++, Java, Rust,Go, etc.\n\nAnd the life is pretty hard if you only know Python because if you want to make a program that want integrate different data and connections with another application you need to know more than a unique program language.\n\nThe difference with a shell is that they talk directly with the OS, to make familiar things, \ninstead a language program more for develop software, this are written on files, easily saved.\n\nWe need to talk of [[C++]]\n[[Code.canvas|Code]]",
    "uploadDate": "2025-04-12 17:18",
    "readTime": "1 min read",
    "fileName": "Language Program.md",
    "featured": false
  },
  {
    "id": "56",
    "title": "API",
    "excerpt": "Application Programming Interface, for the name I would say that is basically give it an application you can tweak it for you want, it's more focused ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 17:07\"\n---\nApplication Programming Interface, for the name I would say that is basically give it an application you can tweak it for you want, it's more focused on make different app talk each other trough [[Programming]].\n\nThis are very useful to specific purposes, when you work with many disconnect apps it's very useful. \n\n",
    "uploadDate": "2025-04-12 17:07",
    "readTime": "1 min read",
    "fileName": "API.md",
    "featured": false
  },
  {
    "id": "57",
    "title": "Vibe Coding",
    "excerpt": ">This note refers how the AI affect or upgrade our process of learning, specially code. One field where [[Model]] are quite better than humans.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 16:06\"\n---\n>This note refers how the AI affect or upgrade our process of learning, specially code. One field where [[Model]] are quite better than humans.\n\nThis make programming more accesible to the common user. Now you don't need hard skills on programming to make simples scripts,  Nietzche hates the masses, practically it's a no brainer, now the problem is evident you are not thinking, you are not learning, for the long run is more a problem, well that depends for the specifical use, I think that for science is bad.\nBut if you are not engaged, well is the best thing that ever happens.\n\nBut don't scale overtime! Science don't have easy paths, but I think than doing is the best way of learn. but I think than doing is the best way of learn.\n\nI past all  the day doing Vibe Coding and I felt that I don't use my brain, I go to bed with more than 18 hours awake and I don't feel tired, I don't feel that my neurons work properly, this is actually bad but if I weren't do that I don't will have a webpage. Modificable! Is completely brain rot. If life were all the days like this I will commite suicide. But well is just one day, and I don't wanna to do this again so...\n",
    "uploadDate": "2025-04-12 16:06",
    "readTime": "1 min read",
    "fileName": "Vibe coding.md",
    "featured": false
  },
  {
    "id": "58",
    "title": "Programming",
    "excerpt": "It is amazing for people who like think and implement, give you a lot tons of possibilities and you can make projecgs and projects and more.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:59\"\n---\nIt is amazing for people who like think and implement, give you a lot tons of possibilities and you can make projecgs and projects and more.\n\nAnd it's very important to know very well the name of things, before chatgtp and the video format all was about know the names of certain actions and (for referencing). \nAnd it was this practice of read documentation, something very uncommon in this days. \n\n[[Object Oriented Programming]]\n\nTo this practice to give problems to [[Birth of LLMs]] is called [[Vibe coding]].\n\n\n\nAnd in the future what is the most interesting that a person could make? Hackathon and _competitive programming_. \n\n>I think that the unique uses that I could give to programming are convert the apps that I use on terminal application and that I use [[Language Program]] to automate everything that I could. With ideas. Predict. \n\n[[Machine Learning MOC]]\n\n>I think that the best way of learn is struggling with the code, adding new things, making supossitions.",
    "uploadDate": "2025-04-12 13:59",
    "readTime": "1 min read",
    "fileName": "Programming.md",
    "featured": false
  },
  {
    "id": "59",
    "title": "Object Oriented Programming",
    "excerpt": "A _object_ is basically a variable of specific type, but to difference to `struct`  here you can add a lot of things, like _methods_, etc. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:58\"\n---\nA _object_ is basically a variable of specific type, but to difference to `struct`  here you can add a lot of things, like _methods_, etc. \n\nThe sense of use $OPP$ is the **modularity** that we love so much, and for big projects are good, and that one of the reason practically all project is made using this thing, I wonder if It would exist another paradigms\nand it's well reflected on its four pillar.\n1. [[Inheritance]]\n2. [[Polymorphism]]\n3. [[Encapsulation]]\n4. [[Abstraction]]\nIn C++, we talk of _setters_ and _getters_. When you create a class on C++, what you make is first this private thing, here you decide what kind of variables are going to be used for one element of the class the script inside private always run are called constructor, then in public you have setters  to define the variables correctly, and the getters to could use the variables, also exist the destructor but those is for clean memory.\n\nFor python is basically the same. \n\n[[Programming]]\n\n",
    "uploadDate": "2025-04-12 13:58",
    "readTime": "2 min read",
    "fileName": "Object Oriented Programming.md",
    "featured": false
  },
  {
    "id": "60",
    "title": "Recurrent Neural Network",
    "excerpt": "In the classic neural network if you give one input, this flow until became the output. Now what would happen if when is near to became the output we ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:35\"\n---\n\nIn the classic neural network if you give one input, this flow until became the output. Now what would happen if when is near to became the output we return it to the begin, it's like add a cycle. To this we call RNN.  \n\nAnd it mention about the use of sequential data (orders matters) you need to keep it somewhere this is _hidden state_\n\n, specifically how no idea. If the input is so long then it's probably that the [[Feed Forward Neural Network]] forget you know the vanishing problem, for that they create _LSMT_ (Long short term memory) networks.\nGRU (Gated Recurrent Networks) no idea also. \n\n\n[[An Introduction To Neural Networks]] pp-47",
    "uploadDate": "2025-04-12 13:35",
    "readTime": "1 min read",
    "fileName": "Recurrent Neural Network.md",
    "featured": false
  },
  {
    "id": "61",
    "title": "Pytorch",
    "excerpt": ">Developed by Meta, realized 2017, one year after **TensorFlow**, but it converted in the most package used for [[Deep learning, what it is?]] algorit...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:14\"\n---\n>Developed by Meta, realized 2017, one year after **TensorFlow**, but it converted in the most package used for [[Deep learning, what it is?]] algorithms quickly.\n\nDeveloped by **Meta AI**, and is very important to be use to its commands, and all the stuff.\n\nTogether with TensorFlow and Keras are very useful to treat Neural Networks.\n\nNow it seem it very interesting how they threat certain object, for instance when you want to train, they differentiate between non and trainable objects, and they do it using graphs! I guess. That is not incredible?\n\nOk, this library use [[cuda]] ",
    "uploadDate": "2025-04-12 13:14",
    "readTime": "1 min read",
    "fileName": "Pytorch.md",
    "featured": false
  },
  {
    "id": "62",
    "title": "Apple",
    "excerpt": "And respect Apple they sell basically all in one products, they don't sell pieces and the consumer could assembly it's costume computers. But for that...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:40\"\n---\n\nAnd respect Apple they sell basically all in one products, they don't sell pieces and the consumer could assembly it's costume computers. But for that exist _Hackinstosh_, that basically trick to MacOs, the bootloaders say that is Apple hardware. It is interesting what things make the community.\n\nAnd respect the AI, they are one of the leads respect to another [[Big Tech Companies]]\nThey have Neural Engine on its CPU but they are pretty expensive, stupidly expensive.\n\nAnd that is something good of Apple, if you want one product you buy it and ready for use. It's a no brainer which for me is bad, you assume many things. \n\n\n",
    "uploadDate": "2025-04-12 11:40",
    "readTime": "1 min read",
    "fileName": "Apple.md",
    "featured": false
  },
  {
    "id": "63",
    "title": "Mother Board",
    "excerpt": "To train [[Birth of LLMs]] the [[cluster servers]] use mother boards.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:27\"\n---\nTo train [[Birth of LLMs]] the [[cluster servers]] use mother boards.\n\nWell this stablish the connections between the [[GPU]] the [[CPU]] and the else.\n\n\n",
    "uploadDate": "2025-04-12 11:27",
    "readTime": "1 min read",
    "fileName": "Mother board.md",
    "featured": false
  },
  {
    "id": "64",
    "title": "PC",
    "excerpt": "You need to choose a [[RAM]], [[CPU]], a [[GPU]] the [[Mother board]], and the [[memory-RAM practical use]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:16\"\n---\nYou need to choose a [[RAM]], [[CPU]], a [[GPU]] the [[Mother board]], and the [[memory-RAM practical use]].\nOf course also the case, the power supply unit, and the peripheral. It's most common thing we say [[Hardware]]\n\nWe are talking outside the [[Apple]] case. That is apart with another world. Like [[laptop]]\n\nThen you need to think what [[Kernel]] are you going to use, you have two paths Windows Kernel and Linux Kernel, well the windows case is straight  \n\n>Well I have an history with my PC\n",
    "uploadDate": "2025-04-12 11:16",
    "readTime": "1 min read",
    "fileName": "PC.md",
    "featured": false
  },
  {
    "id": "65",
    "title": "Laptop",
    "excerpt": "When we say laptop, it's complex realize upgrades, portable, and that stuff.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:15\"\n---\nWhen we say laptop, it's complex realize upgrades, portable, and that stuff.\nFirst you need to buy one, of course here you have a lot of options.\n\nFirst you need to choose the if (money is not a worry) use Linux, Windows or Mac.\n\nLinux for developers and hard skill, Mac for creative workers, and windows for casual users. Here the Mac have the best performance in general but they are stupidly expensive for my use, I don't like creative work or visual stuff.\n\nIn this cases we are going to talk only on [[Linux]] for me the best kernel, and with \"awesome\" community. \n\nThen natural questions appears, what is the best laptop for use [[Distributions]], There is always the think pad of Lenovo, and well that is , pretty simple now what are my [[My specific use of electronic devices]] ",
    "uploadDate": "2025-04-12 11:15",
    "readTime": "1 min read",
    "fileName": "laptop.md",
    "featured": false
  },
  {
    "id": "66",
    "title": "Teraflops",
    "excerpt": "Now tell the power of a computer, tell us the quantity of operation point float",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 10:28\"\n---\nNow tell the power of a computer, tell us the quantity of operation point float\nit often used on computer.\n",
    "uploadDate": "2025-04-12 10:28",
    "readTime": "1 min read",
    "fileName": "teraflops.md",
    "featured": false
  },
  {
    "id": "67",
    "title": "Distributions",
    "excerpt": "This is only available when we talk respect [[Linux]] the people could create it's on distro because Linux is open source, of course if you want to cr...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 10:17\"\n---\nThis is only available when we talk respect [[Linux]] the people could create it's on distro because Linux is open source, of course if you want to create your own distro is not easy. \nFor *Linux* we have: Ubuntu, Arch, Debian, Red Hat ,etc.\nAnd for apple products we have \n\nEach [[Operative System OS]] have it's own kernel \n\nBut what a _distributions_ make?\nThey give it to you one starting point, they give you basic tools for use the PC. \n\n\n>Why I am using Ubuntu in my laptop? Because it's beautiful\n\nAnd we have to be very restricted with the time that we dedicated to only use Linux.\n\nI established that for the end of the cycle I will return, but now it seemed to me that for the one week for the beginning of the fourth cycle I finished with the establish, and become a arch Linux user for the beginning of the fifth cycle. I mean now I quite better with Ubuntu, and I don't have time for struggle with Linux, then the next year we make the change. \n\nAnd I think that is the better way to change to Linux, first Ubuntu and then Arch after a long time of course).\n\nNow I could use those laptops to carry to the University day to day and leave this that is the better at house.\n\nMan but it was really exciting use arch Linux , of course that I help me with that because do it manually it's a lot. but each time we are more near to the minimalism digital, the problem is respect the phone but that is another history.\n\nThe question is that I want to forget this thing and don't think on it. Until February 2026 or maybe 2027. I mean that change is important, respect the cellphone why don't use a cellphone open source. I mean exist but that is only a possibility if I have to buy a phone and I can inherit many phone so there not much reason to talk about this. \n\n",
    "uploadDate": "2025-04-12 10:17",
    "readTime": "2 min read",
    "fileName": "Distributions.md",
    "featured": false
  },
  {
    "id": "68",
    "title": "Kernel",
    "excerpt": "This is the most important thing between the communication between [[Hardware]] and [[Operative System OS]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 10:14\"\n---\nThis is the most important thing between the communication between [[Hardware]] and [[Operative System OS]]\n\n|        | Linux [[Distributions]] | MacOS | Windows    |\n| ------ | ----------------------- | ----- | ---------- |\n| Kernel | Linux                   | XNU   | Windows NT |\nRespect to _Microsoft_ and all the PC's that use Windows we have: Microsoft NT\nThis are the motors core of a _distribution_ often called **Distro**.\n\nOf course when we talk for Kernel first you need to know what is your _hardware_, because compatibility problems, when someone buy a mac don't think on use windows, \n\nAbstracting the most, in the case of a PC, where you can choose the components, a directly ensemble (it's really simple).\n\nOf course the most normal is use a intel/amd processator and gpu of nvidia, and for programming you the only use it that you can you make of GPU is the parallelisation.\n\n\n\n[[laptop]]\n[[PC]]\n[[Phone and tablet]]\n\nWell the Kernel most used (but people don't know) are from _Microsoft_, practically all the people who are not developers use it,  \n",
    "uploadDate": "2025-04-12 10:14",
    "readTime": "1 min read",
    "fileName": "Kernel.md",
    "featured": false
  },
  {
    "id": "69",
    "title": "Cluster Servers",
    "excerpt": "You combine a lot of [[Hardware]], (and when I refer to hardware, which are the percentages, the people, the individual and what is the percentage of ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 18:14\"\n---\nYou combine a lot of [[Hardware]], (and when I refer to hardware, which are the percentages, the people, the individual and what is the percentage of the servers used, the difference is that big?)\n, well specialised hardware for servers, I mean the better hardware, then you could save space and in certain way [[Electrical energy]] because I guess that mere fact that is turn it is on implies a use of energy. \n\nThe question is that these are connected using a specific technology for fast communication to performing thousands of asking, if one device don't work properly, this don't affects the else.\n\nThe obvious problem relies on the use of energy and refrigeration.\nFor the energy problem some of these are ubicated on countries where auto renewal energy are cheap, for instance there a server related to _Tor_ that is located on a geothermal energy place, and the technology behind it would be crazy.\n\nAnd for the refrigeration the use of water (one of the most absorbers of heat) is pretty common, I mean that is interesting , it would be a specialised kind of water for don't spoilt the devices, don't generated short circuit.\n\nThe quantity of options are biggest for that reason companies lunch new methods to optimize all the process or specific parts. For instance [[Pipe Line and Dual Pipe Line]]\n\n[[how lunch a website]]\n\n📖 [[DeepSeek-V3 Technical Report]] pp. 11",
    "uploadDate": "2025-04-10 18:14",
    "readTime": "2 min read",
    "fileName": "cluster servers.md",
    "featured": false
  },
  {
    "id": "70",
    "title": "Quantization",
    "excerpt": "And yes reduce the quantity of [[Byte]] to the numbers to increase the velocity of use of these but of course the performance of the models decay, it'...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 18:04\"\n---\nAnd yes reduce the quantity of [[Byte]] to the numbers to increase the velocity of use of these but of course the performance of the models decay, it's a good technique if you have a poor hardware.\nI guess that in somehow you cut the numbers. I mean it sounds easy but in the practical to create a package for make this is really complex I don't know.\n\nIn [[DeepSeek-V3 Technical Report]] it's talked about this. (Complex)",
    "uploadDate": "2025-04-10 18:04",
    "readTime": "1 min read",
    "fileName": "quantization.md",
    "featured": false
  },
  {
    "id": "71",
    "title": "F8P Training",
    "excerpt": "Basically to certain type data we assign more precision this is more decimals, we need to remember that the numbers are [[Byte|bytes]], this occupy a ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 17:46\"\n---\nBasically to certain type data we assign more precision this is more decimals, we need to remember that the numbers are [[Byte|bytes]], this occupy a space, a physical space in the [[Hardware]] (not so different that atomic level in the actuality), the question is that to more relevant data like parameters we assign more accuracy and to another we despite more less accuracy.\n\nWe play the game between FP8, BF16, FP32, what are this I don't know.\n\nTalk about these at the end is talk about [[quantization]].\n\n\n📖 [[DeepSeek-V3 Technical Report]] pp. 14",
    "uploadDate": "2025-04-10 17:46",
    "readTime": "1 min read",
    "fileName": "F8P Training.md",
    "featured": false
  },
  {
    "id": "72",
    "title": "Hardware One And Zeros",
    "excerpt": "Now this is very important to the technology, used by [[Deep seek]] TF8P",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 17:30\"\n---\nNow this is very important to the technology, used by [[Deep seek]] TF8P\n\nOk, we have know that hardware are the CPU,G  GPU, etc  all component physic, \nbut I have some questions, all have transistor, how the memory saves information, in zeros and ones but how exactly?\n[[Byte]]\nI mean a transistor works with tree foots, \nI mean the first thing we are going to learn is about the hard disk, I always heard about this.\n\nFirst about memory, let's understand Hard Disk and make notes with the higher quality.\n\nThis two notes are about introduction. \n[[Hard disk Drive]]\n[[Hardware]]",
    "uploadDate": "2025-04-10 17:30",
    "readTime": "1 min read",
    "fileName": "Hardware one and zeros.md",
    "featured": false
  },
  {
    "id": "73",
    "title": "Checkpoint LLM",
    "excerpt": "You need to save the checkpoints, it could be that exist a [[Electrical energy]] fail, and you lost all the advance, and you need to start again, I th...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 17:20\"\n---\nYou need to save the checkpoints, it could be that exist a [[Electrical energy]] fail, and you lost all the advance, and you need to start again, I think that the only that\n",
    "uploadDate": "2025-04-10 17:20",
    "readTime": "1 min read",
    "fileName": "checkpoint LLM.md",
    "featured": false
  },
  {
    "id": "74",
    "title": "Artificial Intelligence",
    "excerpt": "How we create intelligence, if a design a mechanism to move a ball we could say that the mechanism have intelligence?",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-09 15:14\"\n---\nHow we create intelligence, if a design a mechanism to move a ball we could say that the mechanism have intelligence?\n\nOf  course animals in a certain sense have intelligence, we dont ask about they but inanimadad things.\n\nFirst we call AI to all that shows an intelligent behaviour, therefore the overall idea is based on [[Emulate the human brain through computers|emulate the brain]] a task completely hard, that could be see it from different approaches.\n\nWe are talking in the most general case, the word **artificial** refers non natural, and the actuality there are a huge amount of unnatural things. \n\n[[Machine Learning]]\n\n[[Another uses of Artificial Intelligence]]\n[[Machine Learning Classification]]\n\nAnd talking respect the overall purpose\n- [[ANI]] (Narrow)\n- [[ASI]] (Super)\n- [[AGI]] (Generative)\n",
    "uploadDate": "2025-04-09 15:14",
    "readTime": "1 min read",
    "fileName": "Artificial Intelligence.md",
    "featured": false
  },
  {
    "id": "75",
    "title": "Active Parameters",
    "excerpt": "When we ask a question we only use a part of the brain, we have knowledge in distinct branch of knowledge, but a questions in general are in specific ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-09 15:10\"\n---\nWhen we ask a question we only use a part of the brain, we have knowledge in distinct branch of knowledge, but a questions in general are in specific field. We don't need to know history to answer a question of physics, (it's true that all the branch are connect but we need to answer precise), the same it would be for active parameters? \n\n\n[[Model]]\n[[Values LLM]]",
    "uploadDate": "2025-04-09 15:10",
    "readTime": "1 min read",
    "fileName": "Active Parameters.md",
    "featured": false
  },
  {
    "id": "76",
    "title": "Machine Learning",
    "excerpt": "> Inside of this we have to the branch of science with more develop in the last decade, [[Deep learning, what it is?]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 08:17\n---\n> Inside of this we have to the branch of science with more develop in the last decade, [[Deep learning, what it is?]].\n\nThis is a sub branch of the most general [[Another uses of Artificial Intelligence]]\n\n[[Machine Learning Classification]]\n\nHere the combination of [[Hardware]] and [[Software]] \"learn\" and practically when we say AI we are referring to this\n\nA rigorous form of describe it?\n\nInstead of elaborate a complex algorithm to perform a task that is very complex \n,trough trial and error we can create a algorithm to do this, and the better is that we can generalize this.\nWe search to a[[Model]] predict something.\n\ndecision trees, linear regression, that kind of thing. \n\n\nWe need to think a word that always appear in the Machine learning world.\nUntil now I don't what a [[AI agent]] is.",
    "uploadDate": "2025-04-09 08:17",
    "readTime": "1 min read",
    "fileName": "Machine Learning.md",
    "featured": false
  },
  {
    "id": "77",
    "title": "O1 Model",
    "excerpt": "This o1 model surpass its equals by increasing the [[Test time compute]]. Which translate on more use of hardware, more money, more energy and more ti...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 07:55\n---\nThis o1 model surpass its equals by increasing the [[Test time compute]]. Which translate on more use of hardware, more money, more energy and more time, gold resources in the actuality, but its performance is amazing.\n\n[o1 model](https://openai.com/o1/)\n\n",
    "uploadDate": "2025-04-09 07:55",
    "readTime": "1 min read",
    "fileName": "o1 model.md",
    "featured": false
  },
  {
    "id": "78",
    "title": "OpenAI",
    "excerpt": "This is one of the biggest [[Big Tech Companies|tech companies]] that lead the [[Machine Learning|machine learning]] respect products, respect researc...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 07:47\n---\nThis is one of the biggest [[Big Tech Companies|tech companies]] that lead the [[Machine Learning|machine learning]] respect products, respect research I don't know. This company start with the idea of make free and open services for people but they choose lucrar de estos servicios, which is normal for the quality of these.\n\nOne important turning point was the realese of Chatgtp, and the [[o1 model]].\n\nOf course they are going to keep launching new things, the kind of persons who lider this kind of companies never stop when they start. They want it all.\n\nWhy Sant Altman is very popular?\n\n>I wonder what will be the future of this company in ten years (April-09-2025)\n\n[Open AI research](https://openai.com/research/index/) ",
    "uploadDate": "2025-04-09 07:47",
    "readTime": "1 min read",
    "fileName": "OpenAI.md",
    "featured": false
  },
  {
    "id": "79",
    "title": "Computer Vision",
    "excerpt": "Ok, this is where [[Alex Net]] shined.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 07:16\n---\nOk, this is where [[Alex Net]] shined.\nAnd here the the most used is [[Convolution Neural Network]], that work perfectly recognize borders and that stuff. \n\nRemember that there is this book (old one) about this topic on the library, exist a ton of method to approach this problem.\n\nAnd okay state-of-the-art models (LLama-Vision) have the stuff necessary to process images (e.g [[Convolution Neural Network]]) but if you want a more detailed output descriptions for example you need a [[large language model]], also is good use some formula to throw away a number (classification) like the Alex Net case.\n\nThose are [[vllm]]\n",
    "uploadDate": "2025-04-09 07:16",
    "readTime": "1 min read",
    "fileName": "computer vision.md",
    "featured": false
  },
  {
    "id": "80",
    "title": "Classification Using AI",
    "excerpt": "How we said that this image is a dog? A complex question, this is completely [[computer vision]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 19:20\"\n---\nHow we said that this image is a dog? A complex question, this is completely [[computer vision]]\nAnd what another thing would be useful\n\n\nIf you mention to [[Birth of LLMs]] a book of it know if the book belong to Drama, Academic or Life style, I think is for the nature of words used.",
    "uploadDate": "2025-04-08 19:20",
    "readTime": "1 min read",
    "fileName": "classification using AI.md",
    "featured": false
  },
  {
    "id": "81",
    "title": "Function AI",
    "excerpt": "There exist a lot of function that are very used on AI literature and I don't understand for instance. arg min",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 18:55\"\n---\nThere exist a lot of function that are very used on AI literature and I don't understand for instance. arg min\nThat is pretty easy to understand, ,$argmin_{x}f(x)$, return a element of the domain that _minimize_ the function, instead $min_{x}f(x)$ return said value.\nIf we have many inputs that subscript refer which are choosing. \n\nAlso exist $argmax$, is obvious what makes.\n\n_Example:_ In the context of [[classification using AI]]\n\n$$\n\\hat{y}=argmax_{y}\\mathbb{P}(y|x)\n$$\n\nThis gives the most probable class label $y$ for input $x$.\n\n\n[[SoftMax Function]] is one.",
    "uploadDate": "2025-04-08 18:55",
    "readTime": "4 min read",
    "fileName": "function AI.md",
    "featured": false
  },
  {
    "id": "82",
    "title": "Function Used In Literature AI",
    "excerpt": "There exist a lot of function that are very used on AI literature and I don't understand for instance. arg min",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 18:55\"\n---\nThere exist a lot of function that are very used on AI literature and I don't understand for instance. arg min\nThat is pretty easy to understand, ,$argmin_{x}f(x)$, return a element of the domain that _minimize_ the function, instead $min_{x}f(x)$ return said value.\nIf we have many inputs that subscript refer which are choosing. \n\nAlso exist $argmax$, is obvious what makes.\n\n_Example:_ In the context of [[classification using AI]]\n\n$$\n\\hat{y}=argmax_{y}\\mathbb{P}(y|x)\n$$\n\nThis gives the most probable class label $y$ for input $x$.\n\n\n[[SoftMax Function]] is one.",
    "uploadDate": "2025-04-08 18:55",
    "readTime": "4 min read",
    "fileName": "function used in literature AI.md",
    "featured": false
  },
  {
    "id": "83",
    "title": "AI Agent",
    "excerpt": "And if always is about **AI agents** and currently they are the last use of [[Artificial Intelligence]], I mean the most advanced tool.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 10:53\"\n---\nAnd if always is about **AI agents** and currently they are the last use of [[Artificial Intelligence]], I mean the most advanced tool.\n\nI need to use one, only for prove I would say. It's like have a virtual assistant who would say that Jarvis already exist.\n\nImagine have all with this automation, programming. I don't need any information that don't comes from a book.\n\nAnd I think that the use of interfaces kill what really are computers. \n KIMI K2, a good example I think\n[huggingface.co/moonshotai](https://t.co/4ukcXB0iP6)\n\nOk, let's say that you want to automatize all the boring or repetitive task, \nit's like a the calculator, you don't need to sum or multiplicate, but in this case you loose mental velocity, in the case of AI agent you lost something I would say no.\n\nIn my case I don't need one, (I could create someone who is able to make the same things that I do?) , I past all the time making exciting things, but I'm really excited about the function of these. \n\nthink it like this all the time you are in the risky or your acknowledge, you don't lost time eating, walking, bath things.\n\nToday I past a great amount of time trying OneDrive work well on Ubuntu, I could make that AI agent make that chore?\n\nOk, but [[Lang Chain]] is the implementation \n",
    "uploadDate": "2025-04-08 10:53",
    "readTime": "1 min read",
    "fileName": "AI agent.md",
    "featured": false
  },
  {
    "id": "84",
    "title": "Data Set   Problem To Obtain High Quality Data",
    "excerpt": "I mean now that I have to make something the question that have a high quality data set is a problem but first you have to be very clear what are goin...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-03-26 23:57\"\n---\nI mean now that I have to make something the question that have a high quality data set is a problem but first you have to be very clear what are going to make,\nand for a single person it's a lot of work to recolectate huge amount of high quality data. \n\nExist several techniques to collect data one that I heard a lot is about Scrapping.\n\nAnd exist a lot of ways to make a model learn the data that we have, \none that the most know are.\n\n- [[Fine Tune]]\n- [[RAG]]\n\nand specifically talking there is this thing of _verl_ tambien esta DPO que le enseñamos a preferir ciertas respuestas,RLHF RL with human feedback and a lot of things.\n\nAnd here you need some of creativity to say what project I could perform.\nfor instance learn to the model talk in a specific way, I mean for that you use simply chatgtp but if you want that the model learn and don't say it specifically?, and for companies that have a lot of data and want take advantage of that, I mean the works on Data Scients are very asked, maybe there we can make something, I see it interesting.\n\nAnd what about the API of chatgtp, I think it is more useful to make lighten things, because at the end you are using chatgtp setting for your purpose, you are not changing the model, the model behaviour changes not change itself.",
    "uploadDate": "2025-03-26 23:57",
    "readTime": "1 min read",
    "fileName": "Data set-  Problem to obtain high quality data.md",
    "featured": false
  },
  {
    "id": "85",
    "title": "Alex Net",
    "excerpt": "Alex net was the turning point on the chronology of AI.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-03-26 23:56\"\n---\nAlex net was the turning point on the chronology of AI.\nIt would be the first of the class generative.\n\n\n\n[[Geoffrey Hinton]] participated here, and basically Alex Net was the first to use this mount of budget, people, and data in a model, it task was recognize of images.\n\nYou give tons of image to a model in somehow it can create its own images, that is not amazing? Well we need to differentiate between classification task and generator class,\nand the generate is a new world. [[image generator]]\n\nThe question is the How?\n\nI don't think that for recreate Alex Net it would be necessary have an incredible budget, because currently the cheap for that hardware is decreased. (That I guess) and that is really a good project.\n\n\n\n\nThis is [[computer vision]]. And here is where left to understand machine learning.\n\n",
    "uploadDate": "2025-03-26 23:56",
    "readTime": "1 min read",
    "fileName": "Alex Net.md",
    "featured": false
  },
  {
    "id": "86",
    "title": "Universal Approximation Theorem",
    "excerpt": "And this is a pretty result completely mathematician, but with an awesome application.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-03-02 13:46\"\n---\nAnd this is a pretty result completely mathematician, but with an awesome application.\n\nA [[Feed Forward Neural Network]] with at least one hidden layer and **non-linear** activation functions can approximate any continuous function. So this [[linearity on DL]]\n\n",
    "uploadDate": "2025-03-02 13:46",
    "readTime": "1 min read",
    "fileName": "Universal Approximation Theorem.md",
    "featured": false
  },
  {
    "id": "87",
    "title": "Multimodal Large Language Model",
    "excerpt": "This model not only tries to understand the language but also the images, images 3d, sounds, videos, audio , everything that could be represented in a...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-28 18:29\n---\nThis model not only tries to understand the language but also the images, images 3d, sounds, videos, audio , everything that could be represented in a file. \n\nIs a subset of [[large language model]]\n\nImagine that exist a chatgtp but for videos, you give it a video and the model tell you with accuracy what's happening or a 3 dimensional file and the model tell you what represents. \n\nIt's something very crazy I mean actually exist model for image very goods @ferret\n\nData from sensors, GPS data, any tracker device, like movement of airplanes.  I mean the imagination is the limit.\n\n[[Birth of LLMs]]\n\n",
    "uploadDate": "2025-02-28 18:29",
    "readTime": "1 min read",
    "fileName": "Multimodal Large Language Model.md",
    "featured": false
  },
  {
    "id": "88",
    "title": "Positional Encoding",
    "excerpt": "But no matter, all what at the end cares is the [[positional embedding matrix]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-25 23:57\n---\nBut no matter, all what at the end cares is the [[positional embedding matrix]].\n\nIt's very important the position of the word (NLP), the most simply is assign a natural number according to the apparition of the word, I mean it's easiest way (complexity linear). But I think that emerges a problem how we relate the vector of a word to a number.\n\nWe can use RNN's that learn the position of the embeddings. \n\nUsing [[Convolution Neural Network]] also it's possible @gehringConvolutionalSequenceSequence2017\n\nUsing [[Transformer]] lack recurrence thus is not possibly to know the position of a word. @Vaswani2017\n\nDeep Seek use another form called Rotatory and decoupled rotatory position.",
    "uploadDate": "2025-02-25 23:57",
    "readTime": "1 min read",
    "fileName": "Positional encoding.md",
    "featured": false
  },
  {
    "id": "89",
    "title": "Add And Normalize",
    "excerpt": "After apply the [[Self attention mechanism on one head|self attention mechanism]] and the [[FFN on Transformers|FFN]] we have add the vector to the ou...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-25 22:06\"\n---\nAfter apply the [[Self attention mechanism on one head|self attention mechanism]] and the [[FFN on Transformers|FFN]] we have add the vector to the output of these two.\nI mean \nResidual Connections\n\n[[batch normalization]]\n\nLayer Normalization\n",
    "uploadDate": "2025-02-25 22:06",
    "readTime": "1 min read",
    "fileName": "Add and normalize.md",
    "featured": false
  },
  {
    "id": "90",
    "title": "AGI",
    "excerpt": "Artificial General Intelligence.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-25 17:28\"\n---\nArtificial General Intelligence.\nFrom the release of ChatGTP on 2022 we see a explosion of examples on this field. [[OpenAI]]\nBut we can't say that it was the first one, that was [[Alex Net]].\n\nThese aim to copy the intelligence human (but not emulate it?) for instance If I ask to Deep Seek to resolve a problem of physics the most probably is that it will, he will copy the steps that were shown in the [[Training Phase LLM |training phase]].\n\n ",
    "uploadDate": "2025-02-25 17:28",
    "readTime": "1 min read",
    "fileName": "AGI.md",
    "featured": false
  },
  {
    "id": "91",
    "title": "Machine Learning MOC",
    "excerpt": ">We are here because I want form part of a startup where I can learn a lot about this world and people. And the sufficient experience to enter to the ...",
    "content": "---\ntags:\n  - young\n  - ml\nauthor: Jorge\ndate: \"2025-02-25 17:24\"\n---\n>[!tip]\n>We are here because I want form part of a startup where I can learn a lot about this world and people. And the sufficient experience to enter to the Work|work world, scale, and get improving with time. There exist interesting [jobs](antropicJob.png) in this world. \n\nThis is currently the most exciting field of science ([[Deep learning, what it is?]]). If we observe it, there are thousand of people trying to [[Emulate the human brain through computers|emulate the brain]], probably currently the field with more activity on the last decade, Is not the most complicated thing that humanity tried? \nWe could be able to obtain truly artificial intelligence?, One able to get better by himself?, Perfection itself because it want it?\n\n_A difference respect with my theoretical study is that here I need to present the work result of my study to Joel_. But I'm not accustomed to study and put it instantly on practice, change of mindset respect curiosity|I need to change the mindset. I will split the time in theoretical and practice. (Practice=[[Programming]])\n\n_Paragraphs:_\n1. Ulterior intentions.\n2. Interesting part, theory, practical and philosophy implications. \n3. Change of Mindset.\n\n",
    "uploadDate": "2025-02-25 17:24",
    "readTime": "1 min read",
    "fileName": "Machine Learning MOC.md",
    "featured": false
  },
  {
    "id": "92",
    "title": "Improving Large Language Models With Lora And Why You Shouldn'T Do It",
    "excerpt": "So once that you understand how Large Language models works all the people are working on improve them (thus they can earn money).",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2025-02-25 11:29\nmodified: 2025-10-25 11:24\n---\n\nSo once that you understand how Large Language models works all the people are working on improve them (thus they can earn money).",
    "uploadDate": "2025-02-25 11:29",
    "readTime": "1 min read",
    "fileName": "Improving Large Language Models with Lora and why you shouldn't do it.md",
    "featured": true
  },
  {
    "id": "93",
    "title": "Reinforcement Learning",
    "excerpt": ">Is full trial and error with feedback.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-24 18:36\n---\n>Is full trial and error with feedback.\n\nReinforcement learning is a field of Artificial Intelligence, where an abstract object (an agent) learns.\n\n[[State of the art agents]]\n\nIt's like a student looking for his way to solve a problem, he has certain tools, examples and theory (_environment_).\n\nHe would take different actions depending on whether he is able to resolve it or not.\n\nIf we want to take it to the world of computing there exists three things to consider, _the sensation or stimuli , the action or answer to that sensation and the feedback or reward._\n\nIntroducing terminology used in this field:\n- **Agent** it's the student, in this case the one who is going to learn, we use it to refer to a model.\n- **Policy** it's the way of behaving, it's a function that takes a state and turns it into an action.\n- **Reward** A real number that tells us how good the agent is doing. or if it is doing bad things/actions we don't reward them, instead we penalize them.\n- **Value Function** Thinking in a long term, change the way we see the rewards, therefore the actions also. -> [[value function]]\n- _Model_ of the environment: where our agent is located.\n\n[[reinforcement learning from human feedback]]\n\nApproach to machine learn\n- No value functions -> evolutionary methods\n- Policy gradients methods -> Use of parameters\n\nWe can't forget that exist this dilemma _Exploration or exploitation_.\n\nNow exist a whole theory on this how I should approached.\nI mean also there is a relation with Montecarlo Method, because you need to some random fluctiations to advance.\n\nIt's a branch of [[Machine Learning Classification]]\n\nAnd are amazing visualize it, there this videos where you could see it more specifically. How agents learn, there is this video of the car, is great example, and I don't know that it was a combination and of [[Feed Forward Neural Network]] and use of _Policy_. Of course they use a kind of evolutionary method.\nwe could say that this branch is one of the most used.\n\n[[Reinforcement Learning Lectures]]\n\n[You Tube Playlist](https://www.youtube.com/watch?v=2pWv7GOvuf0&list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ) by David Silver ",
    "uploadDate": "2025-02-24 18:36",
    "readTime": "2 min read",
    "fileName": "Reinforcement Learning.md",
    "featured": false
  },
  {
    "id": "94",
    "title": "Machine Learning Classification",
    "excerpt": "Currently when someone say [[Artificial Intelligence]], he is making reference to **Machine Learning**, it's important to know how this is divided to ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-24 12:52\n---\nCurrently when someone say [[Artificial Intelligence]], he is making reference to **Machine Learning**, it's important to know how this is divided to be conscious where one is working, thus we are able to relate ideas and concepts between them. Of course is kind of impossible to know very deeply and detailed each sub field but is like physics have the overall concept of each gives you this skill, to be able to get exciment.\n\nBroadly talking, [[Machine Learning]] is divided like follow:\n\t[[Unsupervised learning 1]]\n\t[[Supervised learning]]\n\t[[Reinforcement Learning]]\n\t[[Deep learning, what it is?]]\n\n> Also we can classify it for the direct _application or use_ of the models, [[Another uses of Artificial Intelligence|thus we can think how the model should be]]. Develop one [[Model]] cost hundred of thousand of dollars, a lot of time and hundreds of employees you naturally expect recieve moneynfor its use.\n",
    "uploadDate": "2025-02-24 12:52",
    "readTime": "2 min read",
    "fileName": "Machine Learning Classification.md",
    "featured": false
  },
  {
    "id": "95",
    "title": "Load Balancing Issue",
    "excerpt": "If the [[Sparse Moe]] behaviour make that only one certain experts are chosen, for that we have the follow.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-24 12:39\"\n---\nIf the [[Sparse Moe]] behaviour make that only one certain experts are chosen, for that we have the follow.\n\nLet's say that you give it one prompt to a model, this for the model is a set of vector, called it $\\mathcal{B}=\\{ \\mathrm{x_{1},x_{2},\\dots ,x_{T}}\\}$. And let's say we have $N$ experts, (indexed). $T$ the number of tokens give it to the model.\n\nIn the [[Training Phase LLM]] \n\n\n$$\n\\mathcal{L}_{\\text{load-balancing}}=N\\sum_{i=1}^{N}\\mathcal{D}_{i}\\mathcal{P}_{i} \n$$\n\n$$\n\\mathcal{D}_{i}=\\frac{1}{T}\\sum _{x\\in \\mathcal{B}}\\mathbb{1}\\{ argmax\\mathcal{G}(x,\\Theta)=i \\}\n$$\n\n$$\n\\mathcal{P_{i}}=\\frac{1}{T}\\sum_{x\\in \\mathcal{B}}\\mathcal{G}(x,\\Theta)_{i}\n$$\n\nWe say that $\\mathcal{D}_{i}$ represents the proportion of tokens distributed to expert $i$and $\\mathcal{P_{i}}$ \n\n📖 [[A survey on Mixture of Experts]]",
    "uploadDate": "2025-02-24 12:39",
    "readTime": "5 min read",
    "fileName": "Load balancing issue.md",
    "featured": false
  },
  {
    "id": "96",
    "title": "FFN Working",
    "excerpt": "[[Feed-forward neural network]]",
    "content": "---\ntags:\n  - baby\n  - ml\n  - connection\nauthor: Jorge\ndate: 2025-02-13 13:55\n---\n[[Feed-forward neural network]]\n\nThis neural network use its [[FFN Structure|structure]] like follow.\n\n1. Input layer receive data, this data must be re framed in numbers to be distributed to the first layer.\n2. Therefore each neuron receive a number and this give its numbers to follow layer, but multiplied by the weight its connection, thus each neuron of the follow layer receive a weighted sum, to that sum plus the bias making it unique.\n3. We apply a [[Activation function]] , and pass the result to the follow neuron, like this with each neuron until reach the output layer.\n4. The output layer give us the final result after commonly apply the [[SoftMax Activation-LLM Idea abstraccion|SoftMax to this vector]].   \n\nThe most primitive and one of the firsts [[Neural Network Idea]] was the [[Perceptron|perceptrons]], this don't use an _activation function_.\n\nOf course the most basic _FFN_ that we can implement is using [[Sigmoid Neurons]] and it's a well example to grasp _Neural Networks_",
    "uploadDate": "2025-02-13 13:55",
    "readTime": "2 min read",
    "fileName": "FFN working.md",
    "featured": false
  },
  {
    "id": "97",
    "title": "Cross Entropy",
    "excerpt": "And before we need to define the [[Surprise-Self Information]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-12 22:55\"\n---\nAnd before we need to define the [[Surprise-Self Information]]\n\nVery used in task for classification, because indeed we are comparing to distributions (think of classification of handwritten numbers).\n\nCross entropy is a measure from information theory that quantifies how different two probability distributions are. \n\n$$\nH(p,q)=-\\sum_{x}p(x)\\log q(x)\n$$\n\n\n\nIn machine learning, it's commonly used as a loss function, especially for classification tasks.\nWhen training a model, you want the predicted probabilities to be as close as possible to the true distribution.\n\n- If the model gives **high probability to the correct class**, loss is **low**.\n    \n- If the model is **confident but wrong**, loss is **high**.\n    \n- It punishes confident wrong answers harshly.???\n\n[[Self attention mechanism on one head]]\n\n### YT\n\n![](https://youtu.be/KHVR587oW8I)\n",
    "uploadDate": "2025-02-12 22:55",
    "readTime": "1 min read",
    "fileName": "Cross entropy.md",
    "featured": false
  },
  {
    "id": "98",
    "title": "Multitoken Prediction",
    "excerpt": "Instead of only predict one token in to the future, predict more than one",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-12 22:03\"\n---\nInstead of only predict one token in to the future, predict more than one\n\nIs like you take a path and have different choices.\nFor training is delightful because you could use pretty well one unique sample.",
    "uploadDate": "2025-02-12 22:03",
    "readTime": "1 min read",
    "fileName": "Multitoken prediction.md",
    "featured": false
  },
  {
    "id": "99",
    "title": "Deep Seek",
    "excerpt": "And is not only Deep Seek is also ChatGTP, Gemini, Claude, and more LLM's. That we could use wisely. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-12 17:26\n---\n\nAnd is not only Deep Seek is also ChatGTP, Gemini, Claude, and more LLM's. That we could use wisely. \nAnd If I put it money I think  and integrate, use agents I guess for personal use. And that is what [[Linux]] open. There are a lot of things to do.\n\nWhen you pay a lot of gates open, the first steps are use cursor and claude. how they could integrate to our work?\n\n[[prompt engineering]]\n\nDeep seek is a Chinese company that develops _open-source_ [[Birth of LLMs]] founded in July 2023 by _Liang Wenfeng_.\n\nIt's main product the DeepSeek-R1 model provides responses equal or better in certain aspects that other well known models like _GPT4_. The surprising is that to difference to another _LLM_ its training cost is considerable more lower, only six millions of dollars.\n\nThe context and the mind set of the company plays a role important to achieve thus success. \nI mean this product brings many good things too the A.I community \n\nOne of the innovations are:\n- [[Multi head latent attention]]\n\n- [[Mixture of experts]]\n\n- [[Multitoken prediction]]\n\n- FP8 quantization & hardware optimization\n\n- DualPipe [[Pipe Line and Dual Pipe Line]]\n\n[[Big Tech Companies]]\n\n# YouTube Video\n\n ![](https://youtu.be/Xk33QyjSIl0)\n\n\n![](https://youtu.be/hd1-CKDyHXE)\n\n![](https://youtu.be/zw-XrTmuirg)\n",
    "uploadDate": "2025-02-12 17:26",
    "readTime": "2 min read",
    "fileName": "Deep seek.md",
    "featured": false
  },
  {
    "id": "100",
    "title": "Query And Key",
    "excerpt": ">The **key** and **query** are [[Tensor - Computation|tensors]] that are obtained in the [[Training Phase LLM]]",
    "content": "---\ntags:\n - baby\n - ml\nauthor: Jorge\ndate: \"2025-02-08 09:55\"\n---\n>[!definition]\n>\n\n>The **key** and **query** are [[Tensor - Computation|tensors]] that are obtained in the [[Training Phase LLM]]\n\n- Well the matrix is the one \n\nTo resolve the [[Context Problem]] we have:\n1. The **query vector** is $\\mathbf{q}=W_{Q}\\mathrm{x}$, where $\\mathrm{x}$ is a token and the $W_{Q}$ is the **query matrix** obtained by training.\n2. The **key vector** is $\\mathbf{k}=W_{K}\\mathrm{x}$, $W_{K}$ the **key matrix**. \nWhere $\\mathrm{x}\\in \\mathbb{R}^{d}$, $d$ the [[Embedding dimension]] , and $W_{K},W_{Q}\\in \\mathbb{R}^{d_{h}n_{h}\\times d}$, where $d_{h}$ is the head dimension and $n_{h}$ the quantity of dimension, thus $\\mathbf{q,k}\\in \\mathbb{R}^{d_{h}n_{h}}$\nThus we slice these in $n_{h}$ parts in such a way:\n\n$$\n[\\mathbf{q_{1},q_{2},\\dots ,q_{n_{h}}}]=\\mathbf{q}\n$$\n\n[[Query and key Idea]]\n[[Cross attention]]\n$$\n[\\mathbf{k_{1},k_{2},\\dots ,k_{n_{h}}}]=\\mathbf{k}\n$$\n**Ref**. [[DeepSeek-V2 A Strong, economical, and efficient Mixture of Expert Language Model]] pp. 6\n\n\n",
    "uploadDate": "2025-02-08 09:55",
    "readTime": "8 min read",
    "fileName": "Query and key.md",
    "featured": false
  },
  {
    "id": "101",
    "title": "Self Attention Mechanism On One Head",
    "excerpt": "Is necessary interpret this idea. They key idea is:",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-07 14:22\"\n---\n\n[[flash attention]]\n[[head model]]\n\n\nIs necessary interpret this idea. They key idea is:\n$$\nAttention(Q,K,V)=softmax\\left(\\frac{Q\\cdot K^T}{\\sqrt{ d_{k} }} \\right)V\n$$\nThus the change would be (represented very fuzzy) $\\vec{E_{i}}'=\\vec{E}_{i}+Attention(Q,K,V)$\n\nMore precisely:\n$$\n\\mathbf{o}_{t,i}=\\sum_{j=1}^{t}Softmax\\left( \\frac{\\mathbf{q}^{T}_{t,i}\\mathbf{k}_{j,i}}{\\sqrt{ d_{h} }} \\right) \\mathbf{v}_{j,i}\n$$\n$$\n\\mathbf{u}_{t}=W^{O}[\\mathbf{o}_{t,1};\\mathbf{o}_{t,2};\\dots ;\\mathbf{o}_{t,n_{h}}]\n$$\n\n\n[[Self attention idea]]\n\nEach head act's over a dimension lower that the [[Embedding dimension]]. Let $d_{h}<d$ this dimension\nThe $Q$ and $K$ are the [[Query and key]], $V$ are the [[Values - LLM]] and $d_{k}$ is the [[Context size LLM]], and the [[SoftMax Activation-LLM Idea abstraccion|Softmax function]] to bring it into a workable form.\n\n>The _dot product_ in the __formula__ represents how well a key answer a query, I mean it's the essence of **Self Attention***.\n\n>Attention was known before 2017, but this specific mechanism was introduced for first time on the paper.\n\n**Ref**: \n1. [[References/Attention Is all you need|Attention Is all you need]]\n2. [[DeepSeek-V2 A Strong, economical, and efficient Mixture of Expert Language Model]]\n\n# YouTube\n\n![](https://youtu.be/eMlx5fFNoYc)\n\n\n\n\n\n\n\n\n\n\n\n\n\nAfter this vector go to the section of [[layer LLM use]] and what happen to the vector here?\n",
    "uploadDate": "2025-02-07 14:22",
    "readTime": "6 min read",
    "fileName": "Self attention mechanism on one head.md",
    "featured": false
  },
  {
    "id": "102",
    "title": "Architecture Of A Transform",
    "excerpt": "A transform consists on:",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-07 10:59\"\n---\n![transformerArchitecture.png](transformerArchitecture.png)\nA transform consists on:\n- Encoder stack \n- Decoder stack\n\nThe encoder stack consist on many [[layer AI|layer]] (in the code we called block to each layer, why?). And each layer contains.\n- [[Multi-head attention]]\n- [[FFN on Transformers]]\n- [[Add and normalize]]\n\nSo the numbers of layers should be large, I mean is like the cell. \nSo the architecture is completely well defined once that the [[hyperparameters]] are defined.\n\nThe decoder stack is practically the same but using a [[Masking]].\n\nBut I do not understand why at the output is shifted right at the picture- \n\n**Ref**. [[Attention Is all you need]] pp. ",
    "uploadDate": "2025-02-07 10:59",
    "readTime": "1 min read",
    "fileName": "Architecture of a transform.md",
    "featured": false
  },
  {
    "id": "103",
    "title": "Training Phase LLM",
    "excerpt": "Ok, once you have all the structure ready, all the functions, you stablish all the connections between GPUs you stablish the [[checkpoint LLM]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-07 08:48\"\n---\nOk, once you have all the structure ready, all the functions, you stablish all the connections between GPUs you stablish the [[checkpoint LLM]]",
    "uploadDate": "2025-02-07 08:48",
    "readTime": "1 min read",
    "fileName": "Training Phase LLM.md",
    "featured": false
  },
  {
    "id": "104",
    "title": "Tokenization   Embedding   LLM",
    "excerpt": "Because you could train your own tokenizer , that is not amazing?",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-07 08:34\"\n---\nBecause you could train your own tokenizer , that is not amazing?\n\nWe need to talk about the [[Bite Pair Algorithm]], that is the first part, once that you convert a \"line\" of words into tokens then you use that numbers to convert into to matrix or tensors ...\n\n>And just about this days days (12 July) there is another kind of technology that proposes to replace to Tokens, which is  H-NET [https://arxiv.org/abs/2507.07955](https://t.co/AVW1RtyRAY) I think that the most important relies on the optimization make more cheaper and fast.\n\nPractically only cares the [[Embedding matrix]]\n\nGive to each human word a number, of course the word must be in the most primitive form . The obvious problem is that in general one word has many means. The context, the other words around matter. And if it's a large text even more. \n\nThis is apart of only give a vector to a word is necessary to give the position in the text, add more complexity.\nBut I do not understand, what vector choose, to multiply this matrix?\n\n_We are going to talk first how could work a autocomplete._\n\nIf a word represents a vector we could see it, if the vector only have three parameters , the would a vector on three dimensional space that we know.\n\nAbout the nature of the vector, the vector home and the vector house would equal or similar?\n\nAre similar I think, if we would able to visualize it, they would have a similar \ndirections\n\nAnd I think that thinking it isolate is something that everyone could think. \n\nHow did it not occur to me before.?\n\nHow we could measure the similarity between two vector? [[Dot Product]]\n\n[[Tokenization - Unembedding - LLM]]\n\n\n[[Positional encoding - Sinuidal]]",
    "uploadDate": "2025-02-07 08:34",
    "readTime": "2 min read",
    "fileName": "Tokenization - Embedding - LLM.md",
    "featured": false
  },
  {
    "id": "105",
    "title": "Activation Function",
    "excerpt": "The [[FFN Structure]] made that each neuron receive the sum of the product point of weights with another outputs of neuron and to this sum its bias, t...",
    "content": "---\ntags:\n  - baby\n  - ml\n  - connection\nauthor: Jorge\ndate: \"2025-02-06 11:23\"\n---\nThe [[FFN Structure]] made that each neuron receive the sum of the product point of weights with another outputs of neuron and to this sum its bias, this is:\n\n$$z=w\\cdot x+b$$\n\nLet's imagine that you already have a set biases and weights, for $n$ layers each one with a arbitrary number of neurons and use what is above to all the process.\nIt can be demonstrated that use only affine operations like above all the layers can be condensed and reach the same results in the output. Thus all [[Perceptron|the perceptrons]] don't need hidden layers.\n\nThe output in each neuron would be a linear combination, and a linear combination cannot resolve complex problems, for instance we have the XOR problem, \n\nFor that reason we need to introduce a function $f$ that breaks linearity (we have to leave to that space that we are talking on [[Being linear|linearity]]) , and use a considerable quantity of layers improves the [[Neural Network Idea]] the same for the others . Then:\n\n$$\nf(z)=f(w\\cdot x+b)\\neq w \\cdot f(x)+f(b)\n$$\n\nAlso know its [[First derivative]] of $f$ is pretty important using [[Back propagation algorithm]].\n\nThe functions more used in deep learning: [[List of activation functions and their problems]]\n\n**Ref**. [[Neural Networks and Deep Learning]]",
    "uploadDate": "2025-02-06 11:23",
    "readTime": "4 min read",
    "fileName": "Activation function.md",
    "featured": false
  },
  {
    "id": "106",
    "title": "Deep Learning, What It Is?",
    "excerpt": "This is a subset of [[Machine Learning]]. Where [[Feed Forward Neural Network]] born, we make use of them to make [[Model|models]] learn. And now that...",
    "content": "---\ntags:\n  - young\n  - ml\nauthor: Jorge\ndate: \"2025-02-05 18:41\"\n---\nThis is a subset of [[Machine Learning]]. Where [[Feed Forward Neural Network]] born, we make use of them to make [[Model|models]] learn. And now that we have already have the [[Birth of LLMs|LLM]] that is the best that this field give it to us, and shows intelligence we are trying to improve the efficiency, make them more cheap ([[Deep seek]]) and integrate to all parts possible of our lives, this last is very profitable,[[Big Tech Companies]] are the prove.  \n\nTo put in practice the theory and have notable results this field have some challenges.\n- The size of the data sets have to be extremely high, if we use a small one is probably that occurs **over fitting**. (Memorize and don't generalize)\n- Use of [[GPU]]'s t [[TPU]]'s, that are surprisingly expensive for the average person, only Big companies are able to create its own _models_ from scratch. The regular user only could use it or tweak minimal things.\n- _Black Box Problem_: Do you want convert word to vector and you need a matrix? Train it and that's all, what mean the matrix numbers, We don't know but works, that works is the important. How exactly the matrix know what it is and _adjective_? Who cares?\n\n\n\n\n",
    "uploadDate": "2025-02-05 18:41",
    "readTime": "2 min read",
    "fileName": "Deep learning, what it is?.md",
    "featured": false
  },
  {
    "id": "107",
    "title": "CPU",
    "excerpt": "Central Processing Unit ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-01-18 13:48\n---\nCentral Processing Unit \n\n1. Arithmetic Logic Unit (ALU)\n2. Control Unit (CU)\n3. Instruction Register\n\nThis is in charge realize of  arithmetical operations a huge amount of time and very faster.\nFirst one need to choose what operation make, if I open firefox, in the RAM appear the operations that Firefox need to work, the CPU, we send those operations to the CPU, it made and the result of that operation is sended to the place where need this operation in this case firefox.\n\nThis is what we called a cycle, the natural question is how long it takes to the CPU make this operation, well it could perform$3/times 10^{9}$ of this operation in one second, that is extremaly fast.\n\nWhat is the reason of this velocity? The ligth speed is involved? Remember how a transistor works, all relies on leaps, and there  are a lot of questions.\n\nIts structure is basically divided in a few amount of cores, for instance mine equips use two or four cores.\n\n\n- The process how this made it's operations it's sequential one by one.\n\n- Work well for heavy operations.\n\n[[Transistor]]\n[[Hardware one and zeros]]\n[[Byte]]\n",
    "uploadDate": "2025-01-18 13:48",
    "readTime": "2 min read",
    "fileName": "CPU.md",
    "featured": false
  },
  {
    "id": "108",
    "title": "Lie Algebras A Step For The Universal Theory And A Monster Living On A Huge Dimension",
    "excerpt": "I mean there are a ton of beauty ideas.",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2024-11-25 11:29\nmodified: 2025-10-25 11:24\n---\nI mean there are a ton of beauty ideas.\n\nintuitive introduction to Lie algebras and explains why they matter so much in physics. It aims to bridge the mathematical definition and the standard physical applications (symmetries, conservation laws, quantum mechanics, and gauge theories).\n\n## What is a Lie algebra?\n\nA Lie algebra is a vector space g over a field (usually R or C) equipped with a bilinear operation [ , ]: g × g → g called the Lie bracket, satisfying two properties:\n\n- Antisymmetry: [X, Y] = −[Y, X]\n- Jacobi identity: [X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0\n\nThe bracket encodes an infinitesimal notion of commutation. Lie algebras are the “linearized” versions (tangent spaces at the identity) of Lie groups — continuous groups of transformations.\n\n## Basic examples\n\n- Matrix algebras with the commutator bracket: if M_n(F) is the space of n×n matrices, then g = M_n(F) with [X, Y] = XY − YX is a Lie algebra.\n- so(3): real 3×3 antisymmetric matrices; describes infinitesimal rotations in 3D. Generators satisfy [J_i, J_j] = ε_{ijk} J_k (up to factors).\n- su(2): 2×2 traceless anti-Hermitian matrices (physicists often use Hermitian generators with an i); su(2) is the double cover of so(3) and is central in spin/angular momentum.\n- Heisenberg algebra: generated by position x and momentum p with [x, p] = iħ (plus central element). This algebra sits at the heart of quantum mechanics.\n\n## Why physicists care — an overview\n\n1) Symmetries and conservation laws\n\n  - Continuous symmetries of a physical system form Lie groups (e.g., rotations, translations, gauge transformations). The associated infinitesimal generators form a Lie algebra.\n  - Noether's theorem links continuous symmetries to conserved quantities; Lie algebra generators are directly tied to conserved currents (e.g., angular momentum, linear momentum, charge).\n\n2) Linearization and computation\n\n  - Lie algebras are linear spaces; working with them is usually easier than with the full nonlinear Lie group. The exponential map relates algebra elements (infinitesimal generators) to finite transformations: exp(tX) ∈ G.\n  - Structure constants (defined by [T_a, T_b] = f_{ab}^c T_c) encode the algebra and are used extensively in calculations (commutation relations, Feynman rules, coupling terms).\n\n3) Quantum mechanics and representation theory\n\n  - Observables and symmetry generators are represented by operators on Hilbert space. A key task in quantum physics is to find the representations of a Lie algebra — how abstract generators act on quantum states.\n  - Particles and fields organize into irreducible representations of symmetry algebras: e.g., spin-1/2 lives in the fundamental representation of su(2), photons correspond to representations of the Poincaré group (massless representations), etc.\n\n4) Gauge theories and the Standard Model\n\n  - Gauge symmetries are local Lie group symmetries; the gauge bosons themselves are connection fields taking values in the Lie algebra (e.g., the gluon fields are valued in su(3)).\n  - Yang–Mills Lagrangians are built from Lie-algebra-valued gauge fields and their field strengths. Structure constants f_{abc} appear in interaction terms and determine self-interactions of the gauge bosons.\n\n5) Practical calculations: commutation relations and selection rules\n\n  - Selection rules, allowed transitions, and degeneracies often follow from the underlying Lie algebra and its representations. For example, Clebsch–Gordan decomposition in su(2) tells you how angular momentum adds.\n\n6) Quantization and classical limits\n\n  - Poisson brackets of classical mechanics form a Lie algebra; upon quantization Poisson brackets turn into commutators. Lie algebras provide a conceptual bridge between classical conserved charges and quantum operators.\n\n## Short worked examples\n\n- Angular momentum (so(3)/su(2)): the generators J_x, J_y, J_z have commutation relations\n\n  [J_i, J_j] = i ħ ε_{ijk} J_k\n\n  These algebraic relations determine spectra, ladder operators (J_±), and selection rules.\n\n- Heisenberg algebra: the canonical commutation relation [x, p] = iħ encodes the uncertainty principle and is the simplest nontrivial Lie algebra in quantum mechanics.\n\n- su(3) in QCD: the eight generators T_a of su(3) satisfy [T_a, T_b] = i f_{abc} T_c; the f_{abc} determine the nonabelian self-coupling of gluons.\n\n## Why “algebra” instead of group — a pragmatic note\n\n- The Lie algebra is the tangent space at the group identity. Many computations (perturbation theory, conserved charges, classification) are local/infinitesimal and naturally live in the algebra.\n- Classifying Lie algebras (simple, semisimple, solvable) helps physicists classify possible symmetry groups and construct model Lagrangians with desired properties.\n\n## Further reading (short list)\n\n- H. Georgi, \"Lie Algebras in Particle Physics\" — physics-focused, practical.\n- B. C. Hall, \"Lie Groups, Lie Algebras, and Representations\" — a clear mathematical introduction with physics motivation.\n- A. Zee, \"Group Theory in a Nutshell for Physicists\" — physics intuition and examples.\n- J. Fuchs & C. Schweigert, \"Symmetries, Lie Algebras and Representations\" — useful for conformal/gauge contexts.\n- Online: lecture notes (MIT, Harvard), nLab/Wikipedia entries for concrete quick references.\n\n## Closing remarks\n\nLie algebras are an indispensable toolkit for modern theoretical physics. They encode infinitesimal symmetries, simplify calculations, and their representation theory underlies the classification and behavior of quantum states and particles. Whether you are studying angular momentum, quantizing a field, or building gauge theories, Lie algebras appear everywhere and understanding them pays large dividends.\n",
    "uploadDate": "2024-11-25 11:29",
    "readTime": "4 min read",
    "fileName": "Lie Algebras a step for the universal theory and a monster living on a huge dimension.md",
    "featured": true
  },
  {
    "id": "109",
    "title": "Neural Networks From Where They Come From",
    "excerpt": "So for reason I'm reading the book from Nielsen Neural Networks and Deep Learning (this guy explain pretty well).",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2024-10-13 11:29\nmodified: 2025-10-25 11:24\n---\nSo for reason I'm reading the book from Nielsen Neural Networks and Deep Learning (this guy explain pretty well).\n\n\n\n",
    "uploadDate": "2024-10-13 11:29",
    "readTime": "1 min read",
    "fileName": "Neural Networks from where they come from.md",
    "featured": true
  },
  {
    "id": "110",
    "title": "Trying To Modelate The Complexity Of Threes (Doesn'T Work)",
    "excerpt": "So I see the threes and I wonder how you can create computationally one three.",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2024-09-13 11:29\nmodified: 2025-10-25 11:24\n---\nSo I see the threes and I wonder how you can create computationally one three.\n\nDifferent ideas run on my mind. And randomess should be here.\n\nWell at least I know SimLink and MatLab.\n",
    "uploadDate": "2024-09-13 11:29",
    "readTime": "1 min read",
    "fileName": "Trying to modelate the complexity of threes (Doesn't work).md",
    "featured": true
  },
  {
    "id": "111",
    "title": "Bernoulli Numbers And The Gamma Function And The Beauty On It",
    "excerpt": "No excerpt available",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2024-08-28 11:29\nmodified: 2025-10-25 11:24\n---\n\n",
    "uploadDate": "2024-08-28 11:29",
    "readTime": "1 min read",
    "fileName": "Bernoulli Numbers and the gamma function and the beauty on it.md",
    "featured": true
  },
  {
    "id": "112",
    "title": "The Big Minds Of Science Dirac Fermi Feynman Cantor And All That People",
    "excerpt": "So I read a ton of biographies and of course I am going to talk about it. ",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2024-08-28 11:29\nmodified: 2025-10-25 11:24\n---\nSo I read a ton of biographies and of course I am going to talk about it. \n\nThe epoch of my time where I read the most! \n\nThis books are from the Series \"Grandes Ideas de la Ciencia\" and I read the follow biographies:\n\nDirac, Fermi, Neumann (Partially) , Cantor (The first one), Feynman (The best I think), Einstein, Newton, Leibniz (Partially), Hilbert, ",
    "uploadDate": "2024-08-28 11:29",
    "readTime": "1 min read",
    "fileName": "The big minds of science Dirac Fermi Feynman Cantor and all that people.md",
    "featured": true
  },
  {
    "id": "113",
    "title": "Assembling A Car With Omnidireccional Wheels And An Arduino And Why It'S A Bad Idea Do It In Peru",
    "excerpt": "Building an Omnidirectional Mine‑Exploration Car with Arduino",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2023-06-28 11:29\nmodified: 2025-10-25 11:24\n---\nBuilding an Omnidirectional Mine‑Exploration Car with Arduino\nIntroduction\nEver wondered how to build a robot that can glide sideways, pivot on the spot, and creep through narrow corridors? In this guide we will design and build a small electric car capable of omnidirectional motion using Mecanum wheels, controlled by an Arduino microcontroller. Because the car is intended for exploring mines, we will equip it with a smoke/gas detector and other sensors. The emphasis will not simply be on following instructions; instead, the goal is to understand the physics and electronics behind each component. By the end you should be able to adapt the design for your own experiments and venture beyond the obvious.\nRichard Feynman famously insisted that true understanding comes from being able to explain things in simple language. Throughout this report you will find analogies, sketches of ideas, and invitations to think deeply about the forces, currents and code at work. Don’t be afraid to ask “why?” at every step – the joy of discovery often lies just beneath the surface.\n1. Understanding Omnidirectional Wheels\n1.1 What is a Mecanum Wheel?\nA Mecanum wheel is a conventional wheel with a twist: along its circumference there are small rollers oriented at 45°. When the wheel spins, the roller orientation causes the force to be directed partly forward/backward and partly sideways. This means that a single wheel can exert a diagonal force on the ground. When four of these wheels are arranged in a square and each is driven independently, the diagonal forces can sum or cancel to produce forward, sideways, diagonal or rotational motion[1][2]. This design provides true omnidirectional movement without needing steering mechanisms.\nTo visualise this, imagine pushing a heavy box across a floor while wearing shoes with ball bearings on the soles: you can push forward, but the ball bearings allow lateral slip. Each Mecanum wheel is like a row of ball bearings; by controlling each wheel’s rotation you steer the combined friction forces.\n\n\n1.2 Left‑ and Right‑Handed Wheels\nBecause the rollers must point at 45° relative to the axis, there are two types of Mecanum wheels: left‑handed and right‑handed (often called Type A and Type B). The orientation of the rollers determines the direction of the diagonal force. To achieve true omnidirectional movement, you must install the wheels in an alternating ABAB pattern: one left‑handed wheel at the front left, a right‑handed wheel at the front right, a left‑handed wheel at the back right, and a right‑handed wheel at the back left[3][4]. This ensures that the diagonal forces cancel when the robot moves forward but reinforce when moving sideways.\nIf you don’t alternate the wheels correctly, the sideways forces may cancel incorrectly, causing the robot to twist instead of strafing. Always pay attention to the orientation of the rollers: viewed from above, the front wheels’ rollers should point toward the center of the robot, and the rear wheels’ rollers should mirror this.\n1.3 Vector Forces and Control Equations\nWhen all four Mecanum wheels spin forward, the sideways components cancel out and the robot moves forward. If the front right and rear left wheels spin forward while the front left and rear right spin backward, the forward components cancel and the sideways components add, causing the robot to slide sideways. By controlling each wheel’s speed and direction, one can create any motion vector, including rotation[5].\nThis is codified in control equations often used in programming:\nLeftFrontWheel  = Speed + Strafe − Turn\nRightFrontWheel = Speed − Strafe − Turn\nLeftBackWheel   = Speed − Strafe + Turn\nRightBackWheel  = Speed + Strafe + Turn\nThese equations combine translational speed along the forward axis (Speed), sideways motion (Strafe), and rotation (Turn)[6]. Understanding these relationships encourages you to think beyond simple forward/backward control and to visualise the forces at play. If you have ever added vectors on graph paper, you will recognise this as a vector addition problem: each wheel contributes a vector, and the sum determines the robot’s movement.\n2. Planning the Mine‑Exploration Car\n2.1 Features and Requirements\nOur mission is to create a small vehicle that can navigate the confined spaces of a mine, detect hazardous gases or smoke, and avoid obstacles. The design should be:\n    • Omnidirectional: able to move in any direction, pivot in place, and strafe sideways for precise positioning.\n    • Sensor‑equipped: carry a gas sensor (MQ2) to detect smoke or flammable gases, and an ultrasonic range finder (HC‑SR04) to detect walls and obstacles.\n    • Modular: use a protoboard (breadboard) for prototyping circuits without solder, allowing modifications.\nIn addition, the car should be sturdy, have a low center of mass for stability, and use components that are readily available.\n2.2 Bill of Materials\nBelow is a summary of the main components you will need. The table lists only keywords and numbers; detailed explanations follow in the text.\nComponent\tQuantity\tPurpose\nArduino Uno or Mega\t1\tMicrocontroller; brain of the robot\nMecanum wheels (Left & Right)\t4\tProvide omnidirectional motion\nGeared DC motors or steppers\t4\tDrive each wheel; choose motors with sufficient torque\nL293D motor driver or shield\t1\tInterface between Arduino and motors; allows direction control[7]\nBreadboard / protoboard\t1\tSolderless board for wiring sensors and electronics[8]\nMQ2 gas/smoke sensor\t1\tDetects LPG, smoke, hydrogen, etc. over a range of 200–10000 ppm[9]\nHC‑SR04 ultrasonic sensor\t1\tMeasures distance using sound pulses[10]\nServo motor\t1\tRotates the ultrasonic sensor to scan the surroundings\nBattery pack (7.4 V Li‑Ion)\t1\tPower supply for motors and electronics\nVoltage regulator or buck converter\t1\tSteps down battery voltage to 5 V for sensors/Arduino\nJumper wires, resistors, LEDs\tMisc\tWiring and status indicators\n3. Breadboard Basics and Prototyping\nA breadboard, or protoboard, is a solderless board that allows you to prototype circuits quickly. Inside each row are metal clips connecting five adjacent holes; the long power rails on the sides are connected horizontally, but you must link the two rails with a jumper if you need both sides[11]. The central “ravine” separates the two halves so that DIP ICs (like the L293D) can straddle the gap, allowing each pin to connect to a different row[12]. Because the connections are temporary, breadboards are ideal for testing sensor circuits before committing to a printed circuit board[8].\nUnderstanding the internal structure of a breadboard encourages you to think carefully about how current flows. For example, connecting a voltage regulator incorrectly might short two rows; by peeking under the plastic you will notice the metal clips. Feynman’s curiosity about how things work at the microscopic level is a useful mindset when prototyping.\n4. Motors and the L293D Motor Driver\n4.1 Why Do We Need a Motor Driver?\nElectric motors draw significant current. Connecting a DC motor directly to an Arduino pin is not safe; the microcontroller pins can only supply about 20 mA, while a motor can draw hundreds of milliamps or even an amp when starting up. Driving a motor directly may damage the chip[7]. The solution is to use a motor driver, such as the L293D, that acts as an intermediary between the low‑current control signals and the high‑current motors.\n4.2 The H‑Bridge Concept\nThe L293D contains two H‑bridge circuits. An H‑bridge is like a set of four switches arranged in an “H” shape; by closing different pairs of switches you can drive current through the motor in either direction[13]. When you imagine current as water in pipes, the H‑bridge controls which way the water flows through the motor. Using this arrangement you can make the motor spin forward or backward without physically swapping wires.\nThe L293D can handle motor supply voltages between 4.5 V and 36 V and deliver up to 600 mA per channel, with short peaks up to 1.2 A[14]. It also includes flyback diodes that safely divert the voltage spikes generated when the motor coils are switched off[15] and thermal protection that shuts down the outputs if the chip overheats[16]. These features protect your Arduino and motors.\n4.3 Using a Motor Shield\nThere are several pre‑assembled motor shields based on the L293D. These shields plug directly on top of the Arduino and include connectors for motors, servos, and sensors. The shields typically use two L293D chips plus a shift register to expand the number of control lines[17]. They also break out power rails and servo connectors. Using a shield reduces wiring complexity; however, you can also build the circuit on a breadboard if you want to understand each connection.\nWhen using a motor shield, connect the external motor power supply (such as a 7.4 V Li‑Ion pack) to the shield’s motor power input. Do not power motors from the Arduino’s 5 V rail, or the voltage regulator will overheat. Always connect the grounds of the motor supply and the Arduino together so that the control signals have a common reference.\n4.4 Choosing Motors\nFor a mine‑exploration robot, torque is more important than speed. Choose geared DC motors with metal gearboxes or stepper motors that can deliver enough torque to carry the robot and sensors. Stepper motors require dedicated drivers such as DRV8825; DC motors are easier to drive with the L293D but may need a gearbox. The size of the wheels also matters: larger wheels provide greater ground clearance but require more torque. It’s a trade‑off you must evaluate.\n5. Sensors for Exploration\n5.1 Ultrasonic Distance Sensor (HC‑SR04)\nThe HC‑SR04 ultrasonic sensor measures distance by sending out a short burst of 40 kHz sound via its Trig pin and listening for the echo on its Echo pin. The travel time of the sound pulse is measured, and distance is computed using the relation:\ndistance = (speed_of_sound × time) / 2\nbecause the sound travels to the object and back[10]. At 20 °C the speed of sound is about 343 m/s, so the sensor can measure from 2 cm to 400 cm with roughly 0.3 cm resolution[18]. The module has four pins: VCC (5 V), Trig, Echo, and GND[19]. Its effectual beam angle is about 15°, which means it can detect objects within that narrow cone.\nTo scan the surroundings, you can mount the ultrasonic module on a small servo motor. By rotating the sensor and taking readings at different angles, the robot can build a rudimentary map of obstacles. This scanning method is used in many DIY robots, including an automated navigation robot where the sensor is attached to a servo on an L293D shield[20].\n5.2 Gas/Smoke Detection (MQ2 Sensor)\nThe MQ2 is a metal–oxide semiconductor gas sensor. Inside, there is a tin dioxide coating on a ceramic tube and a heating element; when the heater warms the sensing element, different gases can reduce the resistance of the coating. The sensor is sensitive to combustible gases such as LPG, propane, methane, hydrogen, smoke, and alcohol in the range of 200–10000 ppm[9]. However, the sensor cannot identify a specific gas; it simply indicates a change in concentration[21].\nThe MQ2 outputs both analog and digital signals depending on gas concentration[22]. There is typically an onboard comparator with an adjustable threshold; if gas concentration exceeds the threshold, the digital output goes high. The sensor includes a stainless steel mesh to prevent ignition of flammable gases and to filter out dust[23]. For accurate readings, the sensor must warm up for at least 5 minutes, and for calibration, a 24‑hour burn‑in at nominal conditions is recommended. Because the sensor draws about 150 mA for the heater (approximately 800 mW)[9], it should be powered from the motor battery via a regulator rather than the Arduino’s 5 V supply.\nUnderstanding gas sensors helps one think about chemical kinetics. The sensitivity arises from oxidation and reduction on the surface of the sensing element; by thinking like Feynman you can imagine molecules colliding with the heated tin dioxide and changing its resistance. The sensor does not “smell” gas in the human sense; it measures how easily electrons flow through the oxide.\n6. Building the Chassis\n6.1 Chassis Materials\nYou can fabricate the robot chassis from plywood, MDF (medium‑density fibreboard), acrylic, or 3D‑printed plastic. The design should support the four Mecanum wheels, the motors, and the electronics. Many hobbyists design two plates: a bottom plate for motors and wheels and a top plate for sensors and the battery. The ultrasonic sensor often sits on a small tower or bracket so it can rotate freely.\nThe mechanical assembly steps are:\n    1. Wheel Placement: Install the left‑handed (A) and right‑handed (B) wheels in the ABAB pattern. When you look at the wheels from the top, the rollers on the front wheels should angle toward the center of the robot[4]. The rear wheels should mirror this pattern. Orient the motors so that the left and right sides have the same orientation relative to the chassis; this simplifies wiring.\n    2. Motor Mounting: Secure the motors to the chassis using brackets or screw holes. Ensure the shafts align with the wheel hubs. Use thread‑locking compound so screws don’t loosen due to vibration.\n    3. Frame Assembly: Attach any standoffs to support the top plate. Create openings for wires, sensors, and the battery. Keep the center of mass low by placing heavy components (battery, motors) near the bottom.\n    4. Sensor Mounts: Mount the MQ2 gas sensor where airflow is unobstructed but away from the motors (to avoid interference from heat or oil). Mount the ultrasonic sensor on a servo bracket at the front of the robot. Optionally, include LED indicators or a small buzzer for alarms.\n6.2 Avoiding Mechanical Pitfalls\nMecanum wheels rely on friction between the rollers and the ground. If the surface is too smooth or dusty, the wheels may slip. In a mine environment, the floor may be uneven; consider using rubber‑coated rollers to improve traction. Keep the robot’s center of mass low to prevent tipping when strafing. In Feynman fashion, you can test your robot on different surfaces and note how friction affects motion; this will deepen your understanding of mechanics.\n7. Wiring and Circuit Assembly\n7.1 Power Distribution\n    • Motor Power: Connect the battery (e.g., two 18650 cells in series) to the motor driver’s supply input. Use a power switch to isolate the battery when not in use. Because the L293D can handle up to 36 V, 7.4 V is safe; do not exceed the motor’s rated voltage.\n    • Logic and Sensors: Use a buck converter to step the battery voltage down to 5 V. Supply the Arduino and sensors from this regulated 5 V. Ensure the grounds of the battery, the motor driver, the Arduino, and the sensors are connected together.\n7.2 Connecting the L293D\nIf you use a shield, follow the shield’s pin assignments. If building on a breadboard, wire the L293D as follows (see the datasheet for pin numbers):\n    • Pin 1 (Enable 1–2): Connect to Arduino digital pin (e.g., 9) and tie high (via Arduino) to enable channels 1 and 2.\n    • Pin 2 (Input 1): Connect to an Arduino digital pin controlling motor 1 direction.\n    • Pin 3 (Output 1): Connect to motor 1 terminal A.\n    • Pin 4/5 (Ground): Connect to ground.\n    • Pin 6 (Output 2): Connect to motor 1 terminal B.\n    • Pin 7 (Input 2): Connect to Arduino digital pin controlling motor 1 direction.\n    • Pin 8 (Motor VCC): Connect to battery positive (motor supply).\n    • Pins 9–11: Similarly for motor 2.\n    • Pin 16 (VCC1): Connect to 5 V from regulator (logic supply).\nRepeat for the second L293D if controlling four motors. Alternatively, use two L293D chips on a shield that already routes these pins.\n7.3 Wiring the Sensors\n    • MQ2 Gas Sensor: Connect VCC to 5 V, GND to ground, and the analog output (A0) to Arduino analog pin A0. Adjust the onboard potentiometer to set the digital output threshold; optionally use the digital output (DO) for simple detection.\n    • HC‑SR04 Ultrasonic Sensor: Connect VCC to 5 V, GND to ground, Trig to an Arduino digital pin (e.g., 11), and Echo to another digital pin (e.g., 12). If scanning with a servo, connect the servo signal wire to a PWM pin (e.g., 6) and provide power from the buck converter.\n    • LED Indicators: Connect each LED in series with a resistor (typically 220 Ω) from an Arduino digital pin to ground. Use them to show sensor status or battery level.\n7.4 Breadboard Layout\nPlace the L293D across the breadboard’s central ravine so that each pin sits on its own row; this isolates the two sides of the chip. Use the power rails for 5 V and ground; tie them together across the board if necessary[11]. To keep the wiring neat, group wires by function (motors, sensors, power) and label them. Feynman would recommend colour‑coding wires and drawing a schematic to visualise the circuit.\n8. Programming the Arduino\n8.1 Software Tools\nUse the Arduino IDE or PlatformIO to write and upload code. Ensure you have the Servo library (if using a servo) and any necessary motor driver libraries. The code will:\n    • Read joystick or command inputs (you can use Bluetooth or a wired joystick).\n    • Calculate each wheel’s desired speed using the control equations.\n    • Generate appropriate PWM signals for the motors.\n    • Read sensors (ultrasonic distance, gas concentration) and respond to hazards.\n8.2 Basic Motor Control\nThe simplest form of control uses digital pins to set direction and PWM pins to set speed. For each motor:\nint dirPinA = 2;    // Direction pin A\nint dirPinB = 3;    // Direction pin B\nint speedPin = 9;   // PWM pin\n\nvoid setup() {\n  pinMode(dirPinA, OUTPUT);\n  pinMode(dirPinB, OUTPUT);\n  pinMode(speedPin, OUTPUT);\n}\n\nvoid setMotor(int speed) {\n  if (speed >= 0) {\n    digitalWrite(dirPinA, HIGH);\n    digitalWrite(dirPinB, LOW);\n  } else {\n    digitalWrite(dirPinA, LOW);\n    digitalWrite(dirPinB, HIGH);\n    speed = -speed;\n  }\n  analogWrite(speedPin, constrain(speed, 0, 255));\n}\nThis function sets the direction pins based on the sign of the desired speed and uses PWM to control power.\n8.3 Implementing Mecanum Control\nAssume you have variables speed (forward/backward), strafe (left/right), and turn (rotation). The wheel speeds are computed as above[6]. Example:\nvoid driveMecanum(float speed, float strafe, float turn) {\n  float frontLeft  = speed + strafe - turn;\n  float frontRight = speed - strafe - turn;\n  float backLeft   = speed - strafe + turn;\n  float backRight  = speed + strafe + turn;\n  // Normalize values to within [-1,1]\n  float maxVal = max(max(abs(frontLeft), abs(frontRight)),\n                     max(abs(backLeft), abs(backRight)));\n  if (maxVal > 1.0) {\n    frontLeft  /= maxVal;\n    frontRight /= maxVal;\n    backLeft   /= maxVal;\n    backRight  /= maxVal;\n  }\n  setMotor1(frontLeft  * 255);\n  setMotor2(frontRight * 255);\n  setMotor3(backLeft   * 255);\n  setMotor4(backRight  * 255);\n}\nHere setMotorX() functions call the basic motor control; you might have them in an array for convenience. The normalisation ensures that if one wheel needs full power, the others scale accordingly.\n8.4 Reading the Ultrasonic Sensor\nTo read distance:\nlong readUltrasonicCM(int trigPin, int echoPin) {\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  long duration = pulseIn(echoPin, HIGH);\n  // Duration is in microseconds; convert to centimetres\n  float distanceCm = duration * 0.0343 / 2.0;\n  return distanceCm;\n}\nThis function triggers the sensor and measures the duration of the echo pulse. The constant 0.0343 is the speed of sound (in cm/μs) at 20 °C[10]. If scanning, rotate the servo in increments, call this function, and store the distances.\n8.5 Reading the MQ2 Gas Sensor\nFor analog reading:\nint gasValue = analogRead(A0); // Raw value (0–1023)\nBecause the MQ2’s response is nonlinear and depends on calibration, you can map the raw value to approximate ppm after calibrating with known gas concentrations. For simple detection, compare gasValue against a threshold. To use the digital output, simply read the DO pin (digitalRead); when high, gas concentration exceeds the set threshold.\n8.6 Simple Navigation Logic\nIn a mine, you might want the robot to:\n    1. Move forward until it detects an obstacle within, say, 30 cm.\n    2. Stop and scan left and right to find a clear path.\n    3. Avoid directions where the MQ2 indicates high gas concentration.\nPseudo‑code:\nvoid loop() {\n  float frontDistance = readUltrasonicCM(trigPin, echoPin);\n  int gas = analogRead(A0);\n  if (gas > gasThreshold) {\n    // Alarm: high gas level; stop and retreat\n    driveMecanum(-0.5, 0, 0); // reverse\n    delay(1000);\n    driveMecanum(0, 0, 0);\n    activateAlarmLED();\n  } else if (frontDistance < 30) {\n    // Obstacle ahead; scan\n    scanAngles();\n    chooseDirection(); // sets speed, strafe\n  } else {\n    // Move forward\n    driveMecanum(0.5, 0, 0);\n  }\n}\nThis logic is simplistic. More advanced navigation could use simultaneous localisation and mapping (SLAM), line following, or a map of the mine. The Feynman approach encourages understanding the underlying physics: by studying how sensor delays, noise, and mechanical inertia affect the control loop, you can improve the algorithm.\n9. Calibration and Testing\n9.1 Calibrating the MQ2 Sensor\nThe MQ2 sensor’s response depends on temperature, humidity, and the specific sensor unit. For accurate ppm readings, you must calibrate:\n    1. Burn‑in: Power the sensor for 24 hours in clean air to stabilise the sensor[22].\n    2. Set Baseline: After burn‑in, note the sensor’s analog reading in clean air; this is your baseline R0.\n    3. Generate a Curve: Expose the sensor to known concentrations of gas and note the analog readings. Use the formula from the datasheet to compute ppm from the resistance ratio Rs/R0.\n    4. Adjust Threshold: Decide on a threshold to trigger an alarm. In mines, methane or hydrogen sulphide may be dangerous at 50–100 ppm; calibrate accordingly.\nBecause the sensor can’t identify which gas is present[21], treat any significant increase as potential danger. Provide ventilation to avoid false positives from the robot’s own battery or solder fumes.\n9.2 Testing the Ultrasonic Sensor\nCheck the ultrasonic sensor in a quiet environment:\n    • Hold a flat object at various distances and verify the reading matches a tape measure.\n    • Test the beam angle by moving the object off to the side; note that the sensor has a 15° cone[24].\n    • When scanning, measure the time it takes to rotate the servo and take readings; ensure the scanning frequency is slower than the sensor’s measurement cycle to avoid overlapping pulses.\n9.3 Verifying Wheel Alignment and Motion\n    • Straight Motion: Command the robot to move forward. If it veers to one side, adjust the speeds or calibrate the motors.\n    • Strafing: Command the robot to move right. If the robot rotates instead, check that the wheels are in the correct ABAB pattern and that the control equations are implemented properly.\n    • Rotation: Command the robot to turn in place; ensure the rotation is smooth and the robot doesn’t drift.\nDuring testing, keep the robot off the ground on a stand to observe wheel rotations without friction. Use a tachometer to verify each motor’s speed and adjust the PWM scaling accordingly.\n9.4 Environmental Considerations\nMines may be humid, dusty, and dark. Protect the electronics with enclosures and use desiccants to absorb moisture. Use a sealed but ventilated case for the MQ2 sensor so it can sense gas without being exposed to debris. Consider adding a headlight (LED strip) and a camera for remote observation.\n10. Enhancing the System\n10.1 Remote Control and Telemetry\nConnecting a Bluetooth module (HC‑05) or an RF transceiver allows you to control the robot from a safe distance. You can send joystick commands or autonomous navigation commands. Telemetry can include gas concentration, distance readings, battery voltage, and position. For longer range, consider LoRa modules or Wi‑Fi, but ensure your communications are reliable underground.\n10.2 Mapping and Autonomy\nFor advanced projects, integrate sensors such as lidar, inertial measurement units (IMUs), or wheel encoders to build a map of the environment. Use algorithms such as A* for path planning and Kalman filters for sensor fusion. Combining odometry from the Mecanum wheels with ultrasonic scanning can provide approximate localisation. Libraries like ROS (Robot Operating System) can help you implement SLAM.\n10.3 Safety Features\nAdd a flame sensor or temperature sensor to detect fires. Use a buzzer to alert when gas levels exceed thresholds. Implement automatic shutoff if the motors overheat; the L293D includes thermal protection[16], but you can also monitor motor temperature with thermistors. For extra caution, include a smoke alarm that triggers when the MQ2 detects high concentrations for a sustained period.\n10.4 Data Logging\nStore sensor data on an SD card for later analysis. Data logs can reveal patterns in gas concentration and help identify hazardous areas. Use Feynman’s method of analysing data to deduce relationships and test hypotheses about the environment. For example, you might notice that gas levels spike near certain features, indicating leaks.\n11. Reflecting on the Learning Process\nBuilding a Mecanum‑wheel robot is not just about assembling parts; it’s an exercise in understanding mechanical vectors, electronic circuits, and computer control. Richard Feynman once said, “What I cannot create, I do not understand.” By constructing this robot, you create an artefact that embodies physics and engineering principles. As you watch the robot strafe sideways, think about the diagonal forces produced by the rollers. When calibrating the gas sensor, think about molecules colliding with a hot oxide surface. When writing code, think about how the digital world interacts with the analogue world via PWM pulses and sensor readings.\n12. Conclusion\nIn this report you learned how to build an omnidirectional car with Mecanum wheels, an Arduino microcontroller, and sensors for mine exploration. You learned the physics behind Mecanum wheels, the necessity of motor drivers, the operation of ultrasonic and gas sensors, and how to integrate these components into a functioning robot. The approach emphasised understanding each part, encouraging you to think beyond definitions and to tinker. As you continue to refine your robot—adding autonomy, improving sensors, or adapting it to new environments—remember Feynman’s joy of discovery. The universe of robotics is wide open; step into it and explore.\n\nReferences\n    1. L293D Motor Driver: Motors require more current than Arduino pins can supply; the L293D shield uses two H‑bridge circuits and a shift register to drive DC motors[17]. Each H‑bridge allows reversing motor direction[13], handles voltages from 4.5–36 V and currents up to 600 mA[14], includes flyback diodes to dissipate inductive spikes[15], and has thermal protection[16].\n    2. Breadboard Structure: Breadboards have connected strips of five holes; the central ravine separates the two halves so DIP ICs can straddle it[12]. Power rails on the sides provide convenient voltage distribution but must be linked across the board[11]. Breadboards are ideal for prototyping because they require no soldering[8].\n    3. Mecanum Wheel Theory: Mecanum wheels have rollers at 45°; by controlling each wheel’s speed and direction the vehicle can move forward, sideways, diagonally, or rotate[1][2]. The ABAB arrangement of left‑ and right‑handed wheels is necessary for omnidirectional motion[3][4]. Control equations combine forward speed, strafe, and rotation to compute wheel speeds[6].\n    4. Sensor Operation: The HC‑SR04 ultrasonic sensor measures distance by timing the echo of a 40 kHz pulse; distance is calculated as (speed of sound × time)/2[10]. It measures 2–400 cm with 0.3 cm resolution[18] and has a four‑pin interface[19]. The MQ2 sensor detects combustible gases over 200–10000 ppm[9]; it cannot distinguish gas types[21] and uses a heated tin dioxide element covered by a stainless steel mesh for safety[23]; it outputs analog and digital signals depending on gas concentration[22].\n    5. Project Examples: Many DIY robots use Mecanum wheels and sensors; for example, an Instructables project uses an L293D shield and HC‑SR04 sensor, explaining the shield’s design[17], the ultrasonic distance calculation[25], and the structure of the 3D‑printed chassis[26]. Another project integrates the MQ2 gas sensor, DHT11 humidity sensor, and HC‑SR04 on a servo to scan obstacles[20]. Understanding these examples helps you adapt ideas to your own build.\n\n[1] Mecanum wheel - Wikipedia\nhttps://en.wikipedia.org/wiki/Mecanum_wheel\n[2] [3] 3. Mecanum Wheel Robot Basic Lesson — TurboPi Advanced v1.0 documentation\nhttps://docs.hiwonder.com/projects/TurboPi/en/advanced/docs/3.mecanum_wheel_control.html\n[4] [5] Arduino Mecanum Wheels Robot - How To Mechatronics\nhttps://howtomechatronics.com/projects/arduino-mecanum-wheels-robot/\n[6] How to Make Mecanum Wheel Robot and Program It Correctly : 8 Steps (with Pictures) - Instructables\nhttps://www.instructables.com/How-to-Make-Mecanum-Wheel-Robot-and-Program-It-Cor/\n[7] [13] [14] [15] [16] In-Depth: Control DC Motors with L293D Motor Driver IC & Arduino\nhttps://lastminuteengineers.com/l293d-dc-motor-arduino-tutorial/\n[8] [11] [12] How to Use a Breadboard - SparkFun Learn\nhttps://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all\n[9] [21] [22] [23] In-Depth: How MQ2 Gas/Smoke Sensor Works? & Interface it with Arduino\nhttps://lastminuteengineers.com/mq2-gas-senser-arduino-tutorial/\n[10] [18] [19] [24] Complete Guide for Ultrasonic Sensor HC-SR04 with Arduino | Random Nerd Tutorials\nhttps://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/\n[17] [25] [26] Omnidirectional Car With Obstacle Detection : 5 Steps - Instructables\nhttps://www.instructables.com/Omnidirectional-Car-With-Obstacle-Detection/\n[20] Automated Navigation Robot With Gas (MQ-2), Temperature & Humidity (DHT11) Sensors : 12 Steps (with Pictures) - Instructables\nhttps://www.instructables.com/Automated-Navigation-Robot-With-Gas-Temperature-Hu/",
    "uploadDate": "2023-06-28 11:29",
    "readTime": "23 min read",
    "fileName": "Assembling a car with omnidireccional wheels and an arduino and why it's a bad idea do it in Peru.md",
    "featured": true
  },
  {
    "id": "114",
    "title": "Creating Slow Motion (How Is That Possible) Videos With Twixtor And Sony Vegas",
    "excerpt": "Did you see those videos on slow motion? How they are possible?",
    "content": "---\n​tags:\n  - action\nauthor: Jorge\ndate: 2020-10-29 10:28\nmodified: 2025-10-29 10:49\n---\nDid you see those videos on slow motion? How they are possible?\n\nSo is clear that there are two main options or well you have a camera with 20000 FPS and that's it or well you record with your sad phone and use another techniques (Pirate Twixtor).\n\nBut how that works?\n\n\n# Now The Problem\n\nHave you ever shot something at **24 fps** or **30 fps** and later wished you had that buttery, dreamy slow‑motion look? If you just duplicate frames or let your editing software blend them, you’ll see jittery jumps or smeared motion. That happens because there simply aren’t enough pictures per second. To slow time gracefully you need to **invent** new pictures between the real ones.\n\nReal‑world footage isn’t ideal though. **Motion blur** from long shutter speeds hides detail, **occlusions** (where one object moves in front of another) confuse the software, and **rolling‑shutter cameras** or heavy **compression** can distort motion. And if your clip was shot at 24 fps and you want to play it back at 96 fps, you’re asking the software to create three brand‑new frames between every pair of originals! The key is to generate plausible “in‑betweens,” not just hold or fade frames.\n\n**What to remember:** _Slow motion looks smooth only when you synthesize new frames instead of repeating existing ones._\n\n# The Core Idea (In Plain English)\n\nTools like **Twixtor** look at how every pixel in one frame moves to the next. They build a little “map” of motion for each pixel, then **shift** the first frame forward in time and **shift** the second frame backward. After that, they **blend** the two warped frames and fill in any gaps where something gets revealed or disappears. RE:Vision Effects describes Twixtor as using proprietary tracking to calculate motion for each pixel so it can **warp and interpolate frames** of the original sequence[[1]](https://revisionfx.com/products/twixtor/#:~:text=In%20order%20to%20achieve%20unparalleled,frames%20of%20the%20original%20sequence).\n\nHere’s the general recipe no matter what algorithm is used:\n\n1. **Track the motion** – figure out where each pixel is going.\n    \n2. **Warp the frames** – move the earlier frame forward a bit and the later frame backward a bit.\n    \n3. **Blend them** – mix the two warped images depending on how far you are between them.\n    \n4. **Fix holes** – fill in parts that were hidden in one frame but visible in the other.\n    \n\nSome methods estimate motion directly (like optical‑flow, used in Twixtor). Others (called **phase‑based methods**) look at how the “phase” of the image changes and modify that, skipping motion estimation[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor). Newer AI‑driven tools learn to guess what happens between frames. Regardless of the underlying tech, the process is **track → warp → blend → patch**.\n\n**What to remember:** _You’re not just slowing the video; you’re asking the software to imagine what happens between two moments._\n\n# Minimal Intuition (Just Enough Math)\n\nIf you like a tiny bit of math, here’s an easy way to picture it. A pixel at position **x** in frame 1 moves at some velocity **v** to its location in frame 2. We assume **it looks roughly the same along its path**, which you might see written as:\n\nI(x, t) ≈ I(x + v⋅Δt, t + Δt)\n\nwhere **I(x,t)** is the color of a pixel. Once you know **v**, making a halfway frame means shifting frame 0 half a step forward and frame 1 half a step backward, then mixing them. The maths hide all the complexity; in practice the software just tries to keep things looking consistent.\n\nPhase‑based methods skip estimating **v** and instead adjust the **phase** of frequency components to make them look “between”[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor). That’s why they can work faster and sometimes fail more gracefully when the motion is messy[[3]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=yield%20smoother%20transitions%20between%20the,suited%20for%20frame%20interpolation%20and).\n\n**What to remember:** _Motion estimation is an educated guess; errors show up as ghosts or wobbles._\n\n# Sony Vegas + Twixtor: Quick Start (Do This First)\n\nWant to jump straight in? Follow these steps in **Vegas Pro** to get surprisingly smooth slow motion.\n\n1. **Install Twixtor** – Grab the OFX version of Twixtor, run the installer, and restart Vegas so the plug‑in appears in your Video FX list.\n    \n2. **Match your project to your goal** – In Vegas, set the **Project Properties** to the frame rate you want out (e.g., 96 fps for 4× slow motion). Twixtor reads this project frame rate for its output[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized).\n    \n3. **Prepare your clip** – Use the cleanest footage you can. The _Plug‑in to After Effects_ guide recommends shooting with very fast shutters (1/240 s if possible) to minimise blur[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur). Right‑click your clip in the timeline and choose **Switches → Disable Resample** so Vegas doesn’t blend frames behind Twixtor’s back.\n    \n4. **Apply Twixtor** – Select the clip (event), click **Event FX**, and add **Twixtor**. You’ll see Twixtor’s controls.\n    \n5. **Tell Twixtor about your footage** – Under **Source Control**, set **Input: Frame Rate** to your original frame rate (24.000, 29.97, etc.)[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized). Leave **Input: Fields** at **None** for progressive footage.\n    \n6. **Choose how to slow**:\n    \n7. **Speed (%)** – Enter a number like **25 %** to stretch time fourfold. Twixtor lengthens the clip for you.\n    \n8. **Frame Rate** – Instead of a percentage, you can tell Twixtor to output, say, **96 fps**. This keeps the clip’s length but adds frames so you can slow it later with Vegas’s velocity envelope. **Don’t set both values at once.**\n    \n9. **Tune motion settings**:\n    \n10. **Motion Sensitivity** – Think of this as how keen Twixtor is to follow motion. The default (~70) works in many cases; some editors lower it to 20 for smoother results[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good). Raise the value for subtle movement, lower it if noise is causing jitters.\n    \n11. **Track Quality** – Use **Medium** while previewing; switch to **Best** when you render.\n    \n12. **Motion Blur Compensation** – Leave it off for analysis; set it around 2–3 for a bit of natural blur in your final slow motion[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).\n    \n13. **Image Prep** – If your footage is noisy, enable a bit of denoise so Twixtor doesn’t chase grain[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).\n    \n14. **Preview & adjust** – Play the clip at a lower quality to check for ghosts or wobbles. Tweak Motion Sensitivity or reduce the slow‑down factor if needed.\n    \n15. **Render high quality** – For your final export, set Vegas to **Best/Full** quality and use a high‑quality codec (ProRes, DNxHR). Avoid heavy compression until the last step.\n    \n\n**What to remember:** _Set the correct input rate, pick_ _Speed_ _or_ _Frame Rate, and don’t forget to disable Vegas’s resampling._\n\n# Vegas Workflow Variations (When You Need Control)\n\n- **Velocity envelope + Twixtor** – Vegas has a Velocity Envelope for speed changes. If you use it with Twixtor, set Twixtor to **Frame Rate mode** and leave the velocity envelope at 100 %. Alternatively, let Twixtor handle all the speed changes by animating its **Speed (%)** parameter.\n    \n- **Smooth ramps** – You can keyframe Twixtor’s speed: 100 % → 25 % → 100 % to ease into slow motion and out again. This creates nice ramps without the complexity of Vegas’s envelope.\n    \n- **Per‑shot settings** – Apply Twixtor individually to each event. Copy/paste event attributes to maintain consistency but adjust settings per shot if they need different speeds.\n    \n\n**What to remember:** _Don’t double‑retime – pick either Vegas’s tools or Twixtor to control speed._\n\n# Settings Cheatsheet (Start Here, Then Tweak)\n\n  \n|Setting|Friendly starting point|Why & when to change|\n|---|---|---|\n|**Motion Sensitivity**|70–80|Default is OK for most clips. Lower it if Twixtor locks onto noise; some editors like ~20 for extra smoothness[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).|\n|**Track Quality**|Medium while working; Best when exporting|Higher quality improves the motion estimate but slows down rendering[[8]](https://beverlyboy.com/filmmaking/how-does-twixtor-work/#:~:text=Getting%20the%20most%20out%20of,settings%20that%20increase%20motion%20sensitivity).|\n|**Image Prep/Filtering**|Mild denoise|Clean footage gives optical flow more data[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).|\n|**Motion Blur Compensation**|Off for previews; 2–3 for final render|Adds a natural blur over interpolated frames[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).|\n|**Input: Frame Rate**|Exact frame rate of your footage|Twixtor needs this to know how far apart the originals are[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized).|\n\n**What to remember:** _Start with defaults, adjust gradually, and trust your eyes._\n\n# Troubleshooting Artifacts (Spot & Fix)\n\n  \n|What you see|Likely cause|How to tackle it|\n|---|---|---|\n|**Ghosting/double edges**|Twixtor’s motion guesses disagree|Increase **Track Quality**, reduce the slow‑down (e.g., use 33 % instead of 25 %), stabilize the shot, or mask problem areas.|\n|**Tearing at occlusion edges**|Something passes in front of something else|Turn on occlusion detection and, if necessary, mask foreground and background separately.|\n|**Rubbery wobble**|Twixtor is confused by textures or noise|Lower **Motion Sensitivity**, denoise or deflicker the footage, or blur the clip slightly before applying Twixtor.|\n|**Shimmer in hair/grass**|Fine detail is hard to track|Apply a subtle blur (1–2 pixels) before Twixtor and sharpen afterwards; reduce the slow‑down factor.|\n\n**What to remember:** _Most problems come from tricky input—clean and stabilize your source._\n\n# Shoot So Interpolation Wins (Small but Mighty)\n\nA little planning during shooting makes frame interpolation shine:\n\n- **Fast shutters = crisp frames.** A shutter of **1/240 s** or faster almost eliminates blur and gives Twixtor clean edges to track[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur).\n    \n- **Plenty of light and low ISO.** More light allows fast shutters and keeps noise down. Clean footage is essential[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).\n    \n- **Stable camera.** Lock down your camera or use good stabilization. Rolling‑shutter pans and handheld jitters create warped motion fields.\n    \n- **Simple scenes.** Avoid busy backgrounds and crossing objects. When characters move in front of each other, occlusion makes interpolation harder.\n    \n- **Use the highest frame rate you can.** Even if it’s just 60 fps, Twixtor can slow it further with fewer artifacts.\n    \n\n**What to remember:** _Great slow motion is born at the shoot – crisp, bright, stable footage makes life easier._\n\n# Quick “Why This Counts as Slow Motion”\n\nWhen you stretch a 24 fps clip to 96 fps using Twixtor, you’re not just pausing frames; you’re **filling in the gaps**. Optical‑flow tools like Twixtor examine how pixels move and create plausible intermediate frames so motion appears continuous[[1]](https://revisionfx.com/products/twixtor/#:~:text=In%20order%20to%20achieve%20unparalleled,frames%20of%20the%20original%20sequence). That’s why the result feels smooth and not like a flipbook. Just remember that when motion is extreme or details are hidden, the software has to guess, so it might hallucinate.\n\n**What to remember:** _You’re densifying time—not freezing it._\n\n# Science & Practical Uses (Beyond Edits)\n\nFrame interpolation isn’t just for flashy edits. It has real‑world uses:\n\n- **Sports and biomechanics:** Coaches use slow motion to study athletes’ movements. Smooth slow‑mo makes it easier to see precise joint angles.\n    \n- **Event analysis:** Engineers reviewing accidents or machinery failures can slow down footage that wasn’t shot in high frame rates to better see what happened.\n    \n- **Multi‑camera sync:** When cameras with different frame rates need to be matched, generating extra frames helps align them.\n    \n- **Machine‑learning datasets:** Researchers use interpolated frames as extra training examples for AI models.\n    \n- **Virtual views:** Phase‑based methods can generate novel in‑between views for special effects[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor).\n    \n\nAlways be honest about using interpolated frames if precision is required; don’t measure distances or speeds on made‑up data.\n\n**What to remember:** _Interpolation is a useful tool beyond editing—just be transparent when accuracy matters._\n\n# Tiny Hands‑On Check (2 minutes)\n\nCurious what difference interpolation makes? Try this quick test:\n\n1. **Duplicate a short clip** (3–5 seconds) in Vegas so you have two identical tracks.\n    \n2. **Track A:** Add Twixtor, set **Speed** to 25 %, and disable Vegas’s resample.\n    \n3. **Track B:** Just slow the clip with the normal time‑stretch tool (hold Ctrl and drag), leaving Vegas to duplicate frames.\n    \n4. **Play back** at half speed and step through a few frames. On Track A you’ll see smooth movement; on Track B you’ll see jumps. Notice hair, hands, and background edges.\n    \n5. **Adjust and compare** – try raising Motion Sensitivity or reducing the slow‑down to fix any issues.\n    \n\n# 5‑Bullet Checklist: Will My Clip Interpolate Well?\n\n1. **Is it crisp and bright?** Fast shutters (around 1/240 s) and good lighting minimise blur and noise[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur)[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).\n    \n2. **Is the camera steady?** Locked‑off or well‑stabilised shots produce cleaner slow motion. Rolling‑shutter pan = bad.\n    \n3. **Are there few occlusions?** Scenes where people or objects pass in front of each other are harder to interpolate.\n    \n4. **Is the footage clean?** Less noise and lower compression give the motion‑estimator more information[[7]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=The%20more%20data%20your%20video,motion%20effect).\n    \n5. **Is the motion moderate?** If someone is waving their hair or water is splashing everywhere, be prepared for artifacts. Higher native frame rates help.\n    \n\n## References & Further Learning\n\n- **Twixtor product page** – Explanation of how Twixtor warps and interpolates frames[[1]](https://revisionfx.com/products/twixtor/#:~:text=In%20order%20to%20achieve%20unparalleled,frames%20of%20the%20original%20sequence).\n    \n- **How does Twixtor work?** – A plain‑language article describing Twixtor’s motion estimation and settings[[9]](https://beverlyboy.com/filmmaking/how-does-twixtor-work/#:~:text=WHAT%20IS%20TWIXTOR%20AND%20HOW,IT%20ENABLE%20FRAME%20RATE%20CONVERSION)[[10]](https://beverlyboy.com/filmmaking/how-does-twixtor-work/#:~:text=Key%20parameters%20to%20monitor%20include,unique%20demands%20of%20each%20project).\n    \n- **Optical flow vs. frame blending (Boris FX blog)** – Why optical flow looks better and how extra data helps[[11]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=will%20look%20at%20the%20whole,create%20new%20frames%20in%20between)[[12]](https://borisfx.com/blog/optical-flow-vs-frame-blending-main-difference/#:~:text=Optical%20flow%2C%20on%20the%20other,it%20can%20distort%20the%20image).\n    \n- **Plug‑in to After Effects** – Tips on shooting with fast shutters and tuning Motion Sensitivity[[5]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=%C2%ADproduction%20and%20postproduction%3A%201,It%20can%20blur)[[6]](https://epdf.pub/plug-in-to-after-effects-third-party-plug-in-mastery.html#:~:text=connect,and%203%20was%20a%20good).\n    \n- **Phase‑Based Frame Interpolation for Video** – A research paper explaining phase‑based alternatives[[2]](https://openaccess.thecvf.com/content_cvpr_2015/papers/Meyer_Phase-Based_Frame_Interpolation_2015_CVPR_paper.pdf#:~:text=Standard%20approaches%20to%20computing%20interpolated,any%20form%20of%20explicit%20cor).\n    \n- **RE:Vision help article** – Shows that Twixtor uses the composition’s frame rate as output and needs the correct input rate[[4]](https://help.revisionfx.com/resource/71/#:~:text=Apply%20Twixtor,into%20a%2050fps%20PAL%20sized).\n\n_What to remember:_ Learning how to use frame interpolation is like learning a craft: start simple, observe, and tweak. With clean footage and a bit of practice, you can turn ordinary clips into silky slow‑motion stories.",
    "uploadDate": "2020-10-29 10:28",
    "readTime": "14 min read",
    "fileName": "Creating Slow Motion (How is that possible) Videos with Twixtor and Sony Vegas.md",
    "featured": true
  },
  {
    "id": "115",
    "title": "Building A PC From Scratch Ryzen Nvidia With Low Resources",
    "excerpt": "So like my laptop die with the Sony Vegas we need a fancy hardware this is how I do it. (A shame)",
    "content": "---\ntags:\n  - baby\nauthor: Jorge\ndate: 2020-07-25 11:29\nmodified: 2025-10-25 11:24\n---\nSo like my laptop die with the Sony Vegas we need a fancy hardware this is how I do it. (A shame)\n\n\nBuilding a personal computer is more than assembling a kit of parts; it’s an exercise in understanding how disparate hardware elements work together to create a working system. Richard Feynman loved to start from first principles and ask, why does this work the way it does? As you assemble your PC, take his curiosity to heart: every component you touch has a specific role, and the joy of building a PC comes from watching those roles combine into a functional whole. This report provides a step‑by‑step guide for building a desktop computer using an AMD Ryzen 3×1000 processor, an Nvidia GT 730 graphics card, an M.2 NVMe solid‑state drive, and 8 GB of DDR4 RAM. It also explains the function of each major component and offers practical advice to ensure a successful build.\nEssential Components\nEvery PC consists of a core set of components. While parts can vary in performance, form factor and vendor, their fundamental functions remain the same. The table below summarizes the key components we will use and their purposes.\nComponent\tFunction (keyword/phrase)\tNotes\nCPU (Ryzen 3×1000)\t“brain” of the system[1]\tExecutes instructions; performance measured in GHz[2]\nMotherboard\tMain circuit board[3]\tHosts CPU, RAM, GPU and connectors; determines compatibility\nRAM (8 GB DDR4)\tShort‑term memory[4]\tVolatile; more RAM enables more simultaneous tasks[5]\nStorage (NVMe SSD)\tLong‑term data storage[6]\tNVMe uses PCIe for high throughput[7] and low latency\nGPU (GT 730)\tHandles graphics output[8]\tOffloads rendering from CPU, improving visual performance\nPower Supply Unit (PSU)\tConverts AC to DC power[9]\tFeeds motherboard, CPU, GPU and drives\nCase\tPhysical enclosure\tProvides airflow and mounting points\nCooling System\tTransfers heat away from components\tIncludes CPU cooler and case fans\nPeripherals\tKeyboard, mouse, monitor\tRequired for input/output\nCPU: the central processing unit\nThe processor is often called the brain of the computer[1]. Whenever you press a key or open a program, you are issuing instructions that the CPU executes. Modern CPUs, like the AMD Ryzen 3×1000, contain billions of transistors packed into a tiny silicon wafer. They operate at clock speeds measured in gigahertz (billions of cycles per second)[2]. The CPU fits into a socket on the motherboard and is covered by a heat sink, which dissipates heat generated by rapid switching of transistors[10].\nRyzen processors use AMD’s AM4 or newer AM5 socket depending on the model. Always verify that your motherboard supports your specific CPU. In our build, the Ryzen 3×1000 is an entry‑level quad‑core processor suitable for general productivity and light gaming. Its efficiency pairs well with the GT 730 GPU and helps keep power consumption low.\nMotherboard: the platform that connects everything\nA motherboard is a thin plate that holds the CPU, memory, connectors for drives and expansion cards, and ports for external devices[3]. It acts as a central nervous system, providing electrical connections and communication pathways between components. When selecting a motherboard, match the CPU socket (AM4 for many Ryzen processors), memory type (DDR4 in our case), and form factor (ATX, micro‑ATX, or mini‑ITX). The board also provides slots for expansion cards like the GT 730 and connectors for M.2 NVMe drives.\nRAM: short‑term memory (DDR4)\nRandom access memory (RAM) is short‑term memory[4]. When you open an application, data and instructions are temporarily stored in RAM so the CPU can access them quickly. Unlike storage devices, RAM loses its data when the power is off. The more RAM you have, the more tasks your computer can handle simultaneously[5]. DDR4 is the fourth generation of double‑data‑rate synchronous dynamic RAM. Compared with DDR3, DDR4 offers higher transfer rates and lower operating voltage (1.2 V vs. 1.5 V)[11], enabling faster and more power‑efficient operation. DDR4 DIMMs use 288 pins instead of DDR3’s 240 pins[12], making them incompatible with older boards. Our build uses 8 GB of DDR4, which is adequate for basic tasks but may feel limiting for memory‑intensive workloads; an upgrade to 16 GB would improve multitasking.\nStorage: NVMe solid‑state drive\nPermanent storage holds your operating system, applications and files. Traditional hard drives rely on spinning magnetic platters, but modern PCs benefit from solid‑state drives (SSDs) that store data on flash memory. Non‑Volatile Memory Express (NVMe) is a host controller interface designed specifically for SSDs; it runs over the PCIe bus[7]. An NVMe drive plugs directly into an M.2 slot on the motherboard and offers significantly higher throughput and lower latency compared with SATA‑based SSDs. NVMe supports multiple queues and can handle up to 64 000 command queues with 64 000 commands each[13], enabling parallel processing and reducing latency.\nIn our build, the NVMe drive will house the operating system and software. NVMe drives can provide several gigabytes per second of sequential read/write performance[14]. When preparing your PC, ensure your motherboard has an M.2 slot that supports NVMe; some boards support only SATA in certain slots.\nGPU: graphics processing unit (GT 730)\nWhile the CPU can render graphics, a dedicated graphics processing unit (GPU) accelerates rendering and frees the CPU for other tasks. A video card is responsible for what you see on the monitor[8]. The GT 730 is an entry‑level Nvidia GPU. Though not powerful by modern gaming standards, it handles basic 2D/3D tasks and light gaming. Installing the GT 730 in a PCIe x16 slot allows the PC to output video via HDMI or DVI. For more demanding games or computational workloads, upgrading to a modern GPU would drastically improve performance.\nPower supply unit (PSU)\nThe power supply unit converts AC power from the wall into regulated DC voltages[9]. It then distributes power to the motherboard, CPU, GPU, storage and peripherals. Choose a PSU with enough wattage to handle your components (a 450–550 W unit suffices for this build) and look for an 80 Plus certification for efficiency. Modular PSUs allow you to connect only the cables you need, reducing clutter.\nCase and cooling\nThe case holds all components, provides structural support and channels airflow to remove heat. Cases come in various sizes: ATX mid‑tower cases accommodate full‑size boards and offer good airflow, while micro‑ATX or mini‑ITX cases are more compact. A CPU cooler sits atop the CPU to transfer heat away. Stock coolers included with some CPUs are adequate for non‑overclocked systems. Aftermarket air or liquid coolers reduce temperatures and noise, but may require additional space.\nAdditional components\n    • Peripherals: Monitor, keyboard, mouse, speakers or headphones. Without these, you cannot interact with your machine.\n    • Operating system (OS): Windows, Linux or another OS must be installed after assembly. The OS manages hardware and provides a platform for software.\n    • Drivers: After installation, you will need to install drivers for the motherboard, graphics card and other devices to ensure optimal performance.\nPreparation: Tools and Workspace\nBefore beginning, gather tools and create a safe workspace:\n    1. Clear desk or table: Provide enough space to lay out components and the case.\n    2. Phillips‑head screwdriver: Most screws in a PC build require a #2 Phillips screwdriver[15].\n    3. Anti‑static precautions: Ground yourself by touching a metal part of the case or wear an anti‑static wrist strap[16]. Static discharge can damage sensitive electronics.\n    4. Thermal paste: Some CPU coolers come with pre‑applied paste; otherwise, a pea‑sized dot of thermal compound is necessary for heat transfer between the CPU and cooler.\n    5. Lighting: Good lighting helps avoid mistakes; a headlamp or desk lamp is useful for illuminating the inside of the case.\nPlan your build like a Feynman diagram: identify each piece and its interactions, then assemble them step by step. Pre‑read the motherboard manual; it contains crucial information about CPU socket type, RAM slots and front‑panel connectors.\nStep‑by‑Step Assembly\nThe assembly steps below follow the general process recommended by Ibertronica’s step‑by‑step guide[17] and incorporate best practices for handling AMD CPUs and NVMe drives.\n1. Install the power supply\n    1. Open your case and locate the PSU mount. Modern cases often mount the power supply at the bottom. Orient the PSU so its fan faces downward if there is a bottom vent[18].\n    2. Slide the PSU into the case and align its screw holes with the case bracket. Secure it with the provided screws.\n    3. If the PSU is modular, connect only the cables you will need (24‑pin ATX, 8‑pin CPU power, PCIe power cables for GPU, SATA/Molex for drives).\n2. Prepare the motherboard\n    1. Place the motherboard on its anti‑static bag or a clean surface.\n    2. Install the CPU:\n    3. Release the CPU socket lever. With AMD’s AM4 socket, lift the lever to open the retention mechanism.\n    4. Align the triangle marker on the corner of the CPU with the triangle on the socket[19]. Gently lower the CPU into place; it should drop in without force. Close the retention arm.\n    5. Apply thermal paste and mount the cooler: If your cooler lacks pre‑applied paste, place a small amount (about a grain of rice) in the center of the CPU. Install the cooler following its instructions; for air coolers, tighten the screws evenly to maintain contact[20].\n    6. Install RAM: Open the RAM slot latches. Hold the DDR4 module by its edges, align its notch with the slot key, and press down firmly until both latches click[21]. Use the slots recommended by your motherboard manual for single or dual‑channel operation.\n    7. Install NVMe drive: Locate the M.2 slot. Remove the mounting screw, slide the NVMe SSD into the slot at a slight angle, then push it down and secure it with the screw. Ensure the drive is recognized as NVMe rather than SATA.\n3. Mount the motherboard in the case\n    1. Install the I/O shield: Snap the I/O shield (the rectangular metal plate that covers the motherboard’s rear ports) into the case opening[22].\n    2. Align the motherboard with the standoffs inside the case. Ensure that none of the standoffs touch the board where there is no hole. Secure the board with screws. Avoid over‑tightening, which could crack the board.\n4. Install the graphics card\n    1. Remove the necessary PCIe slot covers on the case. The GT 730 uses a full‑height bracket, so remove one or two slots depending on the card’s thickness.\n    2. Insert the card into the PCIe x16 slot; push until it clicks and the retention tab locks[23].\n    3. Secure the card to the case with screws. Connect any required PCIe power cables (GT 730 often does not need extra power, but high‑end cards do).\n5. Install remaining storage (if applicable)\nIf you have additional SATA SSDs or hard drives:\n    1. Mount the drive in the appropriate bay or sled.\n    2. Connect a SATA data cable to the motherboard and a SATA power cable from the PSU[24].\n6. Connect cables and manage them\n    1. Motherboard power: Connect the 24‑pin ATX cable to the motherboard, ensuring it clicks into place. Connect the 8‑pin (or 4‑pin) CPU power cable.\n    2. Front‑panel connectors: Attach the front‑panel (power button, reset, HDD LED) connectors to the header pins. Refer to the motherboard manual for pin layout.\n    3. Fan and USB connectors: Connect case fans to fan headers, and front USB/audio connectors to the appropriate headers.\n    4. Cable management: Route cables behind the motherboard tray and secure them with zip ties[25]. Good cable management improves airflow and reduces clutter.\n7. First boot and BIOS configuration\n    1. Double‑check that all components and cables are properly connected[26].\n    2. Connect your monitor, keyboard and mouse. Plug the power cord into the PSU.\n    3. Turn on the power supply and press the case’s power button. If everything is wired correctly, the system should power on and display the BIOS/UEFI screen[27].\n    4. In the BIOS, configure your memory speed (enable XMP/DOCP for DDR4), confirm that the NVMe drive is detected, and set the boot order.\n8. Install the operating system\n    1. Insert a bootable USB drive containing your OS (e.g., Windows 10/11, Ubuntu Linux). In BIOS, set the USB drive as the first boot device.\n    2. Save changes and reboot. Follow the OS installer’s prompts to format the NVMe drive and install the operating system[28].\n9. Install drivers and updates\nOnce the OS is installed:\n    1. Install the motherboard chipset drivers, network and audio drivers. These are often found on the manufacturer’s website.\n    2. Install the graphics driver from Nvidia for the GT 730. Without the correct driver, the GPU may run in a low‑performance mode.\n    3. Apply operating system updates and reboot when necessary.\nBeyond Assembly: Understanding the Design\nA Feynman‑style exploration does not end with assembly. Here are some deeper questions to consider:\n    • How does data travel inside the PC? On the motherboard, the CPU communicates with RAM via memory buses and caches. NVMe drives use the high‑speed PCIe bus to bypass traditional SATA controllers[7]. GPUs use PCIe x16 lanes to transfer frame data from the CPU and memory. Asking where each electron flows can reveal bottlenecks and opportunities for improvement.\n    • Why is RAM volatile? RAM uses capacitors that hold electrical charges. These charges leak over time and must be refreshed thousands of times per second. Turning off the power removes the refreshing mechanism, causing data loss[29].\n    • What limits DDR4 speed? DDR4 memory improves transfer rates and reduces voltage compared with DDR3[11], but signal integrity, motherboard traces and memory controller design limit the achievable frequencies. Overclocking can push DDR4 to higher speeds but increases power consumption and heat.\n    • Why is NVMe faster than SATA? SATA is limited by the Advanced Host Controller Interface (AHCI) protocol, which was designed for spinning hard drives and supports a single command queue. NVMe uses multiple queues with thousands of commands[13], reducing latency and increasing throughput. The physical connection (PCIe) also offers more bandwidth than SATA cables.\n    • How does a GPU accelerate graphics? GPUs consist of many small cores designed for parallel processing. They handle massive numbers of simple calculations simultaneously—ideal for drawing pixels and shading polygons. Even an entry‑level GT 730 can offload tasks like video decoding and simple games from the CPU.\nExploring these questions deepens your understanding and prepares you to troubleshoot and upgrade systems in the future.\nTips and Troubleshooting\n    • No video output: Ensure the monitor cable is connected to the graphics card (not the motherboard) and that the GPU is fully seated in its slot. Verify that the GPU receives power.\n    • System won’t power on: Check the PSU switch, confirm that the 24‑pin and CPU power cables are connected, and ensure the front‑panel connectors are correctly wired.\n    • Random freezes or crashes: Reseat the RAM and ensure XMP/DOCP profiles are appropriate for your memory. Insufficient power from the PSU can also cause instability.\n    • High temperatures: Recheck the thermal paste application and ensure the CPU cooler is secure. Improve airflow by repositioning fans or tidying cables.\nConclusion\nBuilding a PC is a gratifying way to blend hands‑on skills with theoretical knowledge. Each component—from the CPU that executes instructions[1] to the NVMe drive that streams data through PCIe lanes[7]—plays a specific role. By understanding these roles and methodically assembling your hardware, you can create a system tailored to your needs. The Ryzen 3×1000, GT 730, 8 GB of DDR4 RAM and an NVMe SSD form a modest yet functional computer suited for everyday tasks, light gaming and learning projects. As Feynman might remind us, curiosity doesn’t end with success; instead, let this build serve as a launching point for deeper questions about how computing hardware works and how you might improve your system in the future.\n\n[1] [2] [3] [4] [5] [6] [8] [9] [10] [16] [29] Computer Basics: Inside a Computer\nhttps://edu.gcfglobal.org/en/computerbasics/inside-a-computer/1/\n[7] [13] [14] NVMe vs. SATA: Storage Comparison & Differences\nhttps://phoenixnap.com/kb/nvme-vs-sata\n[11] [12] DDR3 vs DDR4 - Difference and Comparison | Diffen\nhttps://www.diffen.com/difference/DDR3_vs_DDR4\n[15] [17] [18] [19] [20] [21] [22] [23] [24] [25] [26] [27] [28] How to Build a Gaming PC from Scratch: Complete Guide\nhttps://ibertronica.es/blog/en/news-en/step-by-step-guide-to-building-your-own-gaming-pc-from-scratch/",
    "uploadDate": "2020-07-25 11:29",
    "readTime": "13 min read",
    "fileName": "Building a PC from Scratch Ryzen Nvidia with low resources.md",
    "featured": true
  }
];

export default blogPosts;
