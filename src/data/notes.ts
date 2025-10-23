// Auto-generated file - do not edit manually
// Generated on: 2025-10-23T21:57:06.482Z

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
    "title": "Prove",
    "excerpt": "This note explores the fundamental concepts of mathematical proofs and their applications in computer science and artificial intelligence.",
    "content": "# Prove - Mathematical Foundations\n\n## Introduction\n\nThis note explores the fundamental concepts of mathematical proofs and their applications in computer science and artificial intelligence.\n\n## Types of Proofs\n[[Activation function]]\n[[AI agent]]\n[[Anaconda]]\n\n### Direct Proof\nA direct proof establishes the truth of a statement by logical reasoning from known facts and axioms.\n\n### Proof by Contradiction\nAlso known as *reductio ad absurdum*, this method assumes the negation of what we want to prove and shows this leads to a contradiction.\n\n### Mathematical Induction\nA powerful technique for proving statements about natural numbers:\n1. **Base case**: Prove P(1) is true\n2. **Inductive step**: Show that if P(k) is true, then P(k+1) is also true\n\n## Applications in AI\n\nMathematical proofs are essential in:\n- Algorithm correctness verification\n- Complexity analysis\n- Neural network convergence guarantees\n- Optimization theory\n\nInline math works too, for example $E = mc^2$, and display math:\n\n$$\n\\int_0^1 x^2 \\, dx = \\frac{1}{3}\n$$\n\nImage \n\n![prove.png](notes-assets/prove/prove.png)\n\n\n### Algorithm Correctness\n\n```python\ndef binary_search(arr, target):\n    \"\"\"\n    Binary search with proof of correctness\n    Invariant: target is in arr[left:right+1] if it exists\n    \"\"\"\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    \n    return -1\n```\n\n### Complexity Analysis\n\nTime complexity proofs help us understand algorithm performance and make informed decisions about which algorithms to use in different scenarios.\n\n## Conclusion\n\nUnderstanding proofs is crucial for developing robust algorithms and ensuring the reliability of AI systems. This mathematical rigor forms the foundation of computer science theory.\n\n---\n\n*This note demonstrates the importance of mathematical reasoning in computational thinking and serves as a foundational concept for more advanced topics in artificial intelligence and machine learning.* $\\frac{1}{2}$\n",
    "uploadDate": "2025-10-23",
    "readTime": "4 min read",
    "fileName": "prove.md",
    "featured": true
  },
  {
    "id": "2",
    "title": "Feed Forward Neural Network",
    "excerpt": "No excerpt available",
    "content": "",
    "uploadDate": "2025-10-23",
    "readTime": "1 min read",
    "fileName": "Feed-forward neural network.md",
    "featured": false
  },
  {
    "id": "3",
    "title": "Hopfield Networks",
    "excerpt": "No excerpt available",
    "content": "",
    "uploadDate": "2025-10-23",
    "readTime": "1 min read",
    "fileName": "Hopfield Networks.md",
    "featured": false
  },
  {
    "id": "4",
    "title": "Neural Networks And Deep Learning",
    "excerpt": "No excerpt available",
    "content": "",
    "uploadDate": "2025-10-23",
    "readTime": "1 min read",
    "fileName": "Neural Networks and Deep Learning.md",
    "featured": false
  },
  {
    "id": "5",
    "title": "Linux",
    "excerpt": "The less time is thirty minutes and well.Linux is a [[OpenSource]] [[Kernel]] developed by Linus Torvald_ on 1991. It's based on *Unix*. Imagine like ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-19 21:13\"\n---\nThe less time is thirty minutes and well.Linux is a [[OpenSource]] [[Kernel]] developed by Linus Torvald_ on 1991. It's based on *Unix*. Imagine like this exist a company that has has own closed kernel but you want your own because the security.Then you decide create your own, and you have the model of the actual but you write all your code on your own.\n\nAnd exist many advantages for use Linux, like automation, lightness, security, customization, I mean if you code you can change everything. \n\n[[Distributions]]\n[[shell]]\n[[reason to use linux]]\nLinux it's a great example for understand how computer works, instead of Windows that it's very easy to use, very intuitive using the Graphic Interface, instead of the Bash Interface that in essence it's more complicated but it's programming craw. \n\nOf,course like Ubuntu dont have that users my wifi usb need a lot of settings to work\n\nDefinition.- Linux is an operating system (OS), more specif to the Kernel.\nIt's like an intermediary of the Hardware and the software. Created on 1991 by Linus Torvalds\n\nBut then what operating system.\n\nDefinition and operating system is system software that manages computer hardware and software.\nSee it like the path between the hardware and user. Using drivers, system calls, and the kernel,\n\nI mean one you entrance to this world of Linux programming it's convert a import part on your life,\n\nAfter battle and battle with Linux, I finally make this thing of synchronize with all my devices, also I read something about the Linux. \n\n[[Software]]\n\n\n![LinuxOverview.svg](LinuxOverview.svg)\n\n[[learning rate]]\n[[arch linux the first step to minimalism digitial]]",
    "uploadDate": "2025-06-19 21:13",
    "readTime": "2 min read",
    "fileName": "Linux.md",
    "featured": false
  },
  {
    "id": "6",
    "title": "What Mean Being Trainable On Pytorch",
    "excerpt": "I mean is kind of confusing what it means all about this graphs, what it means grad. I mean torch to be very efficient, faster I guess that behind the...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-07 20:58\"\n---\nI mean is kind of confusing what it means all about this graphs, what it means grad. I mean torch to be very efficient, faster I guess that behind there be things weird. And to have a fully understanding I think it is necessary!",
    "uploadDate": "2025-06-07 20:58",
    "readTime": "1 min read",
    "fileName": "what mean being trainable on pytorch.md",
    "featured": false
  },
  {
    "id": "7",
    "title": "Table Of Parameters",
    "excerpt": "Here some examples of how the [[parameters]] are distributed.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-06-07 13:59\n---\nHere some examples of how the [[parameters]] are distributed.\n\n- [[gpt3p.png|175 B parameters to GPT-3]]\n- [GPT-124M parameters](https://github.com/openai/gpt-2)\n\n\n\n\n",
    "uploadDate": "2025-06-07 13:59",
    "readTime": "1 min read",
    "fileName": "Table of parameters.md",
    "featured": false
  },
  {
    "id": "8",
    "title": "Linearity On DL",
    "excerpt": "The less time is thirty minutes and well.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-03 08:37\"\n---\nThe less time is thirty minutes and well.",
    "uploadDate": "2025-06-03 08:37",
    "readTime": "1 min read",
    "fileName": "linearity on DL.md",
    "featured": false
  },
  {
    "id": "9",
    "title": "Flash Attention",
    "excerpt": "Well this is more faster (computationally talking) than [[Self attention mechanism on one head]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 14:13\"\n---\nWell this is more faster (computationally talking) than [[Self attention mechanism on one head]].\n\nThe question is why it is? ",
    "uploadDate": "2025-06-02 14:13",
    "readTime": "1 min read",
    "fileName": "flash attention.md",
    "featured": false
  },
  {
    "id": "10",
    "title": "Initialization Parameters",
    "excerpt": "So when I was trying to create a [[Feed Forward Neural Network]], I take some arbitrary decision, (remember what they were).",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 12:11\"\n---\nSo when I was trying to create a [[Feed Forward Neural Network]], I take some arbitrary decision, (remember what they were).\n\nOne was when I initialize the [[parameters]] (the weights and bias), and of course I put a uniform distribution from -10 to 10, and it never converge. \n\nSo they tell me about that I need to initialize it in specially ways, and I guess that depends on some factors,  like the [[Activation function]], and I guess that from the [[Optimizer]].\n\nSo also exist more theory here. \n\n",
    "uploadDate": "2025-06-02 12:11",
    "readTime": "1 min read",
    "fileName": "initialization parameters.md",
    "featured": false
  },
  {
    "id": "11",
    "title": "Learning Rate",
    "excerpt": "So this numbers is close to zero, so the parameters don't change that bad, ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 12:07\"\n---\nSo this numbers is close to zero, so the parameters don't change that bad, \n\n\nand also exist something about alpha and beta that comes from other way,\n\nSo this also depends on the chose of the [[Optimizer]]. ",
    "uploadDate": "2025-06-02 12:07",
    "readTime": "1 min read",
    "fileName": "learning rate.md",
    "featured": false
  },
  {
    "id": "12",
    "title": "Parameters",
    "excerpt": "So we call parameters to the numbers in the [[Tensor - Computation|tensors]], and his life also depends on the [[learning rate]] , and what technique ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 12:02\"\n---\nSo we call parameters to the numbers in the [[Tensor - Computation|tensors]], and his life also depends on the [[learning rate]] , and what technique used on [[initialization parameters]].\nAnd of course when talking about [[Sparse Moe]] we talk of [[Active Parameters]]\n\n\n[[Table of parameters]]",
    "uploadDate": "2025-06-02 12:02",
    "readTime": "1 min read",
    "fileName": "parameters.md",
    "featured": false
  },
  {
    "id": "13",
    "title": "Embedding Matrix",
    "excerpt": ">Let $W_{E}$ be the **embedding matrix** which shape is [[Embedding dimension]] times the [[vocabulary size]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 11:06\"\n---\n>[!definition]\n>Let $W_{E}$ be the **embedding matrix** which shape is [[Embedding dimension]] times the [[vocabulary size]].\n\n- This matrix is obtained by training it, each column represents a word. [[what mean being trainable on pytorch]]\n- How we use it specifically?\n\n\n\n\nFor instance ChatGTP-3 token 50.257. with rows of 12,228 giving = 617,558,016 parameters. \n\nVector lives in a 12,228 dimensional space.\n\naja",
    "uploadDate": "2025-06-02 11:06",
    "readTime": "1 min read",
    "fileName": "Embedding matrix.md",
    "featured": false
  },
  {
    "id": "14",
    "title": "Positional Embedding Matrix",
    "excerpt": "The less time is thirty minutes and well.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 11:05\"\n---\nThe less time is thirty minutes and well.",
    "uploadDate": "2025-06-02 11:05",
    "readTime": "1 min read",
    "fileName": "positional embedding matrix.md",
    "featured": false
  },
  {
    "id": "15",
    "title": "Pipe Line And Dual Pipe Line",
    "excerpt": "The less time is thirty minutes and well.In software Pipe line refers to the convey of information, data through two devices.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 09:56\"\n---\nThe less time is thirty minutes and well.In software Pipe line refers to the convey of information, data through two devices.\nIn [[DeepSeek-V3 Technical Report]] introduces the word _Dual Pipe Line_. \n\nAnd something that I really like it was the in one video of platzi they combine four macs and the quantity of [[teraflops]] are added, was simply amazing.\n\n> The idea is to overlap the computation and communication within a pair of individual forward and backwards chunks. Each chunk is devided in four components.\n\nI mean it would be a bomb that you can use the power of many CPU's and GPU's like a one. The communication between devices is important we need write and read a lot of data and being actualized constantly.\n\nThis word \n\nI know the NVlink that allows to connect two GPUs. And a more old technology is the SLI. This are of GPU consume, now what is the name of the technology that cluster, servers use, because they meed to connect not only GPU but also CPUs and memory virtual space. And it's amazing how something so abstract could be take form on a virtual space.\n\nThey say that for servers NVlink and Nvidia Infiniband, or more rustic with PCIe scaling  and Nvidia DGX systems. \n\nAnd was thinking on a miner (cryptocurrency) that needs knows pretty well, because they need to use many GPUS.\n\n[[Cryptocurrency]]",
    "uploadDate": "2025-06-02 09:56",
    "readTime": "1 min read",
    "fileName": "Pipe Line and Dual Pipe Line.md",
    "featured": false
  },
  {
    "id": "16",
    "title": "LLM'S Basic Working",
    "excerpt": "What it would be a beauty definition of LLM, then is important differentiate I think that the model itself is only that but without the tokenizer neit...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 09:17\"\n---\nWhat it would be a beauty definition of LLM, then is important differentiate I think that the model itself is only that but without the tokenizer neither the choose of the token, once that you have the logits.\n\nSo a function multilinear stochastic predictive token I need to be very cautious.\n\nWe could understand **LLMs** like functions but for words, we can give it a uncompleted sentence as input and the output will be the missing word. If we iterate this process we could obtain sentences.\nSo we could say that the function depends on: before words, the message intention, the context/place, the receptors, and a ton of variables. How we integrate that amount information? Let's give the first step, and that is grasp the follow [[Architecture of a transform|architecture]] of course is not the unique architecture but is the most efficient.\n![transformerArchitecture.png](transformerArchitecture.png)\n\nOnce that you understand all, to have your own model follow the next steps.\nFirst it's obvious that we need data, data that \"easily\" could be extract form internet. Books, papers, websites, code, repositories, everything that reflect the human language.\nNow let's say you have a file with millions of PDFs with all this data. What do I do with this?\nI mean we can give a each word a number this is know like [[Tokenization - Embedding - LLM]]\n[[Transformer]]\nOnce you have all the data, what's next?\n\nYou need to choose a structure, (here I'm gonna to do a remark) I'm gonna to talk before that said paper that change the game.\n\n[[Choose the model architecture LLM]]\n[[Training Phase LLM]]\n# YouTube Video\n\n ![](https://www.youtube.com/watch?v=LPZh9BOjkQs&t=56s)\n\n\n![](https://youtu.be/FdZ8LKiJBhQ)\n\n\nhe less time is thirty minutes and well.",
    "uploadDate": "2025-06-02 09:17",
    "readTime": "2 min read",
    "fileName": "LLM's basic working.md",
    "featured": false
  },
  {
    "id": "17",
    "title": "Head Model",
    "excerpt": "No excerpt available",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 08:46\"\n---\n>[!definition]\n\n**Ref**. \n\n[[Birth of LLMs]]",
    "uploadDate": "2025-06-02 08:46",
    "readTime": "1 min read",
    "fileName": "head model.md",
    "featured": false
  },
  {
    "id": "18",
    "title": "Attention Mechanism",
    "excerpt": ">The original and most primite!",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-06-02 08:03\"\n---\n>[!definition]\n>The original and most primite!\n\n**Ref**. ",
    "uploadDate": "2025-06-02 08:03",
    "readTime": "1 min read",
    "fileName": "attention mechanism.md",
    "featured": false
  },
  {
    "id": "19",
    "title": "Ethernet",
    "excerpt": "Before always that I see a ethernet cable it seem it to me bored. But I was missing that those things are really excited.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-05-22 08:44\"\n---\nBefore always that I see a ethernet cable it seem it to me bored. But I was missing that those things are really excited.\n\n\nTHe same with the router that internet give to us. I was wrong\n\n",
    "uploadDate": "2025-05-22 08:44",
    "readTime": "1 min read",
    "fileName": "ethernet.md",
    "featured": false
  },
  {
    "id": "20",
    "title": "Hyperparameters",
    "excerpt": "So judging by the name what is the difference with [[parameters]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-05-21 10:14\"\n---\nSo judging by the name what is the difference with [[parameters]]\n\n\nAll the parameters reside on the matrices and vectors (weights and bias)? of the [[Feed Forward Neural Network]].\n\nAnd also while using pytorch those matrices in some way are different from normal matrices.\n\nHyper parameters of the model like the embed dimension and that stuff. For chatgtp2 we have the follow hyperparameters, general because really exist a ton. and well all make reference, we could say that this define the [[Architecture of a transform]].\n\nThe vocabulary size. ```vocab_size```[[vocabulary size]] \nThe block size. ```block_size``` \nThe number the heads for layers. ```n_head``` \nThe embedding size. ```n_embd``` [[Embedding dimension]]\nThe numbers of layers. ```n_layer``` \n\nOnce you define this parameters you could define the [[Embedding matrix]] and the [[positional embedding matrix]].",
    "uploadDate": "2025-05-21 10:14",
    "readTime": "6 min read",
    "fileName": "hyperparameters.md",
    "featured": false
  },
  {
    "id": "21",
    "title": "PowerOfWork",
    "excerpt": "Here is another place where we observe the importance of the [[cluster servers]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-05-14 12:39\"\n---\nHere is another place where we observe the importance of the [[cluster servers]].\nBasically this is what we called mine, people with some knowledge enter to the [[Blockchain]] and they are playing like mini lotteries to earn some bitcoin. \n\nBasically is like a job they \"check\" that everything ",
    "uploadDate": "2025-05-14 12:39",
    "readTime": "1 min read",
    "fileName": "PowerOfWork.md",
    "featured": false
  },
  {
    "id": "22",
    "title": "Self Attention Idea",
    "excerpt": "Allows token attend each others in parallel.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 14:35\"\n---\nAllows token attend each others in parallel.\n\nThe _parallelisation_ it's possible for the [[Gpu paralellism-deep learning-computational costs]],it's perform in the _multi head attention_ task\n\nBasically (_inference_), give it a set of words in its vector form, apply this mechanism makes change the values of the vector by summing vector, a single head make change a little, but the sum of many heads change considerably the words. [[Multi-head attention]].\n\nThis is vector that change the meaning of the words is obtained by **Attention Formula**. ",
    "uploadDate": "2025-04-29 14:35",
    "readTime": "1 min read",
    "fileName": "Self attention idea.md",
    "featured": false
  },
  {
    "id": "23",
    "title": "Query And Key Idea",
    "excerpt": "The query is ts asking if exist adjectives in front of a noun, the key vector is answer that question. (All implicitly of course, encoded in the value...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 14:29\"\n---\n\nThe query is ts asking if exist adjectives in front of a noun, the key vector is answer that question. (All implicitly of course, encoded in the values of the matrix).\n- For each head we have one a unique $W_{Q}$ and $W_{K}$. \n- On each attention head operates on **smaller subspace** of the full model dimension.\n- Creating the key and query vectors is something that happen on the RAM they are momentary.\n- The dimension of the query and key vector are determined by the _dimension model (quantity of parameters)_ the numbers of _heads_ and the \"head dimension\"\n",
    "uploadDate": "2025-04-29 14:29",
    "readTime": "2 min read",
    "fileName": "Query and key Idea.md",
    "featured": false
  },
  {
    "id": "24",
    "title": "Embedding Dimension",
    "excerpt": "The **embedding dimension** defines how many parameters a token will have.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 14:05\"\n---\nThe **embedding dimension** defines how many parameters a token will have.\n\nExist a whole paper about how is this\nWe are going to notate it simply like : $d$\n\n>The interesting thing is that while more bigger this numbers we have more options to express one word over a complex context.\n>Even exist a theorem that relate the exponential- ",
    "uploadDate": "2025-04-29 14:05",
    "readTime": "1 min read",
    "fileName": "Embedding dimension.md",
    "featured": false
  },
  {
    "id": "25",
    "title": "Context Problem",
    "excerpt": "We know that a part of what we call _context_ rely on use adjectives and what others word that are around. This modify the means of the word for us th...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 13:43\"\n---\nWe know that a part of what we call _context_ rely on use adjectives and what others word that are around. This modify the means of the word for us this is translated to change the values of the [[Tokenization - Embedding - LLM|words trough its vector parameters]].\n\nThus, we have to know the position of the words and ask if there adjectives in front of a word, for that purpose exists the _query vector_.\n\nThis have all the implicit information of the context related to a specific word, thus to each vector we have associated a _query vector_ that encodes all that contextual information respect that word.\n",
    "uploadDate": "2025-04-29 13:43",
    "readTime": "1 min read",
    "fileName": "Context Problem.md",
    "featured": false
  },
  {
    "id": "26",
    "title": "Blockchain",
    "excerpt": "Study and more study. It's only about study all the day man, read all the day, and being smart to earn money from that.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-29 08:36\"\n---\nStudy and more study. It's only about study all the day man, read all the day, and being smart to earn money from that. ",
    "uploadDate": "2025-04-29 08:36",
    "readTime": "1 min read",
    "fileName": "Blockchain.md",
    "featured": false
  },
  {
    "id": "27",
    "title": "DCGAN Deep Convolutional GAN",
    "excerpt": "I guess that this is a step further of the [[GAN-Generative Adversarial Network]]. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-28 07:38\"\n---\nI guess that this is a step further of the [[GAN-Generative Adversarial Network]]. \n\nOf course that is a little more complex.",
    "uploadDate": "2025-04-28 07:38",
    "readTime": "1 min read",
    "fileName": "DCGAN-Deep Convolutional GAN.md",
    "featured": false
  },
  {
    "id": "28",
    "title": "GAN Generative Adversarial Network",
    "excerpt": "The idea is quite good, you have a generator that creates images and a discriminator that try of say if the image is fake or new.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-28 07:27\"\n---\nThe idea is quite good, you have a generator that creates images and a discriminator that try of say if the image is fake or new.\n\nI guess that it would be a certain limit where this properly works, (the model don't improve) \n\nAnd this for me is considered [[Reinforcement Learning]], exist a punishment a reward, a agent action and state space.  ",
    "uploadDate": "2025-04-28 07:27",
    "readTime": "1 min read",
    "fileName": "GAN-Generative Adversarial Network.md",
    "featured": false
  },
  {
    "id": "29",
    "title": "Image Generator",
    "excerpt": "The idea is that the exist the matrix where you could act this three dimensional matrix, over this a [[Model]] could act, it has its parameter that sa...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-28 07:25\"\n---\nThe idea is that the exist the matrix where you could act this three dimensional matrix, over this a [[Model]] could act, it has its parameter that say to the model if \"brush\" this square of a certain color, we tweak this parameters using what actually we know. \n\nThe model can't generate new pixels only form a random matrix called it noise at first it could tweak this.\n\nAnd here exist some terms useful to manage Pooling, padding.\n\n\nSome architectures:\n- [[GAN-Generative Adversarial Network]]\n- [[DCGAN-Deep Convolutional GAN]]",
    "uploadDate": "2025-04-28 07:25",
    "readTime": "1 min read",
    "fileName": "image generator.md",
    "featured": false
  },
  {
    "id": "30",
    "title": "Surprise",
    "excerpt": "And this could be obtained from two perspectives (Artem) surprise or (Lemnis) that comes from [[Information Theory]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-27 12:22\"\n---\nAnd this could be obtained from two perspectives (Artem) surprise or (Lemnis) that comes from [[Information Theory]]\n[[Cross entropy]]",
    "uploadDate": "2025-04-27 12:22",
    "readTime": "1 min read",
    "fileName": "Surprise.md",
    "featured": false
  },
  {
    "id": "31",
    "title": "Adaptive Moment Estimation",
    "excerpt": "For each weight $\\theta$, we have $m_{t}$ the average of past gradients, $v_{t}$ the average of past squared gradients.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-24 11:15\"\n---\n>Adam\n\nFor each weight $\\theta$, we have $m_{t}$ the average of past gradients, $v_{t}$ the average of past squared gradients.\n\nThe update is $$\\theta_{t+1}=\\theta_{t}-\\alpha.\\frac{\\hat{m}_{t}}{\\sqrt{ \\hat{v}_{t}+\\epsilon }}$$\n$\\alpha$ the learning rate, and epsilon a number close to zero.\n",
    "uploadDate": "2025-04-24 11:15",
    "readTime": "3 min read",
    "fileName": "Adaptive Moment Estimation.md",
    "featured": false
  },
  {
    "id": "32",
    "title": "Optimizer",
    "excerpt": "We call **optimizer** to the method picked to change the parameters and reduce the [[Cost-Loss Function]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-24 11:09\"\n---\nWe call **optimizer** to the method picked to change the parameters and reduce the [[Cost-Loss Function]].\n\nFirst we have the forward process, computation of the loss function, using the [[Back propagation algorithm]], we compute the gradients, with these we choose a way of how change the parameters. The optimizer is that way, using those gradients we minimize the loss function.\n\n- Some popular optimizer are : [[Stochastic Gradient Descent|SGD]], [[Adaptive Moment Estimation|ADAM]], RMSprop, Adagrad, AdamW, we use one specifically for the task of the [[Model]]. The  are ones that works much better in certain cases. \n  ",
    "uploadDate": "2025-04-24 11:09",
    "readTime": "1 min read",
    "fileName": "Optimizer.md",
    "featured": false
  },
  {
    "id": "33",
    "title": "Mean Squared Error",
    "excerpt": "Let's imagine that we have a vector of inputs and output that we want that our _N.N_ learn.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-24 10:50\"\n---\nLet's imagine that we have a vector of inputs and output that we want that our _N.N_ learn.\nLet $n$ be the number of all the inputs that we are going to give to the function, $w$ the _weights_ $b$ the _bias_, $y(x)$ the actual out put that gives the [[Neural Network Idea]] and $a_{x}$ the expected output for one specific input. \n\n$$\nC(w,b)=\\frac{1}{2n}\\sum_{x}||y(x)-a_{x}||^{2}\n$$\n\nIs easy observe that our model is doing well if the output of these function is close to zero, if the number instead is a big number then we need to change in somehow the values for the parameters.\n\n[[Least squares algorithm]]",
    "uploadDate": "2025-04-24 10:50",
    "readTime": "4 min read",
    "fileName": "Mean Squared Error.md",
    "featured": false
  },
  {
    "id": "34",
    "title": "Encapsulation",
    "excerpt": "In python also exist **private attributes**. What are these? ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-23 15:51\"\n---\nIn python also exist **private attributes**. What are these? \nSetters and getters.",
    "uploadDate": "2025-04-23 15:51",
    "readTime": "1 min read",
    "fileName": "Encapsulation.md",
    "featured": false
  },
  {
    "id": "35",
    "title": "Polymorphism",
    "excerpt": "Basically a have class that are [[Inheritance]] a method for the _SuperClass_.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-23 15:47\"\n---\nBasically a have class that are [[Inheritance]] a method for the _SuperClass_.\n\n",
    "uploadDate": "2025-04-23 15:47",
    "readTime": "1 min read",
    "fileName": "Polymorphism.md",
    "featured": false
  },
  {
    "id": "36",
    "title": "NVIDIA",
    "excerpt": "I say the second biggest companiy. And it's maxima product are the graphics card but they also offer another devices and any type of software, we can'...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-22 09:37\"\n---\nI say the second biggest companiy. And it's maxima product are the graphics card but they also offer another devices and any type of software, we can't forget Omniverse.\n\nAnd also they are the biggest person doing research on new technologies like Ray Tracing and a lot of more stuff.\n\nOne time I saw a brief video of the CEO, this Taiwanese Jen-Hsun Huang he study electrical engineer and I guess that he shine on Standfors like play table tennis and he works and AMD, and the idea of make GPU's where comes from? \nAl.\n\n[[GPU]]\n\n[[Big Tech Companies]]",
    "uploadDate": "2025-04-22 09:37",
    "readTime": "1 min read",
    "fileName": "NVIDIA.md",
    "featured": false
  },
  {
    "id": "37",
    "title": "Cuda",
    "excerpt": ">We only need to know what is, and a basic understanding, if someone aims to or it seem it interesting/funny could study software engineering some yea...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-22 09:13\"\n---\n>We only need to know what is, and a basic understanding, if someone aims to or it seem it interesting/funny could study software engineering some years and literally use tweak it on his own. \n\n**Cuda** (Compute Unified Device Architecture) is a parallel computing platform and programming model developed by [[NVIDIA]]. Give you the chance of tweak the NVIDIA's [[GPU]] for specific purposes, leveraging the [[Gpu paralellism-deep learning-computational costs|paralellism]], the performance that we can obtain using cuda is surprising highly. To works like [[Cryptocurrency]] \n\n\nWe could say that cuda is one of the more relevant technologies behind all [[Model]], this comes with the GPU, inside of it, to this you add the right drivers and you are ready. ",
    "uploadDate": "2025-04-22 09:13",
    "readTime": "1 min read",
    "fileName": "cuda.md",
    "featured": false
  },
  {
    "id": "38",
    "title": "Python",
    "excerpt": "Python is the more use [[Language Program]] used around the globe. And for many reasons it super easy to learn it, you can run a python script easily ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 20:33\"\n---\nPython is the more use [[Language Program]] used around the globe. And for many reasons it super easy to learn it, you can run a python script easily to difference to C++, (well in Linux you have to create a executable) an in windows is quite hard!.\n\nNow that we are renting GPU's, I wonder if it .py script can run with any problem only on a GPU! I guess so, at the end are not that different.",
    "uploadDate": "2025-04-18 20:33",
    "readTime": "1 min read",
    "fileName": "Python.md",
    "featured": false
  },
  {
    "id": "39",
    "title": "C++",
    "excerpt": "I know the basics of this [[Language Program]], but currently compare it to [[Python]] it's hard have the gains of learn python. But like all in life,...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 20:32\"\n---\nI know the basics of this [[Language Program]], but currently compare it to [[Python]] it's hard have the gains of learn python. But like all in life, if you want to have a deeper understanding of programming i's a good language.\n\nI mean C++ is pretty good if you like developer wants make an upgrade in a line specific, all this thing of pointers, abstractions, compilations give you this insight of what is doing the computers. In **Python** is more straightforward, you don't need to know a lot of theory behind. \n\nBut of course that depends on your interests, if this don't having nothing to do with the mention don't worth learn this language.\n\nIt seems interested to me how a senior programmer learns a new code. \n\n>Respect _Anki_ we are covering everything I remember, we are not going expand our acknowledges in this language, I only want the ideas behinds. \n\nIt low level the we could use it for programming the [[Kernel]] what?",
    "uploadDate": "2025-04-18 20:32",
    "readTime": "1 min read",
    "fileName": "C++.md",
    "featured": false
  },
  {
    "id": "40",
    "title": "Internet",
    "excerpt": "Reading this book about startup the most profitable business is on internet.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 18:30\"\n---\nReading this book about startup the most profitable business is on internet.\n\nExist the history of how Internet evolve from 1990, until what actually is, the first search engine like [[Google]] \n\nIt's interesting that all the big millionaires were the first on think that Internet, was serious stuff, we need that kind of mindset, no matter, artificial. \n\nAnd I think that a good first step is begin to use a linux distro, because the environment of windows is simply awful.  \n\n\nMan and talking between how the connection works some terminology interesting is IP, proxy, gate ,DNS. And it's really interesting one thing more to learn\n\n[[ethernet]]",
    "uploadDate": "2025-04-18 18:30",
    "readTime": "1 min read",
    "fileName": "Internet.md",
    "featured": false
  },
  {
    "id": "41",
    "title": "Cyber Security",
    "excerpt": "This is note aim more to a reminder, that we need to be very careful to where places on [[Internet]], I actually have money on the BCP, but that is th...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-18 18:29\"\n---\nThis is note aim more to a reminder, that we need to be very careful to where places on [[Internet]], I actually have money on the BCP, but that is the best way? Is really secure? Yape is secure?\n\nI remember that Diana was stolen by connecting to a open WiFi. I use open services they are actually secure? \n\nExist a lot of words to understand this whole word where I'm not interested on, like Proxy, Servers, and a lot more. But each time with time have basic acknowledges on this field are more important, and for an average person the best is being careful, when one give the credit card. ",
    "uploadDate": "2025-04-18 18:29",
    "readTime": "1 min read",
    "fileName": "Cyber Security.md",
    "featured": false
  },
  {
    "id": "42",
    "title": "Vector Graphics",
    "excerpt": "They are images that don't lose quality if one make a zoom in. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-16 19:57\"\n---\nThey are images that don't lose quality if one make a zoom in. \nAre a form of computer graphics.\nand what about [[computer vision]]\nWe have the PDF, svg. \n",
    "uploadDate": "2025-04-16 19:57",
    "readTime": "1 min read",
    "fileName": "vector graphics.md",
    "featured": false
  },
  {
    "id": "43",
    "title": "Tensor   Computation",
    "excerpt": "In the [[Deep learning, what it is?]], a tensor basically _matrices_ of _high dimensions_, you can simply iterate using brackets and that is what we  ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-15 09:40\"\n---\nIn the [[Deep learning, what it is?]], a tensor basically _matrices_ of _high dimensions_, you can simply iterate using brackets and that is what we  call _Tensor_, of course from a more mathematical perspective that is a joke comparing to [[Tensor]], but of course this is more practical and have more easy, although is not that pretty for it's mere existence. \n\nIs what I liked, math, (solve problems), computation!",
    "uploadDate": "2025-04-15 09:40",
    "readTime": "1 min read",
    "fileName": "Tensor - Computation.md",
    "featured": false
  },
  {
    "id": "44",
    "title": "Cloud",
    "excerpt": "Basically the use of [[cluster servers]] to store data, because those already have more utilities.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-15 08:51\"\n---\nBasically the use of [[cluster servers]] to store data, because those already have more utilities.\n\n>What are those words that describe it properly? Use of analogies? Examples, predict.",
    "uploadDate": "2025-04-15 08:51",
    "readTime": "1 min read",
    "fileName": "cloud.md",
    "featured": false
  },
  {
    "id": "45",
    "title": "TPU",
    "excerpt": "It's pretty the same of [[CPU]] and [[GPU]] but aims to the manage of [[Tensor - Computation]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-15 07:59\"\n---\nIt's pretty the same of [[CPU]] and [[GPU]] but aims to the manage of [[Tensor - Computation]].\n\n\n\nPractically is used more in the [[Deep learning, what it is?]] field.\nNow the follow step is the [[NPU]]",
    "uploadDate": "2025-04-15 07:59",
    "readTime": "1 min read",
    "fileName": "TPU.md",
    "featured": false
  },
  {
    "id": "46",
    "title": "Inheritance",
    "excerpt": "In the [[Object Oriented Programming]] the inheritance is that _inherit_ the properties of super class.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 20:36\"\n---\nIn the [[Object Oriented Programming]] the inheritance is that _inherit_ the properties of super class. \n",
    "uploadDate": "2025-04-13 20:36",
    "readTime": "1 min read",
    "fileName": "Inheritance.md",
    "featured": false
  },
  {
    "id": "47",
    "title": "Jupyter Notebooks",
    "excerpt": "Well there you can run Notes pretty the same of Colab but it's locally (files with the .ipynb extension), they are part of the _Jupyter Project_ (2014...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 13:10\"\n---\nWell there you can run Notes pretty the same of Colab but it's locally (files with the .ipynb extension), they are part of the _Jupyter Project_ (2014) , and it's amazing.\n\nYou could use **Markdown** and **Latex** two of the things who I really like, run code (originally Julia, R, python) graphs, tables  and images practically the same what I did with Obsidian but adding code.  `print(\"hello)`\n\nI mean if you live making code takes notes in that way it's pretty useful. Also exist the application *Evernotes* but die. (If a company not advances die, amazing example)\nIt's really comfortable know that people take notes in this way from 2014.\n\nAnd in some way it use [[Anaconda]]\n\nAnd the well known _Colab_ is a hosted Jupyter Notebook, (if you don't have the need [[Hardware]] it's a pretty good option) that basically is a [[cloud|cloud service]]",
    "uploadDate": "2025-04-13 13:10",
    "readTime": "1 min read",
    "fileName": "Jupyter Notebooks.md",
    "featured": false
  },
  {
    "id": "48",
    "title": "Anaconda",
    "excerpt": ">Is a distribution of the Python and R languages, here distribution mean , is specifically designed for scientific computing, data science, machine le...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 13:00\"\n---\n>Is a distribution of the Python and R languages, here distribution mean , is specifically designed for scientific computing, data science, machine learning and big [[Data]] processing\n\nComes with **conda**, basically and environment to work fine, and comes with preinstalled libraries which always makes more fast the work. and more things that I don't gonna to write without use it before. \n\nAnd the question what is conda, well I don't know I need to try it.\n\n[[Machine Learning MOC]]",
    "uploadDate": "2025-04-13 13:00",
    "readTime": "1 min read",
    "fileName": "Anaconda.md",
    "featured": false
  },
  {
    "id": "49",
    "title": "Lang Chain",
    "excerpt": "Basically give steroids to [[Birth of LLMs]], and you use it in your day a day, that is not crazy.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-13 12:49\"\n---\nBasically give steroids to [[Birth of LLMs]], and you use it in your day a day, that is not crazy.\n\n>It's a framework that enable the connection between [[Model]] with other tools like [[API]] and even your [[Data]]. \n\n\n",
    "uploadDate": "2025-04-13 12:49",
    "readTime": "1 min read",
    "fileName": "Lang Chain.md",
    "featured": false
  },
  {
    "id": "50",
    "title": "Model",
    "excerpt": "In the [[Machine Learning]] literature a model is anything that was build from resolve a problem. In this path you have to make some abstractions.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-13 08:14\n---\nIn the [[Machine Learning]] literature a model is anything that was build from resolve a problem. In this path you have to make some abstractions.\n\n[[Birth of LLMs]] were created to resolve the Language problem, you create a model of how we use words and you works on that.\n\nbecause they are the most seen actually, but also exist the [[Multimodal Large Language Model]] and the model that only use [[computer vision]], but exist ton.",
    "uploadDate": "2025-04-13 08:14",
    "readTime": "1 min read",
    "fileName": "Model.md",
    "featured": false
  },
  {
    "id": "51",
    "title": "Hugging Face",
    "excerpt": ">Is an American company that develops computation tools for [[Machine Learning]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-13 08:09\n---\n>Is an American company that develops computation tools for [[Machine Learning]]\n\n\nThis is another startup related to AI, well it begin on 2016 founded by French people, thinking make a Chat bot for teenagers, but for some reason they [[OpenSource]] the model and they change the the [[Machine Learning]] field. \n\nI would say that is the best social network (surpass to reddit, anc twitter), the question is that here you could find many [[Model]], and also the question research is always a constant,  I love this page. \n\nAnd it's true that they don't have the same quantity of user that another webs, but they are pretty good.",
    "uploadDate": "2025-04-13 08:09",
    "readTime": "1 min read",
    "fileName": "Hugging Face.md",
    "featured": false
  },
  {
    "id": "52",
    "title": "How Internet Works Servers",
    "excerpt": "Maybe I retiring from the machine learning field. But I'm pretty sure that [[satelite]] have something to do with this. More realted of 5G technology.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 21:32\"\n---\nMaybe I retiring from the machine learning field. But I'm pretty sure that [[satelite]] have something to do with this. More realted of 5G technology.\nI mean If I would be a backend developer I would say that this is important.\nBut ok I give up respect curiosity. \nI mean it's very complex, all these I will skip it, it has to be with id, servers, and more stuff.\nIf I would be on 2020 I will try to understand strongly, but actually I'm race against time.\n\nThe use of servers are imprescinble. When you enter (using internet) for instance to [[Hugging Face]] you enter to its server, and I guess that in the local of its servers there are all the models and [[Data]]. We call the local of that server [[cloud]].\n\n[[Internet]]\n\n",
    "uploadDate": "2025-04-12 21:32",
    "readTime": "1 min read",
    "fileName": "how internet works servers.md",
    "featured": false
  },
  {
    "id": "53",
    "title": "Google",
    "excerpt": ">And google also begun like a startup, Larry Page and Sergey Brin founded it on 1996, and all begin as search engines, I guess that internet is starti...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 21:18\"\n---\n>And google also begun like a startup, Larry Page and Sergey Brin founded it on 1996, and all begin as search engines, I guess that internet is starting.\n\nAnd currently I'm very curious on how Internet begin. [[how internet works servers]]\n\nMan this is one the biggest [[Big Tech Companies]] that exist, I remember when they realize bard, and now they recalled like _Gemini_ because they have one problem with one add they realized, man just this week they realized a model with one million context size, that is a madness. \n\n",
    "uploadDate": "2025-04-12 21:18",
    "readTime": "1 min read",
    "fileName": "Google.md",
    "featured": false
  },
  {
    "id": "54",
    "title": "Antrophic",
    "excerpt": ">They are a startup founded by seven man people who worked on [[OpenAI]], I mean it's pretty normal that people from a [[Big Tech Companies]] renounce...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 20:51\"\n---\n>They are a startup founded by seven man people who worked on [[OpenAI]], I mean it's pretty normal that people from a [[Big Tech Companies]] renounce to fund it's own company or start up. It happen with [[Apple]], Nuvia and Qualcomm. They said the essential thing is not that complex, we could make that. \n\nAnd something that I find interesting is that you can send you CV, pretty easy and if you are good maybe you could be accepted, it's full meritocracy, and they ask Github-Git, linkdelin, Curriculum Vitae, and that kind of stuff.\n\nIt's model is Claude Sonnet has a very good performance.\n\nThis week together with [[Google]] ",
    "uploadDate": "2025-04-12 20:51",
    "readTime": "1 min read",
    "fileName": "Antrophic.md",
    "featured": false
  },
  {
    "id": "55",
    "title": "Operative System OS",
    "excerpt": "Man this is so confusing. Are the same of [[Distributions]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 17:39\"\n---\nMan this is so confusing. Are the same of [[Distributions]]\nWell here we have windows for instance Windows eleven, MacOs, linux (the kernel only).\n\n\n\n",
    "uploadDate": "2025-04-12 17:39",
    "readTime": "1 min read",
    "fileName": "Operative System OS.md",
    "featured": false
  },
  {
    "id": "56",
    "title": "Language Program",
    "excerpt": "Examples are python (the most used),C,C++, Java, Rust,Go, etc.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 17:18\"\n---\nExamples are python (the most used),C,C++, Java, Rust,Go, etc.\n\nAnd the life is pretty hard if you only know Python because if you want to make a program that want integrate different data and connections with another application you need to know more than a unique program language.\n\nThe difference with a shell is that they talk directly with the OS, to make familiar things, \ninstead a language program more for develop software, this are written on files, easily saved.\n\nWe need to talk of [[C++]]\n[[Code.canvas|Code]]",
    "uploadDate": "2025-04-12 17:18",
    "readTime": "1 min read",
    "fileName": "Language Program.md",
    "featured": false
  },
  {
    "id": "57",
    "title": "API",
    "excerpt": "Application Programming Interface, for the name I would say that is basically give it an application you can tweak it for you want, it's more focused ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 17:07\"\n---\nApplication Programming Interface, for the name I would say that is basically give it an application you can tweak it for you want, it's more focused on make different app talk each other trough [[Programming]].\n\nThis are very useful to specific purposes, when you work with many disconnect apps it's very useful. \n\n",
    "uploadDate": "2025-04-12 17:07",
    "readTime": "1 min read",
    "fileName": "API.md",
    "featured": false
  },
  {
    "id": "58",
    "title": "Vibe Coding",
    "excerpt": ">This note refers how the AI affect or upgrade our process of learning, specially code. One field where [[Model]] are quite better than humans.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 16:06\"\n---\n>This note refers how the AI affect or upgrade our process of learning, specially code. One field where [[Model]] are quite better than humans.\n\nThis make programming more accesible to the common user. Now you don't need hard skills on programming to make simples scripts,  Nietzche hates the masses, practically it's a no brainer, now the problem is evident you are not thinking, you are not learning, for the long run is more a problem, well that depends for the specifical use, I think that for science is bad.\nBut if you are not engaged, well is the best thing that ever happens.\n\nBut don't scale overtime! Science don't have easy paths, but I think than doing is the best way of learn. but I think than doing is the best way of learn.\n\nI past all  the day doing Vibe Coding and I felt that I don't use my brain, I go to bed with more than 18 hours awake and I don't feel tired, I don't feel that my neurons work properly, this is actually bad but if I weren't do that I don't will have a webpage. Modificable! Is completely brain rot. If life were all the days like this I will commite suicide. But well is just one day, and I don't wanna to do this again so...\n",
    "uploadDate": "2025-04-12 16:06",
    "readTime": "1 min read",
    "fileName": "Vibe coding.md",
    "featured": false
  },
  {
    "id": "59",
    "title": "Programming",
    "excerpt": "It is amazing for people who like think and implement, give you a lot tons of possibilities and you can make projecgs and projects and more.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:59\"\n---\nIt is amazing for people who like think and implement, give you a lot tons of possibilities and you can make projecgs and projects and more.\n\nAnd it's very important to know very well the name of things, before chatgtp and the video format all was about know the names of certain actions and (for referencing). \nAnd it was this practice of read documentation, something very uncommon in this days. \n\n[[Object Oriented Programming]]\n\nTo this practice to give problems to [[Birth of LLMs]] is called [[Vibe coding]].\n\n\n\nAnd in the future what is the most interesting that a person could make? Hackathon and _competitive programming_. \n\n>I think that the unique uses that I could give to programming are convert the apps that I use on terminal application and that I use [[Language Program]] to automate everything that I could. With ideas. Predict. \n\n[[Machine Learning MOC]]\n\n>I think that the best way of learn is struggling with the code, adding new things, making supossitions.",
    "uploadDate": "2025-04-12 13:59",
    "readTime": "1 min read",
    "fileName": "Programming.md",
    "featured": false
  },
  {
    "id": "60",
    "title": "Object Oriented Programming",
    "excerpt": "A _object_ is basically a variable of specific type, but to difference to `struct`  here you can add a lot of things, like _methods_, etc. ",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:58\"\n---\nA _object_ is basically a variable of specific type, but to difference to `struct`  here you can add a lot of things, like _methods_, etc. \n\nThe sense of use $OPP$ is the **modularity** that we love so much, and for big projects are good, and that one of the reason practically all project is made using this thing, I wonder if It would exist another paradigms\nand it's well reflected on its four pillar.\n1. [[Inheritance]]\n2. [[Polymorphism]]\n3. [[Encapsulation]]\n4. [[Abstraction]]\nIn C++, we talk of _setters_ and _getters_. When you create a class on C++, what you make is first this private thing, here you decide what kind of variables are going to be used for one element of the class the script inside private always run are called constructor, then in public you have setters  to define the variables correctly, and the getters to could use the variables, also exist the destructor but those is for clean memory.\n\nFor python is basically the same. \n\n[[Programming]]\n\n",
    "uploadDate": "2025-04-12 13:58",
    "readTime": "2 min read",
    "fileName": "Object Oriented Programming.md",
    "featured": false
  },
  {
    "id": "61",
    "title": "Recurrent Neural Network",
    "excerpt": "In the classic neural network if you give one input, this flow until became the output. Now what would happen if when is near to became the output we ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:35\"\n---\n\nIn the classic neural network if you give one input, this flow until became the output. Now what would happen if when is near to became the output we return it to the begin, it's like add a cycle. To this we call RNN.  \n\nAnd it mention about the use of sequential data (orders matters) you need to keep it somewhere this is _hidden state_\n\n, specifically how no idea. If the input is so long then it's probably that the [[Feed Forward Neural Network]] forget you know the vanishing problem, for that they create _LSMT_ (Long short term memory) networks.\nGRU (Gated Recurrent Networks) no idea also. \n\n\n[[An Introduction To Neural Networks]] pp-47",
    "uploadDate": "2025-04-12 13:35",
    "readTime": "1 min read",
    "fileName": "Recurrent Neural Network.md",
    "featured": false
  },
  {
    "id": "62",
    "title": "Pytorch",
    "excerpt": ">Developed by Meta, realized 2017, one year after **TensorFlow**, but it converted in the most package used for [[Deep learning, what it is?]] algorit...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 13:14\"\n---\n>Developed by Meta, realized 2017, one year after **TensorFlow**, but it converted in the most package used for [[Deep learning, what it is?]] algorithms quickly.\n\nDeveloped by **Meta AI**, and is very important to be use to its commands, and all the stuff.\n\nTogether with TensorFlow and Keras are very useful to treat Neural Networks.\n\nNow it seem it very interesting how they threat certain object, for instance when you want to train, they differentiate between non and trainable objects, and they do it using graphs! I guess. That is not incredible?\n\nOk, this library use [[cuda]] ",
    "uploadDate": "2025-04-12 13:14",
    "readTime": "1 min read",
    "fileName": "Pytorch.md",
    "featured": false
  },
  {
    "id": "63",
    "title": "Apple",
    "excerpt": "And respect Apple they sell basically all in one products, they don't sell pieces and the consumer could assembly it's costume computers. But for that...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:40\"\n---\n\nAnd respect Apple they sell basically all in one products, they don't sell pieces and the consumer could assembly it's costume computers. But for that exist _Hackinstosh_, that basically trick to MacOs, the bootloaders say that is Apple hardware. It is interesting what things make the community.\n\nAnd respect the AI, they are one of the leads respect to another [[Big Tech Companies]]\nThey have Neural Engine on its CPU but they are pretty expensive, stupidly expensive.\n\nAnd that is something good of Apple, if you want one product you buy it and ready for use. It's a no brainer which for me is bad, you assume many things. \n\n\n",
    "uploadDate": "2025-04-12 11:40",
    "readTime": "1 min read",
    "fileName": "Apple.md",
    "featured": false
  },
  {
    "id": "64",
    "title": "Mother Board",
    "excerpt": "To train [[Birth of LLMs]] the [[cluster servers]] use mother boards.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:27\"\n---\nTo train [[Birth of LLMs]] the [[cluster servers]] use mother boards.\n\nWell this stablish the connections between the [[GPU]] the [[CPU]] and the else.\n\n\n",
    "uploadDate": "2025-04-12 11:27",
    "readTime": "1 min read",
    "fileName": "Mother board.md",
    "featured": false
  },
  {
    "id": "65",
    "title": "PC",
    "excerpt": "You need to choose a [[RAM]], [[CPU]], a [[GPU]] the [[Mother board]], and the [[memory-RAM practical use]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:16\"\n---\nYou need to choose a [[RAM]], [[CPU]], a [[GPU]] the [[Mother board]], and the [[memory-RAM practical use]].\nOf course also the case, the power supply unit, and the peripheral. It's most common thing we say [[Hardware]]\n\nWe are talking outside the [[Apple]] case. That is apart with another world. Like [[laptop]]\n\nThen you need to think what [[Kernel]] are you going to use, you have two paths Windows Kernel and Linux Kernel, well the windows case is straight  \n\n>Well I have an history with my PC\n",
    "uploadDate": "2025-04-12 11:16",
    "readTime": "1 min read",
    "fileName": "PC.md",
    "featured": false
  },
  {
    "id": "66",
    "title": "Laptop",
    "excerpt": "When we say laptop, it's complex realize upgrades, portable, and that stuff.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 11:15\"\n---\nWhen we say laptop, it's complex realize upgrades, portable, and that stuff.\nFirst you need to buy one, of course here you have a lot of options.\n\nFirst you need to choose the if (money is not a worry) use Linux, Windows or Mac.\n\nLinux for developers and hard skill, Mac for creative workers, and windows for casual users. Here the Mac have the best performance in general but they are stupidly expensive for my use, I don't like creative work or visual stuff.\n\nIn this cases we are going to talk only on [[Linux]] for me the best kernel, and with \"awesome\" community. \n\nThen natural questions appears, what is the best laptop for use [[Distributions]], There is always the think pad of Lenovo, and well that is , pretty simple now what are my [[My specific use of electronic devices]] ",
    "uploadDate": "2025-04-12 11:15",
    "readTime": "1 min read",
    "fileName": "laptop.md",
    "featured": false
  },
  {
    "id": "67",
    "title": "Teraflops",
    "excerpt": "Now tell the power of a computer, tell us the quantity of operation point float",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 10:28\"\n---\nNow tell the power of a computer, tell us the quantity of operation point float\nit often used on computer.\n",
    "uploadDate": "2025-04-12 10:28",
    "readTime": "1 min read",
    "fileName": "teraflops.md",
    "featured": false
  },
  {
    "id": "68",
    "title": "Distributions",
    "excerpt": "This is only available when we talk respect [[Linux]] the people could create it's on distro because Linux is open source, of course if you want to cr...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 10:17\"\n---\nThis is only available when we talk respect [[Linux]] the people could create it's on distro because Linux is open source, of course if you want to create your own distro is not easy. \nFor *Linux* we have: Ubuntu, Arch, Debian, Red Hat ,etc.\nAnd for apple products we have \n\nEach [[Operative System OS]] have it's own kernel \n\nBut what a _distributions_ make?\nThey give it to you one starting point, they give you basic tools for use the PC. \n\n\n>Why I am using Ubuntu in my laptop? Because it's beautiful\n\nAnd we have to be very restricted with the time that we dedicated to only use Linux.\n\nI established that for the end of the cycle I will return, but now it seemed to me that for the one week for the beginning of the fourth cycle I finished with the establish, and become a arch Linux user for the beginning of the fifth cycle. I mean now I quite better with Ubuntu, and I don't have time for struggle with Linux, then the next year we make the change. \n\nAnd I think that is the better way to change to Linux, first Ubuntu and then Arch after a long time of course).\n\nNow I could use those laptops to carry to the University day to day and leave this that is the better at house.\n\nMan but it was really exciting use arch Linux , of course that I help me with that because do it manually it's a lot. but each time we are more near to the minimalism digital, the problem is respect the phone but that is another history.\n\nThe question is that I want to forget this thing and don't think on it. Until February 2026 or maybe 2027. I mean that change is important, respect the cellphone why don't use a cellphone open source. I mean exist but that is only a possibility if I have to buy a phone and I can inherit many phone so there not much reason to talk about this. \n\n",
    "uploadDate": "2025-04-12 10:17",
    "readTime": "2 min read",
    "fileName": "Distributions.md",
    "featured": false
  },
  {
    "id": "69",
    "title": "Kernel",
    "excerpt": "This is the most important thing between the communication between [[Hardware]] and [[Operative System OS]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-12 10:14\"\n---\nThis is the most important thing between the communication between [[Hardware]] and [[Operative System OS]]\n\n|        | Linux [[Distributions]] | MacOS | Windows    |\n| ------ | ----------------------- | ----- | ---------- |\n| Kernel | Linux                   | XNU   | Windows NT |\nRespect to _Microsoft_ and all the PC's that use Windows we have: Microsoft NT\nThis are the motors core of a _distribution_ often called **Distro**.\n\nOf course when we talk for Kernel first you need to know what is your _hardware_, because compatibility problems, when someone buy a mac don't think on use windows, \n\nAbstracting the most, in the case of a PC, where you can choose the components, a directly ensemble (it's really simple).\n\nOf course the most normal is use a intel/amd processator and gpu of nvidia, and for programming you the only use it that you can you make of GPU is the parallelisation.\n\n\n\n[[laptop]]\n[[PC]]\n[[Phone and tablet]]\n\nWell the Kernel most used (but people don't know) are from _Microsoft_, practically all the people who are not developers use it,  \n",
    "uploadDate": "2025-04-12 10:14",
    "readTime": "1 min read",
    "fileName": "Kernel.md",
    "featured": false
  },
  {
    "id": "70",
    "title": "Cluster Servers",
    "excerpt": "You combine a lot of [[Hardware]], (and when I refer to hardware, which are the percentages, the people, the individual and what is the percentage of ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 18:14\"\n---\nYou combine a lot of [[Hardware]], (and when I refer to hardware, which are the percentages, the people, the individual and what is the percentage of the servers used, the difference is that big?)\n, well specialised hardware for servers, I mean the better hardware, then you could save space and in certain way [[Electrical energy]] because I guess that mere fact that is turn it is on implies a use of energy. \n\nThe question is that these are connected using a specific technology for fast communication to performing thousands of asking, if one device don't work properly, this don't affects the else.\n\nThe obvious problem relies on the use of energy and refrigeration.\nFor the energy problem some of these are ubicated on countries where auto renewal energy are cheap, for instance there a server related to _Tor_ that is located on a geothermal energy place, and the technology behind it would be crazy.\n\nAnd for the refrigeration the use of water (one of the most absorbers of heat) is pretty common, I mean that is interesting , it would be a specialised kind of water for don't spoilt the devices, don't generated short circuit.\n\nThe quantity of options are biggest for that reason companies lunch new methods to optimize all the process or specific parts. For instance [[Pipe Line and Dual Pipe Line]]\n\n[[how lunch a website]]\n\n📖 [[DeepSeek-V3 Technical Report]] pp. 11",
    "uploadDate": "2025-04-10 18:14",
    "readTime": "2 min read",
    "fileName": "cluster servers.md",
    "featured": false
  },
  {
    "id": "71",
    "title": "Quantization",
    "excerpt": "And yes reduce the quantity of [[Byte]] to the numbers to increase the velocity of use of these but of course the performance of the models decay, it'...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 18:04\"\n---\nAnd yes reduce the quantity of [[Byte]] to the numbers to increase the velocity of use of these but of course the performance of the models decay, it's a good technique if you have a poor hardware.\nI guess that in somehow you cut the numbers. I mean it sounds easy but in the practical to create a package for make this is really complex I don't know.\n\nIn [[DeepSeek-V3 Technical Report]] it's talked about this. (Complex)",
    "uploadDate": "2025-04-10 18:04",
    "readTime": "1 min read",
    "fileName": "quantization.md",
    "featured": false
  },
  {
    "id": "72",
    "title": "F8P Training",
    "excerpt": "Basically to certain type data we assign more precision this is more decimals, we need to remember that the numbers are [[Byte|bytes]], this occupy a ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 17:46\"\n---\nBasically to certain type data we assign more precision this is more decimals, we need to remember that the numbers are [[Byte|bytes]], this occupy a space, a physical space in the [[Hardware]] (not so different that atomic level in the actuality), the question is that to more relevant data like parameters we assign more accuracy and to another we despite more less accuracy.\n\nWe play the game between FP8, BF16, FP32, what are this I don't know.\n\nTalk about these at the end is talk about [[quantization]].\n\n\n📖 [[DeepSeek-V3 Technical Report]] pp. 14",
    "uploadDate": "2025-04-10 17:46",
    "readTime": "1 min read",
    "fileName": "F8P Training.md",
    "featured": false
  },
  {
    "id": "73",
    "title": "Hardware One And Zeros",
    "excerpt": "Now this is very important to the technology, used by [[Deep seek]] TF8P",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 17:30\"\n---\nNow this is very important to the technology, used by [[Deep seek]] TF8P\n\nOk, we have know that hardware are the CPU,G  GPU, etc  all component physic, \nbut I have some questions, all have transistor, how the memory saves information, in zeros and ones but how exactly?\n[[Byte]]\nI mean a transistor works with tree foots, \nI mean the first thing we are going to learn is about the hard disk, I always heard about this.\n\nFirst about memory, let's understand Hard Disk and make notes with the higher quality.\n\nThis two notes are about introduction. \n[[Hard disk Drive]]\n[[Hardware]]",
    "uploadDate": "2025-04-10 17:30",
    "readTime": "1 min read",
    "fileName": "Hardware one and zeros.md",
    "featured": false
  },
  {
    "id": "74",
    "title": "Checkpoint LLM",
    "excerpt": "You need to save the checkpoints, it could be that exist a [[Electrical energy]] fail, and you lost all the advance, and you need to start again, I th...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-10 17:20\"\n---\nYou need to save the checkpoints, it could be that exist a [[Electrical energy]] fail, and you lost all the advance, and you need to start again, I think that the only that\n",
    "uploadDate": "2025-04-10 17:20",
    "readTime": "1 min read",
    "fileName": "checkpoint LLM.md",
    "featured": false
  },
  {
    "id": "75",
    "title": "Artificial Intelligence",
    "excerpt": "How we create intelligence, if a design a mechanism to move a ball we could say that the mechanism have intelligence?",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-09 15:14\"\n---\nHow we create intelligence, if a design a mechanism to move a ball we could say that the mechanism have intelligence?\n\nOf  course animals in a certain sense have intelligence, we dont ask about they but inanimadad things.\n\nFirst we call AI to all that shows an intelligent behaviour, therefore the overall idea is based on [[Emulate the human brain through computers|emulate the brain]] a task completely hard, that could be see it from different approaches.\n\nWe are talking in the most general case, the word **artificial** refers non natural, and the actuality there are a huge amount of unnatural things. \n\n[[Machine Learning]]\n\n[[Another uses of Artificial Intelligence]]\n[[Machine Learning Classification]]\n\nAnd talking respect the overall purpose\n- [[ANI]] (Narrow)\n- [[ASI]] (Super)\n- [[AGI]] (Generative)\n",
    "uploadDate": "2025-04-09 15:14",
    "readTime": "1 min read",
    "fileName": "Artificial Intelligence.md",
    "featured": false
  },
  {
    "id": "76",
    "title": "Active Parameters",
    "excerpt": "When we ask a question we only use a part of the brain, we have knowledge in distinct branch of knowledge, but a questions in general are in specific ...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-09 15:10\"\n---\nWhen we ask a question we only use a part of the brain, we have knowledge in distinct branch of knowledge, but a questions in general are in specific field. We don't need to know history to answer a question of physics, (it's true that all the branch are connect but we need to answer precise), the same it would be for active parameters? \n\n\n[[Model]]\n[[Values LLM]]",
    "uploadDate": "2025-04-09 15:10",
    "readTime": "1 min read",
    "fileName": "Active Parameters.md",
    "featured": false
  },
  {
    "id": "77",
    "title": "Machine Learning",
    "excerpt": "> Inside of this we have to the branch of science with more develop in the last decade, [[Deep learning, what it is?]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 08:17\n---\n> Inside of this we have to the branch of science with more develop in the last decade, [[Deep learning, what it is?]].\n\nThis is a sub branch of the most general [[Another uses of Artificial Intelligence]]\n\n[[Machine Learning Classification]]\n\nHere the combination of [[Hardware]] and [[Software]] \"learn\" and practically when we say AI we are referring to this\n\nA rigorous form of describe it?\n\nInstead of elaborate a complex algorithm to perform a task that is very complex \n,trough trial and error we can create a algorithm to do this, and the better is that we can generalize this.\nWe search to a[[Model]] predict something.\n\ndecision trees, linear regression, that kind of thing. \n\n\nWe need to think a word that always appear in the Machine learning world.\nUntil now I don't what a [[AI agent]] is.",
    "uploadDate": "2025-04-09 08:17",
    "readTime": "1 min read",
    "fileName": "Machine Learning.md",
    "featured": false
  },
  {
    "id": "78",
    "title": "O1 Model",
    "excerpt": "This o1 model surpass its equals by increasing the [[Test time compute]]. Which translate on more use of hardware, more money, more energy and more ti...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 07:55\n---\nThis o1 model surpass its equals by increasing the [[Test time compute]]. Which translate on more use of hardware, more money, more energy and more time, gold resources in the actuality, but its performance is amazing.\n\n[o1 model](https://openai.com/o1/)\n\n",
    "uploadDate": "2025-04-09 07:55",
    "readTime": "1 min read",
    "fileName": "o1 model.md",
    "featured": false
  },
  {
    "id": "79",
    "title": "OpenAI",
    "excerpt": "This is one of the biggest [[Big Tech Companies|tech companies]] that lead the [[Machine Learning|machine learning]] respect products, respect researc...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 07:47\n---\nThis is one of the biggest [[Big Tech Companies|tech companies]] that lead the [[Machine Learning|machine learning]] respect products, respect research I don't know. This company start with the idea of make free and open services for people but they choose lucrar de estos servicios, which is normal for the quality of these.\n\nOne important turning point was the realese of Chatgtp, and the [[o1 model]].\n\nOf course they are going to keep launching new things, the kind of persons who lider this kind of companies never stop when they start. They want it all.\n\nWhy Sant Altman is very popular?\n\n>I wonder what will be the future of this company in ten years (April-09-2025)\n\n[Open AI research](https://openai.com/research/index/) ",
    "uploadDate": "2025-04-09 07:47",
    "readTime": "1 min read",
    "fileName": "OpenAI.md",
    "featured": false
  },
  {
    "id": "80",
    "title": "Computer Vision",
    "excerpt": "Ok, this is where [[Alex Net]] shined.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-04-09 07:16\n---\nOk, this is where [[Alex Net]] shined.\nAnd here the the most used is [[Convolution Neural Network]], that work perfectly recognize borders and that stuff. \n\nRemember that there is this book (old one) about this topic on the library, exist a ton of method to approach this problem.\n\nAnd okay state-of-the-art models (LLama-Vision) have the stuff necessary to process images (e.g [[Convolution Neural Network]]) but if you want a more detailed output descriptions for example you need a [[large language model]], also is good use some formula to throw away a number (classification) like the Alex Net case.\n\nThose are [[vllm]]\n",
    "uploadDate": "2025-04-09 07:16",
    "readTime": "1 min read",
    "fileName": "computer vision.md",
    "featured": false
  },
  {
    "id": "81",
    "title": "Classification Using AI",
    "excerpt": "How we said that this image is a dog? A complex question, this is completely [[computer vision]]",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 19:20\"\n---\nHow we said that this image is a dog? A complex question, this is completely [[computer vision]]\nAnd what another thing would be useful\n\n\nIf you mention to [[Birth of LLMs]] a book of it know if the book belong to Drama, Academic or Life style, I think is for the nature of words used.",
    "uploadDate": "2025-04-08 19:20",
    "readTime": "1 min read",
    "fileName": "classification using AI.md",
    "featured": false
  },
  {
    "id": "82",
    "title": "Function AI",
    "excerpt": "There exist a lot of function that are very used on AI literature and I don't understand for instance. arg min",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 18:55\"\n---\nThere exist a lot of function that are very used on AI literature and I don't understand for instance. arg min\nThat is pretty easy to understand, ,$argmin_{x}f(x)$, return a element of the domain that _minimize_ the function, instead $min_{x}f(x)$ return said value.\nIf we have many inputs that subscript refer which are choosing. \n\nAlso exist $argmax$, is obvious what makes.\n\n_Example:_ In the context of [[classification using AI]]\n\n$$\n\\hat{y}=argmax_{y}\\mathbb{P}(y|x)\n$$\n\nThis gives the most probable class label $y$ for input $x$.\n\n\n[[SoftMax Function]] is one.",
    "uploadDate": "2025-04-08 18:55",
    "readTime": "4 min read",
    "fileName": "function AI.md",
    "featured": false
  },
  {
    "id": "83",
    "title": "Function Used In Literature AI",
    "excerpt": "There exist a lot of function that are very used on AI literature and I don't understand for instance. arg min",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 18:55\"\n---\nThere exist a lot of function that are very used on AI literature and I don't understand for instance. arg min\nThat is pretty easy to understand, ,$argmin_{x}f(x)$, return a element of the domain that _minimize_ the function, instead $min_{x}f(x)$ return said value.\nIf we have many inputs that subscript refer which are choosing. \n\nAlso exist $argmax$, is obvious what makes.\n\n_Example:_ In the context of [[classification using AI]]\n\n$$\n\\hat{y}=argmax_{y}\\mathbb{P}(y|x)\n$$\n\nThis gives the most probable class label $y$ for input $x$.\n\n\n[[SoftMax Function]] is one.",
    "uploadDate": "2025-04-08 18:55",
    "readTime": "4 min read",
    "fileName": "function used in literature AI.md",
    "featured": false
  },
  {
    "id": "84",
    "title": "AI Agent",
    "excerpt": "And if always is about **AI agents** and currently they are the last use of [[Artificial Intelligence]], I mean the most advanced tool.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-04-08 10:53\"\n---\nAnd if always is about **AI agents** and currently they are the last use of [[Artificial Intelligence]], I mean the most advanced tool.\n\nI need to use one, only for prove I would say. It's like have a virtual assistant who would say that Jarvis already exist.\n\nImagine have all with this automation, programming. I don't need any information that don't comes from a book.\n\nAnd I think that the use of interfaces kill what really are computers. \n KIMI K2, a good example I think\n[huggingface.co/moonshotai](https://t.co/4ukcXB0iP6)\n\nOk, let's say that you want to automatize all the boring or repetitive task, \nit's like a the calculator, you don't need to sum or multiplicate, but in this case you loose mental velocity, in the case of AI agent you lost something I would say no.\n\nIn my case I don't need one, (I could create someone who is able to make the same things that I do?) , I past all the time making exciting things, but I'm really excited about the function of these. \n\nthink it like this all the time you are in the risky or your acknowledge, you don't lost time eating, walking, bath things.\n\nToday I past a great amount of time trying OneDrive work well on Ubuntu, I could make that AI agent make that chore?\n\nOk, but [[Lang Chain]] is the implementation \n",
    "uploadDate": "2025-04-08 10:53",
    "readTime": "1 min read",
    "fileName": "AI agent.md",
    "featured": false
  },
  {
    "id": "85",
    "title": "Data Set   Problem To Obtain High Quality Data",
    "excerpt": "I mean now that I have to make something the question that have a high quality data set is a problem but first you have to be very clear what are goin...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-03-26 23:57\"\n---\nI mean now that I have to make something the question that have a high quality data set is a problem but first you have to be very clear what are going to make,\nand for a single person it's a lot of work to recolectate huge amount of high quality data. \n\nExist several techniques to collect data one that I heard a lot is about Scrapping.\n\nAnd exist a lot of ways to make a model learn the data that we have, \none that the most know are.\n\n- [[Fine Tune]]\n- [[RAG]]\n\nand specifically talking there is this thing of _verl_ tambien esta DPO que le enseñamos a preferir ciertas respuestas,RLHF RL with human feedback and a lot of things.\n\nAnd here you need some of creativity to say what project I could perform.\nfor instance learn to the model talk in a specific way, I mean for that you use simply chatgtp but if you want that the model learn and don't say it specifically?, and for companies that have a lot of data and want take advantage of that, I mean the works on Data Scients are very asked, maybe there we can make something, I see it interesting.\n\nAnd what about the API of chatgtp, I think it is more useful to make lighten things, because at the end you are using chatgtp setting for your purpose, you are not changing the model, the model behaviour changes not change itself.",
    "uploadDate": "2025-03-26 23:57",
    "readTime": "1 min read",
    "fileName": "Data set-  Problem to obtain high quality data.md",
    "featured": false
  },
  {
    "id": "86",
    "title": "Alex Net",
    "excerpt": "Alex net was the turning point on the chronology of AI.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-03-26 23:56\"\n---\nAlex net was the turning point on the chronology of AI.\nIt would be the first of the class generative.\n\n\n\n[[Geoffrey Hinton]] participated here, and basically Alex Net was the first to use this mount of budget, people, and data in a model, it task was recognize of images.\n\nYou give tons of image to a model in somehow it can create its own images, that is not amazing? Well we need to differentiate between classification task and generator class,\nand the generate is a new world. [[image generator]]\n\nThe question is the How?\n\nI don't think that for recreate Alex Net it would be necessary have an incredible budget, because currently the cheap for that hardware is decreased. (That I guess) and that is really a good project.\n\n\n\n\nThis is [[computer vision]]. And here is where left to understand machine learning.\n\n",
    "uploadDate": "2025-03-26 23:56",
    "readTime": "1 min read",
    "fileName": "Alex Net.md",
    "featured": false
  },
  {
    "id": "87",
    "title": "Universal Approximation Theorem",
    "excerpt": "And this is a pretty result completely mathematician, but with an awesome application.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-03-02 13:46\"\n---\nAnd this is a pretty result completely mathematician, but with an awesome application.\n\nA [[Feed Forward Neural Network]] with at least one hidden layer and **non-linear** activation functions can approximate any continuous function. So this [[linearity on DL]]\n\n",
    "uploadDate": "2025-03-02 13:46",
    "readTime": "1 min read",
    "fileName": "Universal Approximation Theorem.md",
    "featured": false
  },
  {
    "id": "88",
    "title": "Multimodal Large Language Model",
    "excerpt": "This model not only tries to understand the language but also the images, images 3d, sounds, videos, audio , everything that could be represented in a...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-28 18:29\n---\nThis model not only tries to understand the language but also the images, images 3d, sounds, videos, audio , everything that could be represented in a file. \n\nIs a subset of [[large language model]]\n\nImagine that exist a chatgtp but for videos, you give it a video and the model tell you with accuracy what's happening or a 3 dimensional file and the model tell you what represents. \n\nIt's something very crazy I mean actually exist model for image very goods @ferret\n\nData from sensors, GPS data, any tracker device, like movement of airplanes.  I mean the imagination is the limit.\n\n[[Birth of LLMs]]\n\n",
    "uploadDate": "2025-02-28 18:29",
    "readTime": "1 min read",
    "fileName": "Multimodal Large Language Model.md",
    "featured": false
  },
  {
    "id": "89",
    "title": "Positional Encoding",
    "excerpt": "But no matter, all what at the end cares is the [[positional embedding matrix]].",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: 2025-02-25 23:57\n---\nBut no matter, all what at the end cares is the [[positional embedding matrix]].\n\nIt's very important the position of the word (NLP), the most simply is assign a natural number according to the apparition of the word, I mean it's easiest way (complexity linear). But I think that emerges a problem how we relate the vector of a word to a number.\n\nWe can use RNN's that learn the position of the embeddings. \n\nUsing [[Convolution Neural Network]] also it's possible @gehringConvolutionalSequenceSequence2017\n\nUsing [[Transformer]] lack recurrence thus is not possibly to know the position of a word. @Vaswani2017\n\nDeep Seek use another form called Rotatory and decoupled rotatory position.",
    "uploadDate": "2025-02-25 23:57",
    "readTime": "1 min read",
    "fileName": "Positional encoding.md",
    "featured": false
  },
  {
    "id": "90",
    "title": "Add And Normalize",
    "excerpt": "After apply the [[Self attention mechanism on one head|self attention mechanism]] and the [[FFN on Transformers|FFN]] we have add the vector to the ou...",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-25 22:06\"\n---\nAfter apply the [[Self attention mechanism on one head|self attention mechanism]] and the [[FFN on Transformers|FFN]] we have add the vector to the output of these two.\nI mean \nResidual Connections\n\n[[batch normalization]]\n\nLayer Normalization\n",
    "uploadDate": "2025-02-25 22:06",
    "readTime": "1 min read",
    "fileName": "Add and normalize.md",
    "featured": false
  },
  {
    "id": "91",
    "title": "AGI",
    "excerpt": "Artificial General Intelligence.",
    "content": "---\ntags:\n  - baby\n  - ml\nauthor: Jorge\ndate: \"2025-02-25 17:28\"\n---\nArtificial General Intelligence.\nFrom the release of ChatGTP on 2022 we see a explosion of examples on this field. [[OpenAI]]\nBut we can't say that it was the first one, that was [[Alex Net]].\n\nThese aim to copy the intelligence human (but not emulate it?) for instance If I ask to Deep Seek to resolve a problem of physics the most probably is that it will, he will copy the steps that were shown in the [[Training Phase LLM |training phase]].\n\n ",
    "uploadDate": "2025-02-25 17:28",
    "readTime": "1 min read",
    "fileName": "AGI.md",
    "featured": false
  },
  {
    "id": "92",
    "title": "Machine Learning MOC",
    "excerpt": ">We are here because I want form part of a startup where I can learn a lot about this world and people. And the sufficient experience to enter to the ...",
    "content": "---\ntags:\n  - young\n  - ml\nauthor: Jorge\ndate: \"2025-02-25 17:24\"\n---\n>[!tip]\n>We are here because I want form part of a startup where I can learn a lot about this world and people. And the sufficient experience to enter to the Work|work world, scale, and get improving with time. There exist interesting [jobs](antropicJob.png) in this world. \n\nThis is currently the most exciting field of science ([[Deep learning, what it is?]]). If we observe it, there are thousand of people trying to [[Emulate the human brain through computers|emulate the brain]], probably currently the field with more activity on the last decade, Is not the most complicated thing that humanity tried? \nWe could be able to obtain truly artificial intelligence?, One able to get better by himself?, Perfection itself because it want it?\n\n_A difference respect with my theoretical study is that here I need to present the work result of my study to Joel_. But I'm not accustomed to study and put it instantly on practice, change of mindset respect curiosity|I need to change the mindset. I will split the time in theoretical and practice. (Practice=[[Programming]])\n\n_Paragraphs:_\n1. Ulterior intentions.\n2. Interesting part, theory, practical and philosophy implications. \n3. Change of Mindset.\n\n",
    "uploadDate": "2025-02-25 17:24",
    "readTime": "1 min read",
    "fileName": "Machine Learning MOC.md",
    "featured": false
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
  }
];

export default blogPosts;
