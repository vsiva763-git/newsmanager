import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { CategoryFilter } from '../components/CategoryFilter';
import { ArticlesList } from '../components/ArticlesList';
import { BookmarkedArticles } from '../components/BookmarkedArticles';
import { PreferenceSettings } from '../components/PreferenceSettings';
import { Bookmark, Home, UserCog } from 'lucide-react';

type TabType = 'feed' | 'bookmarks' | 'preferences';

export function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  return (
    <MainLayout>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'feed' && 'Today\'s Top Stories'}
            {activeTab === 'bookmarks' && 'Your Bookmarked Articles'}
            {activeTab === 'preferences' && 'Your Preferences'}
          </h1>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === 'feed'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Home className="mr-2 h-4 w-4" />
            News Feed
          </button>
          
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === 'bookmarks'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmarks
          </button>
          
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === 'preferences'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Preferences
          </button>
        </div>
        
        {activeTab === 'feed' && (
          <>
            <CategoryFilter />
            <ArticlesList />
          </>
        )}
        
        {activeTab === 'bookmarks' && (
          <BookmarkedArticles />
        )}
        
        {activeTab === 'preferences' && (
          <div className="max-w-md mx-auto">
            <PreferenceSettings />
          </div>
        )}
      </section>
    </MainLayout>
  );
}