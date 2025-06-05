import axios from 'axios';

const NEWS_API_KEY = '092c3e4c0b414b9597c07d6eb3318fa1';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Create axios instance with default config
const newsApiClient = axios.create({
  baseURL: NEWS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': typeof window !== 'undefined' ? window.location.origin : '',
    'X-Api-Key': NEWS_API_KEY
  }
});

// Ensure we're using HTTPS
if (typeof window !== 'undefined' && window.location.protocol === 'http:') {
  console.warn('News API requires HTTPS. Please ensure your site is served over HTTPS.');
}

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Updated client-side function
export const fetchNewsForLocation = async (location: string): Promise<NewsArticle[]> => {
  try {
    const WORKER_URL = "https://vaibhavvs2004.workers.dev"; // Your Worker URL
    const response = await axios.get(`${WORKER_URL}?location=${location}`);
    
    if (response.data.status !== 'ok') {
      throw new Error(`News API error: ${response.data.message}`);
    }
    return response.data.articles;
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return []; // Return empty array on error
  }
};

// Enhanced sentiment analysis with weighted categories
const sentimentCategories = {
  safety: {
    positive: {
      'safe': 2,
      'secure': 2,
      'peaceful': 2,
      'stable': 2,
      'protected': 2,
      'low crime': 3,
      'crime-free': 3,
      'secure environment': 3,
      'safe haven': 3,
      'secure area': 2,
      'peaceful atmosphere': 2,
      'stable conditions': 2,
      'improved security': 2,
      'enhanced safety': 2,
      'reliable security': 2
    },
    negative: {
      'unsafe': -2,
      'dangerous': -2,
      'crime': -2,
      'violence': -3,
      'unstable': -2,
      'threat': -2,
      'risk': -2,
      'hazard': -2,
      'danger': -2,
      'criminal activity': -3,
      'violent crime': -3,
      'security threat': -3,
      'safety concern': -2,
      'security risk': -2,
      'dangerous area': -2
    }
  },
  stability: {
    positive: {
      'stable': 2,
      'peaceful': 2,
      'calm': 2,
      'orderly': 2,
      'organized': 2,
      'well-managed': 2,
      'efficient': 2,
      'prosperous': 2,
      'growing': 2,
      'developing': 2,
      'improving': 2,
      'progress': 2,
      'advancement': 2,
      'success': 2,
      'achievement': 2
    },
    negative: {
      'unstable': -2,
      'chaotic': -2,
      'disorder': -2,
      'unrest': -2,
      'protest': -2,
      'demonstration': -2,
      'conflict': -3,
      'crisis': -3,
      'emergency': -3,
      'disaster': -3,
      'decline': -2,
      'deterioration': -2,
      'problem': -2,
      'issue': -2,
      'concern': -2
    }
  },
  infrastructure: {
    positive: {
      'modern': 2,
      'developed': 2,
      'well-maintained': 2,
      'efficient': 2,
      'reliable': 2,
      'quality': 2,
      'excellent facilities': 3,
      'good infrastructure': 3,
      'well-equipped': 2,
      'advanced': 2,
      'upgraded': 2,
      'improved': 2,
      'maintained': 2,
      'functional': 2,
      'operational': 2
    },
    negative: {
      'poor': -2,
      'deteriorating': -2,
      'failing': -2,
      'broken': -2,
      'outdated': -2,
      'inadequate': -2,
      'insufficient': -2,
      'overcrowded': -2,
      'congested': -2,
      'dilapidated': -2,
      'unreliable': -2,
      'inconsistent': -2,
      'problematic': -2,
      'deficient': -2,
      'substandard': -2
    }
  }
};

export const analyzeSentiment = (articles: NewsArticle[]): number => {
  if (articles.length === 0) return 0;

  let totalScore = 0;
  let articleCount = 0;

  articles.forEach(article => {
    const text = `${article.title} ${article.description || ''} ${article.content || ''}`.toLowerCase();
    let articleScore = 0;
    let categoryScores = {
      safety: 0,
      stability: 0,
      infrastructure: 0
    };

    // Analyze each category
    Object.entries(sentimentCategories).forEach(([category, words]) => {
      let categoryScore = 0;
      
      // Check positive words
      Object.entries(words.positive).forEach(([word, weight]) => {
        const matches = text.match(new RegExp(word, 'g'));
        if (matches) {
          categoryScore += matches.length * weight;
        }
      });

      // Check negative words
      Object.entries(words.negative).forEach(([word, weight]) => {
        const matches = text.match(new RegExp(word, 'g'));
        if (matches) {
          categoryScore += matches.length * weight;
        }
      });

      categoryScores[category as keyof typeof categoryScores] = categoryScore;
    });

    // Weight the categories (safety is most important)
    articleScore = (
      categoryScores.safety * 0.5 +
      categoryScores.stability * 0.3 +
      categoryScores.infrastructure * 0.2
    );

    // Normalize the article score
    const normalizedArticleScore = Math.min(Math.max(articleScore / 5, -1), 1);
    totalScore += normalizedArticleScore;
    articleCount++;
  });

  // Calculate final score
  const averageScore = articleCount > 0 ? totalScore / articleCount : 0;
  
  // Convert to 0-10 scale
  const finalScore = Math.round(((averageScore + 1) * 5) * 10) / 10;
  
  return Math.min(Math.max(finalScore, 0), 10);
}; 