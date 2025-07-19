import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Search, Clock, Upload, File, ArrowLeft, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  uploadDate: string;
  readTime: string;
  fileName: string;
}

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  const noteId = params.id;

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Newton\'s Laws Through LaTeX',
      excerpt: 'Exploring the mathematical beauty of classical mechanics using LaTeX notation.',
      content: `# Newton's Laws of Motion

## First Law (Law of Inertia)
An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.

Mathematically: $$\\sum \\vec{F} = 0 \\Rightarrow \\vec{v} = \\text{constant}$$

## Second Law
The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.

$$\\vec{F} = m\\vec{a}$$

Where:
- $\\vec{F}$ = Net force (Newtons)
- $m$ = Mass (kg)  
- $\\vec{a}$ = Acceleration (m/s²)

For variable mass systems:
$$\\vec{F} = \\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt}$$

## Third Law
For every action, there is an equal and opposite reaction.

$$\\vec{F}_{AB} = -\\vec{F}_{BA}$$

The magnitude of forces: $|\\vec{F}_{AB}| = |\\vec{F}_{BA}|$

These fundamental principles form the backbone of classical mechanics and are essential for understanding motion in our everyday world.`,
      uploadDate: '2025-01-15',
      readTime: '5 min read',
      fileName: 'newtons-laws.md'
    },
    {
      id: '2',
      title: 'Linear Algebra Notes: Vector Spaces',
      excerpt: 'Comprehensive notes on vector spaces, linear independence, and basis transformations.',
      content: `# Vector Spaces

## Definition
A vector space $V$ over a field $F$ is a set of objects called vectors, together with two operations: vector addition and scalar multiplication.

## Properties
1. **Closure under addition**: If $\\vec{u}, \\vec{v} \\in V$, then $\\vec{u} + \\vec{v} \\in V$
2. **Closure under scalar multiplication**: If $\\vec{v} \\in V$ and $c \\in F$, then $c\\vec{v} \\in V$
3. **Associativity**: $(\\vec{u} + \\vec{v}) + \\vec{w} = \\vec{u} + (\\vec{v} + \\vec{w})$
4. **Commutativity**: $\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}$
5. **Zero vector**: There exists $\\vec{0} \\in V$ such that $\\vec{v} + \\vec{0} = \\vec{v}$ for all $\\vec{v} \\in V$

## Linear Independence
A set of vectors $\\{\\vec{v}_1, \\vec{v}_2, ..., \\vec{v}_n\\}$ is linearly independent if the only solution to:

$$c_1\\vec{v}_1 + c_2\\vec{v}_2 + ... + c_n\\vec{v}_n = \\vec{0}$$

is $c_1 = c_2 = ... = c_n = 0$.

## Basis and Dimension
A **basis** of vector space $V$ is a set of vectors that:
1. Spans $V$: $\\text{span}(\\{\\vec{v}_1, \\vec{v}_2, ..., \\vec{v}_n\\}) = V$
2. Is linearly independent

The **dimension** of $V$ is: $\\dim(V) = n$ where $n$ is the number of vectors in any basis.`,
      uploadDate: '2025-01-12',
      readTime: '8 min read',
      fileName: 'vector-spaces.md'
    },
    {
      id: '3',
      title: 'React Hooks Deep Dive',
      excerpt: 'Advanced patterns and best practices for React Hooks, including custom hooks.',
      content: `# React Hooks Deep Dive

## useState Hook
The most basic hook for managing state in functional components.

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook
Handles side effects in functional components.

\`\`\`javascript
useEffect(() => {
  // Side effect logic
  return () => {
    // Cleanup logic
  };
}, [dependencies]);
\`\`\`

## Custom Hooks
Create reusable stateful logic between components.

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
\`\`\``,
      uploadDate: '2025-01-10',
      readTime: '12 min read',
      fileName: 'react-hooks-deep-dive.md'
    },
    {
      id: '4',
      title: 'Quantum Computing Basics',
      excerpt: 'Introduction to qubits, superposition, and quantum gates explained simply.',
      content: `# Quantum Computing Basics

## Qubits
Unlike classical bits that can only be 0 or 1, qubits can exist in a superposition of both states.

The state of a qubit can be represented as:
$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$$

Where $\\alpha$ and $\\beta$ are complex numbers such that $|\\alpha|^2 + |\\beta|^2 = 1$.

## Superposition
A quantum system can exist in multiple states simultaneously until measured.

## Quantum Entanglement
When qubits become correlated in such a way that the measurement of one instantaneously affects the other, regardless of distance.`,
      uploadDate: '2025-01-08',
      readTime: '10 min read',
      fileName: 'quantum-computing-basics.md'
    },
    {
      id: '5',
      title: 'Calculus: Integrals and Derivatives',
      excerpt: 'Advanced calculus concepts with beautiful LaTeX mathematical expressions.',
      content: `# Calculus: Integrals and Derivatives

## Fundamental Theorem of Calculus
The connection between derivatives and integrals:

$$\\int_a^b f'(x) \\, dx = f(b) - f(a)$$

## Derivative Rules

### Power Rule
$$\\frac{d}{dx}[x^n] = nx^{n-1}$$

### Product Rule  
$$\\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$$

### Chain Rule
$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$

## Integration Techniques

### Integration by Parts
$$\\int u \\, dv = uv - \\int v \\, du$$

### Substitution Method
If $u = g(x)$, then:
$$\\int f(g(x))g'(x) \\, dx = \\int f(u) \\, du$$

## Advanced Examples

### Taylor Series
$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$

For $e^x$:
$$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$

### Fourier Transform
$$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} \\, dt$$

### Partial Derivatives
For multivariable functions $f(x,y)$:
$$\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial^2 f}{\\partial y \\partial x}$$`,
      uploadDate: '2025-01-14',
      readTime: '15 min read',
      fileName: 'calculus-advanced.md'
    }
  ];

  // Initialize posts with sample data
  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(blogPosts);
    }
  }, [posts.length]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.md')) {
      alert('Please select a .md file');
      return;
    }

    const content = await file.text();
    const title = file.name.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Extract excerpt from first paragraph
    const lines = content.split('\n').filter(line => line.trim());
    const excerpt = lines.find(line => !line.startsWith('#') && line.trim().length > 20)?.substring(0, 150) + '...' || 'No excerpt available';
    
    // Estimate read time (average 200 words per minute)
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / 200) + ' min read';

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content,
      excerpt,
      uploadDate: new Date().toISOString().split('T')[0],
      readTime,
      fileName: file.name
    };

    setPosts(prev => [newPost, ...prev]);
    event.target.value = ''; // Reset file input
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // If we have a noteId, find and display that specific note
  if (noteId) {
    const selectedPost = posts.find(post => post.id === noteId);
    
    if (!selectedPost) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Note Not Found</h1>
              <p className="text-gray-300 mb-8">The note you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/notes')} className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Notes
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/notes')} 
              variant="ghost" 
              className="text-blue-400 hover:text-blue-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{selectedPost.title}</h1>
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedPost.uploadDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedPost.readTime}
                  </span>
                  <span className="text-xs">
                    File: {selectedPost.fileName}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // You could add a toast notification here
                }}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>
          </div>

          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeHighlight, rehypeKatex]}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">My Learning Notes</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of my thoughts, discoveries, and learnings in mathematics, physics, and computer science.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Upload Section */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Upload className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">Upload New Note</h3>
                  <p className="text-sm text-gray-300">Upload a .md file to add it to your collection</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".md"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <File className="w-4 h-4 mr-2" />
                  Choose .md file
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notes found</h3>
              <p className="text-gray-500">Try adjusting your search or upload a new note.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="bg-gray-800 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link 
                        to={`/notes/${post.id}`}
                        className="text-2xl mb-2 text-white hover:text-blue-400 transition-colors font-semibold"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.uploadDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        <span className="ml-4 text-xs text-gray-400">
                          File: {post.fileName}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <Link 
                      to={`/notes/${post.id}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Read Full Note
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/notes/${post.id}`);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notes;
