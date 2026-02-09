
export enum Category {
  BITCOIN = 'bitcoin',
  BUSINESS = 'business',
  POLITICS = 'politics',
  FITNESS = 'fitness',
  RELIGION = 'religion',
  ALL = 'all'
}

export interface BlogPost {
  id: string;
  title: string;
  category: Category;
  excerpt: string;
  date: string;
  image: string;
  tag: string;
}