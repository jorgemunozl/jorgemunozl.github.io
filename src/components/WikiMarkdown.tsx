import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { processWikiLinksToMarkdown } from '@/utils/wikiLinks';
import { convertObsidianMathSyntax } from '@/utils/mathSyntax';
import type { BlogPost } from '@/components/data/notes';

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
        rehypePlugins={[rehypeKatex]}
        components={{
          pre: ({ children, ...props }) => (
            <pre
              className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-[\w-]+/.test(className ?? '');
            if (isBlock) {
              return (
                <code className={`font-mono text-sm ${className ?? ''}`} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
                {...props}
              >
                {children}
              </code>
            );
          },
          img: ({ src = '', alt = '', ...props }) => {
            // Prefix non-external image srcs with Vite base URL
            const isExternal = /^(?:[a-z]+:)?\/\//i.test(src) || src.startsWith('data:');
            let finalSrc = src;
            if (!isExternal) {
              const base = (import.meta as any).env?.BASE_URL || '/';
              finalSrc = `${base}${String(src).replace(/^\/+/, '')}`;
            }
            return <img src={finalSrc} alt={alt} {...props} />;
          },
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
                  className="text-black dark:text-purple-400 hover:text-gray-800 dark:hover:text-purple-300 underline cursor-pointer font-medium transition-colors"
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
                  className="text-black dark:text-purple-400 hover:text-gray-800 dark:hover:text-purple-300 underline"
                  {...props}
                >
                  {children}
                </a>
              );
            }
            
            // Regular links
            return <a href={href} className="text-black dark:text-purple-400 hover:text-gray-800 dark:hover:text-purple-300 underline" {...props}>{children}</a>;
          }
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default WikiMarkdown;
