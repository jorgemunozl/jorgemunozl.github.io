---
tags:
  - baby
date: "2025-12-23 20:39"
modified: 2025-08-06T23:12:25-05:00
---
The training phase of the pi 05 model consist in two stages, pre-training and post training.

In practice you only make the post training using the 

 Model is initialize from a [[Vision Language Model VLM]].
1. Pre-train the model heterogeneous mixture of training tasks. Different robotic arms. I guess that in this step the action generator, what? I mean it should be a Degree of Freedom.
2. Fine tune it specifically for mobile manipulation with both low-level action examples (**teleoperation**) and subtask label prediction.