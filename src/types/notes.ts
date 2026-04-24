/** Shared note types (content lives in generated `notesBodies.ts`). */

export interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  uploadDate: string;
  readTime: string;
  fileName: string;
  featured: boolean;
}

export type BlogPost = BlogPostMeta & { content: string };
