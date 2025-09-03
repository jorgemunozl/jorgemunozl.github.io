import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import { processWikiLinksToMarkdown } from '@/utils/wikiLinks';
import { convertObsidianMathSyntax } from '@/utils/mathSyntax';
import type { BlogPost } from '@/data/notes';

interface WikiMarkdownProps {
  content: string;
  posts: BlogPost[];
  onWikiLinkClick?: (target: string) => void;
  className?: string;
}

const WikiMarkdown: React.FC<WikiMarkdownProps> = ({ 
  content, 
  posts,
  onWikiLinkClick, 
  className = '' 
}) => {
  // Process the content: first convert Obsidian math syntax, then wiki links
  const mathProcessedContent = convertObsidianMathSyntax(content);
  const processedContent = processWikiLinksToMarkdown(mathProcessedContent, posts);

  // Function to generate ID from heading text
  const generateId = (text: string): string => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // Custom heading components
  const createHeadingComponent = (level: number) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return ({ children, ...props }: any) => {
      const text = React.Children.toArray(children).join('');
      const id = generateId(text);
      return React.createElement(Tag, { id, ...props }, children);
    };
  };

  return (
    <div className={`${className} wiki-markdown`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }], rehypeKatex]}
        components={{
          // Custom heading components with auto-generated IDs
          h1: createHeadingComponent(1),
          h2: createHeadingComponent(2),
          h3: createHeadingComponent(3),
          h4: createHeadingComponent(4),
          h5: createHeadingComponent(5),
          h6: createHeadingComponent(6),
          a: ({ href, children, ...props }) => {
            // Handle wiki links
            if (href?.startsWith('wiki:')) {
              const postId = href.replace('wiki:', '');
              return (
                <button
                  className="text-purple-400 hover:text-purple-300 underline cursor-pointer font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onWikiLinkClick) {
                      onWikiLinkClick(postId);
                    }
                  }}
                >
                  {children}
                </button>
              );
            }
            
            // Handle broken links
            if (href?.startsWith('broken:')) {
              const target = href.replace('broken:', '');
              return (
                <span 
                  className="text-red-400 line-through cursor-help"
                  title={`Note "${target}" not found`}
                >
                  {children}
                </span>
              );
            }
            
            // Handle external links
            if (href?.startsWith('http')) {
              return (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                  {...props}
                >
                  {children}
                </a>
              );
            }
            
            // Regular links
            return <a href={href} className="text-purple-400 hover:text-purple-300 underline" {...props}>{children}</a>;
          }
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default WikiMarkdown;
