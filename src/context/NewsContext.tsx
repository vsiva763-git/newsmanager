import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Article, Category, UserPreferences } from '../types';
import { CATEGORIES } from '../constants/mockData';
import { fetchNews, getPersonalizedRecommendations } from '../services/newsService';

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
  refreshNews: () => Promise<void>;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const defaultUserPreferences: UserPreferences = {
  darkMode: false,
  preferredCategories: ['technology', 'business', 'science'],
  bookmarkedArticles: [],
};

export function NewsProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultUserPreferences;
  });

  const refreshNews = async () => {
    try {
      const newsArticles = await fetchNews(activeCategory === 'all' ? '' : activeCategory);
      const recommendations = await getPersonalizedRecommendations(userPreferences.preferredCategories);
      
      // Combine and deduplicate articles
      const combinedArticles = [...newsArticles, ...recommendations];
      const uniqueArticles = Array.from(new Map(combinedArticles.map(item => [item.id, item])).values());
      
      setArticles(uniqueArticles);
    } catch (error) {
      console.error('Error refreshing news:', error);
    }
  };

  useEffect(() => {
    refreshNews();
    // Refresh news every 5 minutes
    const interval = setInterval(refreshNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [activeCategory, userPreferences.preferredCategories]);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      toggleCategoryPreference,
      refreshNews
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