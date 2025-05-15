import React from 'react';
import { Article } from '../types';
import { formatDate } from '../utils/formatters';
import { Bookmark, Clock } from 'lucide-react';
import { useNews } from '../context/NewsContext';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const { userPreferences, toggleBookmark } = useNews();
  const isBookmarked = userPreferences.bookmarkedArticles.includes(article.id);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 left-0 m-2 px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white capitalize">
          {article.category}
        </div>
        <button
          onClick={() => toggleBookmark(article.id)}
          className="absolute top-0 right-0 m-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark 
            size={18} 
            className={`${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{article.source}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            By {article.author}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
      
      <a 
        href={article.url} 
        className="px-4 py-3 text-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
      >
        Read Full Article
      </a>
    </div>
  );
}