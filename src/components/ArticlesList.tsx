import React from 'react';
import { useNews } from '../context/NewsContext';
import { ArticleCard } from './ArticleCard';
import { Newspaper } from 'lucide-react';

export function ArticlesList() {
  const { filteredArticles, activeCategory, searchQuery } = useNews();

  if (filteredArticles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <Newspaper size={48} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {searchQuery 
            ? `No articles matching "${searchQuery}" were found.`
            : `No articles found in the ${activeCategory} category.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}