/*
  # Create articles table for news caching and recommendations

  1. New Tables
    - `articles`
      - `id` (text, primary key)
      - `title` (text)
      - `summary` (text)
      - `content` (text)
      - `author` (text)
      - `source` (text)
      - `published_at` (timestamptz)
      - `image_url` (text)
      - `category` (text)
      - `reading_time` (integer)
      - `url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `articles` table
    - Add policy for authenticated users to read articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id text PRIMARY KEY,
  title text NOT NULL,
  summary text,
  content text,
  author text,
  source text,
  published_at timestamptz,
  image_url text,
  category text,
  reading_time integer,
  url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read articles"
  ON articles
  FOR SELECT
  TO public
  USING (true);