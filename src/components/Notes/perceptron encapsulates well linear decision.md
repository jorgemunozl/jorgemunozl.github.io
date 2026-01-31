---
tags:
  - baby
author: Jorge
date: 2024-10-30 10:36
modified: 2025-08-18 22:13
---
Let's say that you are deciding if you wanna hang out with your friends or stay at home and study. To take the decision exists some factors. 
For instance how is the weather? Do you have exams? Do you have money? Each of these factors are not equally important.  (Three factors)

So let's assign to each decision a **weight**, and for simplicity the answers are , yes or no, one or zero. 

If the sum of the weight/answer is greater than a certain threshold you go out, if not stay at home studying.

How could this be viewed?

Three input and one unique output that depend on the inputs, each arrow reflects a weight and the output has it own **threshold**.


Here those parameters are decided by you,

but if you want a better generalization about the matter of study or hang out, you would need to ask hundreds of people ,the information of the answer to the question is your data set. 

You would ask the three questions, annotate the yes or not and the final output. So that would be your training data set, you don't know the values of the weights and the threshold. 






















So in deep learning literature we notate:

Bias.- is a measure of how easy it is to get the neuron to fire, remember the bias is the negative of the threshold , then if is it _very positive is very easy_ to get fire, and if it is _very negative is hard_ to the perceptron get fire.

Weights.- Like the humans give more priority to specific factors to take decision, the weigh reflect the same.
