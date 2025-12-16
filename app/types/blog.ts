// app/types/blog.ts

export interface BlogAuthor {
  name: string;
  avatar: string;
  position: string;
  bio?: string;
}
  
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  featured: boolean;
  alternateSlug?: string; // Added this property with optional flag
}
  
export interface BlogContent {
  title: string;
  description: string;
  categories: string[];
  posts: BlogPost[];
  featured: BlogPost[];
}