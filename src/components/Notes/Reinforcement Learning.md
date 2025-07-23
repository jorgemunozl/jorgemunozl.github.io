---
tags:
  - baby
  - ml
author: Jorge
date: 2025-02-24 18:36
---
>Is full trial and error with feedback.

Reinforcement learning is a field of Artificial Intelligence, where an abstract object (an agent) learns.

[[State of the art agents]]

It's like a student looking for his way to solve a problem, he has certain tools, examples and theory (_environment_).

He would take different actions depending on whether he is able to resolve it or not.

If we want to take it to the world of computing there exists three things to consider, _the sensation or stimuli , the action or answer to that sensation and the feedback or reward._

Introducing terminology used in this field:
- **Agent** it's the student, in this case the one who is going to learn, we use it to refer to a model.
- **Policy** it's the way of behaving, it's a function that takes a state and turns it into an action.
- **Reward** A real number that tells us how good the agent is doing. or if it is doing bad things/actions we don't reward them, instead we penalize them.
- **Value Function** Thinking in a long term, change the way we see the rewards, therefore the actions also. -> [[value function]]
- _Model_ of the environment: where our agent is located.

[[reinforcement learning from human feedback]]

Approach to machine learn
- No value functions -> evolutionary methods
- Policy gradients methods -> Use of parameters

We can't forget that exist this dilemma _Exploration or exploitation_.

Now exist a whole theory on this how I should approached.
I mean also there is a relation with Montecarlo Method, because you need to some random fluctiations to advance.

It's a branch of [[Machine Learning Classification]]

And are amazing visualize it, there this videos where you could see it more specifically. How agents learn, there is this video of the car, is great example, and I don't know that it was a combination and of [[Feed Forward Neural Network]] and use of _Policy_. Of course they use a kind of evolutionary method.
we could say that this branch is one of the most used.

[[Reinforcement Learning Lectures]]

[You Tube Playlist](https://www.youtube.com/watch?v=2pWv7GOvuf0&list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ) by David Silver 