---
tags:
  - baby
date: 2025-12-23 16:31
modified: 2025-12-23 16:34
---
Let's say that your sensor read that one angle of one joint of your robot is $146$ degrees. You can't work with those numbers with the neural network, the numbers that neural networks like are small, then gradients don't explode or vanish. So you are going to normalize those numbers.

Now the question is: Are just the robot state normalizable? What another states we will like to be normalize it.