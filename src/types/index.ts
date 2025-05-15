export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  category: Category;
  readingTime: number;
  url: string;
}

export type Category = 
  | 'technology'
  | 'business'
  | 'health'
  | 'entertainment'
  | 'science'
  | 'sports'
  | 'politics'
  | 'world';

export interface UserPreferences {
  darkMode: boolean;
  preferredCategories: Category[];
  bookmarkedArticles: string[]; // Article IDs
}