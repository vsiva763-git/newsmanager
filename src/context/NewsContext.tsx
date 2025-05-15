import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Article, Category, UserPreferences } from '../types';
import { MOCK_ARTICLES, CATEGORIES } from '../constants/mockData';

type NewsContextType = {
  articles: Article[];
  filteredArticles: Article[];
  categories: Category[];
  activeCategory: Category | 'all';
  searchQuery: string;
  userPreferences: UserPreferences;
  setActiveCategory: (category: Category | 'all') => void;
  setSearchQuery: (query: string) => void;
  toggleBookmark: (articleId: string) => void;
  toggleCategoryPreference: (category: Category) => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const defaultUserPreferences: UserPreferences = {
  darkMode: false,
  preferredCategories: ['technology', 'business', 'science'],
  bookmarkedArticles: [],
};

export function NewsProvider({ children }: { children: ReactNode }) {
  const [articles] = useState<Article[]>(MOCK_ARTICLES);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultUserPreferences;
  });

  // Filter articles based on active category and search query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Save user preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  const toggleBookmark = (articleId: string) => {
    setUserPreferences(prev => {
      const bookmarked = prev.bookmarkedArticles.includes(articleId);
      const updatedBookmarks = bookmarked
        ? prev.bookmarkedArticles.filter(id => id !== articleId)
        : [...prev.bookmarkedArticles, articleId];
      
      return {
        ...prev,
        bookmarkedArticles: updatedBookmarks
      };
    });
  };

  const toggleCategoryPreference = (category: Category) => {
    setUserPreferences(prev => {
      const isPreferred = prev.preferredCategories.includes(category);
      const updatedCategories = isPreferred
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category];
      
      return {
        ...prev,
        preferredCategories: updatedCategories
      };
    });
  };

  return (
    <NewsContext.Provider value={{
      articles,
      filteredArticles,
      categories: CATEGORIES,
      activeCategory,
      searchQuery,
      userPreferences,
      setActiveCategory,
      setSearchQuery,
      toggleBookmark,
      toggleCategoryPreference
    }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}