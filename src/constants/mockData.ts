import { Article, Category } from '../types';

// Generate a random reading time between 2 and 15 minutes
const getRandomReadingTime = () => Math.floor(Math.random() * 13) + 2;

// Generate a random date within the last 7 days
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 7));
  return date.toISOString();
};

export const CATEGORIES: Category[] = [
  'technology',
  'business',
  'health',
  'entertainment',
  'science',
  'sports',
  'politics',
  'world'
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Breakthrough in Quantum Computing Shows Promise for Future Applications',
    summary: 'Researchers have achieved a significant milestone in quantum computing stability, potentially accelerating practical applications.',
    content: 'Scientists at MIT have demonstrated a new method for maintaining quantum coherence for extended periods, a major obstacle in quantum computing development. This breakthrough could accelerate the timeline for practical quantum computers that can solve complex problems beyond the capability of classical computers.',
    author: 'Dr. Emily Chen',
    source: 'Tech Innovations',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/325223/pexels-photo-325223.jpeg',
    category: 'technology',
    readingTime: getRandomReadingTime(),
    url: '#article-1'
  },
  {
    id: '2',
    title: 'Global Markets React to New Economic Policies',
    summary: 'Stock markets worldwide showed mixed reactions as new economic policies were announced by major economies.',
    content: 'Financial markets across Asia, Europe, and the Americas showed varied responses to the coordinated economic policy announcements from G7 nations. Analysts point to uncertainty about implementation timelines and potential trade implications as factors in the market volatility.',
    author: 'Marcus Johnson',
    source: 'Financial Times',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
    category: 'business',
    readingTime: getRandomReadingTime(),
    url: '#article-2'
  },
  {
    id: '3',
    title: 'New Study Reveals Benefits of Mediterranean Diet for Heart Health',
    summary: 'Research confirms significant cardiovascular benefits from following a traditional Mediterranean diet pattern.',
    content: 'A comprehensive 10-year study following over 12,000 participants has provided strong evidence that adhering to a Mediterranean diet rich in olive oil, nuts, fruits, vegetables, and fish significantly reduces the risk of heart disease and stroke, even in high-risk populations.',
    author: 'Dr. Sarah Martinez',
    source: 'Health Journal',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    category: 'health',
    readingTime: getRandomReadingTime(),
    url: '#article-3'
  },
  {
    id: '4',
    title: 'Streaming Platform Announces Major Content Deal with Award-Winning Directors',
    summary: 'A leading streaming service has secured exclusive rights to upcoming projects from several acclaimed filmmakers.',
    content: 'In a move that signals the continuing shift in entertainment production and distribution, StreamFlix has announced partnerships with five Academy Award-winning directors to produce exclusive content over the next three years, with a combined budget exceeding $500 million.',
    author: 'Jessica Turner',
    source: 'Entertainment Weekly',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    category: 'entertainment',
    readingTime: getRandomReadingTime(),
    url: '#article-4'
  },
  {
    id: '5',
    title: 'Astronomers Discover Potentially Habitable Exoplanet in Nearby Star System',
    summary: 'New observations have identified an Earth-sized planet within the habitable zone of its star, just 40 light-years away.',
    content: 'Using advanced spectroscopic techniques with the James Webb Space Telescope, astronomers have confirmed the existence of an exoplanet with conditions that could support liquid water. The planet, designated Kepler-186f-b, orbits a stable red dwarf star and shows signatures of an atmosphere, making it a prime target for future studies.',
    author: 'Dr. Michael Wong',
    source: 'Astronomy Today',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg',
    category: 'science',
    readingTime: getRandomReadingTime(),
    url: '#article-5'
  },
  {
    id: '6',
    title: 'Underdog Team Makes Historic Championship Run',
    summary: 'Against all odds, a team ranked outside the top 20 has advanced to the finals for the first time in league history.',
    content: 'The Westfield Wolves, who began the season with the longest championship odds in the league, have completed a remarkable journey to the finals after defeating three top-seeded teams. Their unexpected success has been attributed to innovative tactical approaches and exceptional team chemistry developed over the season.',
    author: 'James Rodriguez',
    source: 'Sports Network',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    category: 'sports',
    readingTime: getRandomReadingTime(),
    url: '#article-6'
  },
  {
    id: '7',
    title: 'Landmark Climate Legislation Passes with Bipartisan Support',
    summary: 'After months of negotiation, a comprehensive climate bill has passed with support from both major parties.',
    content: 'In a rare show of bipartisan cooperation, the Climate Resilience Act passed with a comfortable margin after key compromises were reached on industrial transition timelines and rural community support. The legislation includes significant investments in renewable energy infrastructure and research, along with measures to assist communities most affected by climate change.',
    author: 'Robert Chen',
    source: 'Policy Review',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg',
    category: 'politics',
    readingTime: getRandomReadingTime(),
    url: '#article-7'
  },
  {
    id: '8',
    title: 'International Summit Addresses Global Supply Chain Resilience',
    summary: 'Leaders from 24 nations met to establish new frameworks for strengthening international trade networks.',
    content: 'The three-day Geneva Summit concluded with the announcement of a new international agreement aimed at improving supply chain transparency and creating coordinated responses to future disruptions. The accord includes provisions for shared early warning systems and collaborative stockpiling of essential materials in strategic locations around the world.',
    author: 'Aisha Nwosu',
    source: 'World Affairs',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg',
    category: 'world',
    readingTime: getRandomReadingTime(),
    url: '#article-8'
  },
  {
    id: '9',
    title: 'Revolutionary AI Model Can Predict Protein Structures with Unprecedented Accuracy',
    summary: 'A new artificial intelligence system has demonstrated the ability to predict complex protein folding patterns in seconds.',
    content: 'Researchers at Stanford have unveiled ProteinSolver, an AI system that can determine three-dimensional protein structures with accuracy levels previously requiring months of laboratory work. This breakthrough has significant implications for drug discovery and understanding disease mechanisms at the molecular level.',
    author: 'Dr. Thomas Lee',
    source: 'Science Daily',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg',
    category: 'technology',
    readingTime: getRandomReadingTime(),
    url: '#article-9'
  },
  {
    id: '10',
    title: 'Renewable Energy Investments Reach All-Time High',
    summary: 'Global capital flowing into renewable energy projects has surpassed fossil fuel investments for the first time.',
    content: 'Analysis of 2023 investment data shows that renewable energy attracted $495 billion in global investments, exceeding fossil fuel industry investments by approximately $38 billion. Solar and offshore wind projects led the surge, with significant growth also seen in energy storage solutions and green hydrogen technologies.',
    author: 'Maria Gonzalez',
    source: 'Energy Monitor',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg',
    category: 'business',
    readingTime: getRandomReadingTime(),
    url: '#article-10'
  },
  {
    id: '11',
    title: 'Novel Therapy Shows Promise for Treatment-Resistant Depression',
    summary: 'Clinical trials report significant improvement in patients who had not responded to conventional treatments.',
    content: 'A novel therapeutic approach combining targeted brain stimulation with psychedelic-assisted therapy has shown remarkable results in a phase II clinical trial. Patients with treatment-resistant depression experienced substantial symptom reduction, with effects persisting at the six-month follow-up assessment.',
    author: 'Dr. James Harrison',
    source: 'Medical Frontiers',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg',
    category: 'health',
    readingTime: getRandomReadingTime(),
    url: '#article-11'
  },
  {
    id: '12',
    title: 'Virtual Reality Concert Breaks Attendance Records',
    summary: 'A groundbreaking virtual performance attracted over 15 million simultaneous viewers across multiple platforms.',
    content: 'Popular artist Stella Nova\'s virtual reality concert, which featured innovative interactive elements and customizable viewing experiences, has set a new record for online entertainment events. The performance used cutting-edge technology that allowed viewers to move through different "zones" of the concert, each with unique visual themes and sound mixing.',
    author: 'Tyler James',
    source: 'Digital Arts',
    publishedAt: getRandomDate(),
    imageUrl: 'https://images.pexels.com/photos/1261820/pexels-photo-1261820.jpeg',
    category: 'entertainment',
    readingTime: getRandomReadingTime(),
    url: '#article-12',
  }
];