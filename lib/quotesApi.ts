import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuoteReel, GRADIENTS } from './quotes';

const QUOTABLE_API_BASE = 'https://api.quotable.io';
const CACHE_KEY = 'cached_quotes';
const CACHE_TIMESTAMP_KEY = 'quotes_cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface QuotableQuote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

// Get a random gradient from the available gradients
const getRandomGradient = (): string[] => {
  const gradientKeys = Object.keys(GRADIENTS);
  const randomKey = gradientKeys[Math.floor(Math.random() * gradientKeys.length)] as keyof typeof GRADIENTS;
  return GRADIENTS[randomKey];
};

// Convert Quotable API response to QuoteReel format
const convertToQuoteReel = (quote: QuotableQuote): QuoteReel => {
  return {
    id: quote._id,
    content: quote.content,
    gradient: getRandomGradient(),
  };
};

// Fetch random quotes from API with throttling to avoid rate limiting
export const fetchRandomQuotes = async (count: number = 30): Promise<QuoteReel[]> => {
  try {
    const quotes: QuoteReel[] = [];
    
    // Fetch quotes in smaller batches with delays to avoid overwhelming the API
    const batchSize = 5;
    const delayMs = 200; // 200ms delay between batches
    
    for (let i = 0; i < count; i += batchSize) {
      const batch = Math.min(batchSize, count - i);
      const promises = Array(batch).fill(null).map(() => 
        axios.get<QuotableQuote>(`${QUOTABLE_API_BASE}/random`, {
          params: {
            maxLength: 150, // Keep quotes reasonably short
          }
        })
      );

      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        if (response.data) {
          quotes.push(convertToQuoteReel(response.data));
        }
      });

      // Add delay between batches (except for the last batch)
      if (i + batchSize < count) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    return quotes;
  } catch (error) {
    console.error('Error fetching quotes from API:', error);
    throw error;
  }
};

// Save quotes to cache
export const cacheQuotes = async (quotes: QuoteReel[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(quotes));
    await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error caching quotes:', error);
  }
};

// Get cached quotes
export const getCachedQuotes = async (): Promise<QuoteReel[] | null> => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    console.error('Error reading cached quotes:', error);
    return null;
  }
};

// Check if cache is expired
export const isCacheExpired = async (): Promise<boolean> => {
  try {
    const timestampStr = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestampStr) {
      return true;
    }
    
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    
    return (now - timestamp) > CACHE_DURATION;
  } catch (error) {
    console.error('Error checking cache expiration:', error);
    return true;
  }
};

// Clear cache
export const clearQuotesCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
    await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch (error) {
    console.error('Error clearing quotes cache:', error);
  }
};

// Main function to get quotes (with caching logic)
export const getQuotes = async (forceRefresh: boolean = false): Promise<QuoteReel[]> => {
  try {
    // If not forcing refresh, check cache first
    if (!forceRefresh) {
      const isExpired = await isCacheExpired();
      
      if (!isExpired) {
        const cachedQuotes = await getCachedQuotes();
        if (cachedQuotes && cachedQuotes.length > 0) {
          console.log('Returning cached quotes');
          return cachedQuotes;
        }
      }
    }

    // Fetch fresh quotes from API
    console.log('Fetching fresh quotes from API');
    const freshQuotes = await fetchRandomQuotes(30);
    
    // Cache the fresh quotes
    await cacheQuotes(freshQuotes);
    
    return freshQuotes;
  } catch (error) {
    console.error('Error in getQuotes:', error);
    
    // If API call fails, try to return cached quotes as fallback
    const cachedQuotes = await getCachedQuotes();
    if (cachedQuotes && cachedQuotes.length > 0) {
      console.log('API failed, returning cached quotes as fallback');
      return cachedQuotes;
    }
    
    // If no cache available, throw error with helpful message
    throw new Error('Unable to load quotes. Please check your internet connection and try again.');
  }
};
