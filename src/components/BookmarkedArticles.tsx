import React from 'react';
import { useNews } from '../context/NewsContext';
import { ArticleCard } from './ArticleCard';
import { Bookmark } from 'lucide-react';

export function BookmarkedArticles() {
  const { articles, userPreferences } = useNews();
  const bookmarkedArticles = articles.filter(article => 
    userPreferences.bookmarkedArticles.includes(article.id)
  );

  if (bookmarkedArticles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <Bookmark size={48} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No bookmarked articles
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Bookmark articles you want to read later by clicking the bookmark icon on any article.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Bookmarked Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookmarkedArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}