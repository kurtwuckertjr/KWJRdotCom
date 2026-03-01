export enum Category {
  BITCOIN = 'bitcoin',
  BUSINESS = 'business',
  POLITICS = 'politics',
  FITNESS = 'fitness',
  RELIGION = 'religion',
  ALL = 'all',
}

export type PostStatus = 'draft' | 'review' | 'published' | 'archived';

export interface SeoMetadata {
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface Post {
  id: string;
  title: string;
  category: Category;
  categories: Category[];
  excerpt: string;
  date: string; // ISO 8601
  image: string;
  tag: string;
  markdown_source: string;
  rendered_html: string;
  component_map: ComponentNode[];
  word_count: number;
  json_ld: Record<string, unknown>;
  seo_metadata: SeoMetadata;
  schema_version: number;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

/** Lightweight metadata used in list views and build-time fetches */
export interface PostMeta {
  id: string;
  title: string;
  category: Category;
  categories: Category[];
  excerpt: string;
  date: string;
  image: string;
  tag: string;
  status: PostStatus;
  word_count: number;
  published_at: string | null;
}

/** A node in the component map rendered by DynamicPostRenderer */
export interface ComponentNode {
  type: string;
  props: Record<string, unknown>;
  children?: (ComponentNode | string)[];
}
