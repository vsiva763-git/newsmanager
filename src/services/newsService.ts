import axios from 'axios';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { Article } from '../types';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchNews(category: string = ''): Promise<Article[]> {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        category: category || undefined,
        apiKey: NEWS_API_KEY
      }
    });

    const articles = await Promise.all(response.data.articles.map(async (article: any) => {
      // Generate AI summary
      const summary = await generateSummary(article.description || article.title);
      
      return {
        id: article.url,
        title: article.title,
        summary: summary,
        content: article.content,
        author: article.author || 'Unknown',
        source: article.source.name,
        publishedAt: article.publishedAt,
        imageUrl: article.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
        category: category || 'general',
        readingTime: calculateReadingTime(article.content),
        url: article.url
      };
    }));

    // Store in Supabase for caching
    await supabase.from('articles').upsert(
      articles.map(article => ({
        ...article,
        created_at: new Date().toISOString()
      }))
    );

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function generateSummary(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise news summaries."
        },
        {
          role: "user",
          content: `Please create a brief, engaging summary of this news article in 2-3 sentences: ${text}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || text;
  } catch (error) {
    console.error('Error generating summary:', error);
    return text;
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export async function getPersonalizedRecommendations(
  userPreferences: string[]
): Promise<Article[]> {
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('*')
      .in('category', userPreferences)
      .order('created_at', { ascending: false })
      .limit(10);

    return articles || [];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}