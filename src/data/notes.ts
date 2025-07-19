// Auto-generated file - do not edit manually
// Generated on: 2025-07-19T20:47:20.319Z

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  uploadDate: string;
  readTime: string;
  fileName: string;
}

export const blogPosts: BlogPost[] = [
  {
    "id": "1",
    "title": "FFN Structure",
    "excerpt": "The structure of a [[FFN working]] is composed mainly by columns, exist three types of this, the first is the **_input_** layer, the **intermediate** ...",
    "content": "---\ntags:\n  - baby\n  - ml\n  - connection\nauthor: Jorge\ndate: \"2025-02-05 17:06\"\n---\nThe structure of a [[FFN working]] is composed mainly by columns, exist three types of this, the first is the **_input_** layer, the **intermediate** are the **_hidden_** layers and the last is the ***output*** layer. ![[Neural Network Structure.png|346x301]]\n\n- Each layer could has many neurons as it wanted it. (I guess is more practical if all the layers has the same of neurons). Exist certain arbitrarily.\n- Of course we need a way of track each neuron , layers and weight for that purpose like we said we used _matrix and vectors_ typical notation. ([[Feed-forward neural network]])\n\n>A more interesting structure is the one that uses the [[Hopfield Networks]].\n\n**Ref**. [[Neural Networks and Deep Learning]]",
    "uploadDate": "2025-02-05 17:06",
    "readTime": "1 min read",
    "fileName": "FFN Structure.md"
  },
  {
    "id": "2",
    "title": "My Social Networks",
    "excerpt": "No excerpt available",
    "content": "\n\n[[LinkedIn]]\n[[Github-Git]]\n[[Curriculum Vitae]]\n[[twitter account]]",
    "uploadDate": "2025-07-19",
    "readTime": "1 min read",
    "fileName": "my social networks.md"
  }
];

export default blogPosts;
