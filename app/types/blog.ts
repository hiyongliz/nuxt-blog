/**
 * TypeScript interfaces for blog post data structures
 */

export interface BlogPostMeta {
  duration?: string
  author?: string
  type?: string
  [key: string]: any // Allow additional meta properties
}

export interface BlogPost {
  id: string
  title: string
  date: string
  description?: string
  image?: string
  imageCaption?: string
  tags?: string[]
  path: string
  body?: string | Record<string, any>
  meta?: BlogPostMeta
  [key: string]: any // Allow additional properties
}

export interface BlogPostListItem extends BlogPost {
  // Additional properties specific to list items if needed
}
