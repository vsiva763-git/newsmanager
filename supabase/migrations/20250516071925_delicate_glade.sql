/*
  # Add indexes and constraints to articles table

  1. Changes
    - Add indexes for frequently queried columns:
      - category (for filtering)
      - created_at (for sorting)
      - published_at (for sorting)
    - Add NOT NULL constraints for essential fields
    - Add text length constraints for performance

  2. Security
    - Maintain existing RLS policy
*/

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);

-- Add NOT NULL constraints for essential fields
ALTER TABLE articles 
  ALTER COLUMN source SET NOT NULL,
  ALTER COLUMN url SET NOT NULL,
  ALTER COLUMN published_at SET NOT NULL;

-- Add text length constraints
ALTER TABLE articles
  ADD CONSTRAINT articles_title_length CHECK (char_length(title) <= 500),
  ADD CONSTRAINT articles_summary_length CHECK (char_length(summary) <= 1000),
  ADD CONSTRAINT articles_url_length CHECK (char_length(url) <= 2048);

-- Ensure URLs are unique to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_url ON articles(url);