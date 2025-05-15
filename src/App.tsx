import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NewsProvider } from './context/NewsContext';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <NewsProvider>
        <HomePage />
      </NewsProvider>
    </ThemeProvider>
  );
}

export default App;