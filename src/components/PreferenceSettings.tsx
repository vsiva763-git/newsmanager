import React from 'react';
import { useNews } from '../context/NewsContext';
import { useTheme } from '../context/ThemeContext';
import { Settings, Moon, Sun } from 'lucide-react';
import { Category } from '../types';

export function PreferenceSettings() {
  const { categories, userPreferences, toggleCategoryPreference } = useNews();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-500 text-white flex items-center">
        <Settings className="mr-2" size={20} />
        <h2 className="text-lg font-semibold">Your Preferences</h2>
      </div>
      
      <div className="p-5 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-800 dark:text-white font-medium">Theme</span>
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span 
                className={`absolute left-1 transform transition-transform duration-200 ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {darkMode ? 
                  <Moon size={16} className="text-blue-500" /> : 
                  <Sun size={16} className="text-amber-500" />
                }
              </span>
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
          </p>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-gray-800 dark:text-white font-medium mb-3">Preferred Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category: Category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userPreferences.preferredCategories.includes(category)}
                  onChange={() => toggleCategoryPreference(category)}
                  className="h-4 w-4 text-blue-500 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                />
                <span className="ml-2 text-sm capitalize text-gray-700 dark:text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            These categories will be highlighted in your feed
          </p>
        </div>
      </div>
    </div>
  );
}