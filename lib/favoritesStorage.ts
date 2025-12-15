import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuoteReel } from './quotes';

const FAVORITES_KEY = 'favorite_quotes';

// Get all favorite quotes
export const getFavoriteQuotes = async (): Promise<QuoteReel[]> => {
  try {
    const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
    if (favoritesData) {
      return JSON.parse(favoritesData);
    }
    return [];
  } catch (error) {
    console.error('Error reading favorite quotes:', error);
    return [];
  }
};

// Add a quote to favorites
export const addFavoriteQuote = async (quote: QuoteReel): Promise<void> => {
  try {
    const favorites = await getFavoriteQuotes();
    
    // Check if already exists
    const exists = favorites.some(fav => fav.id === quote.id);
    if (exists) {
      return;
    }
    
    favorites.push(quote);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error adding favorite quote:', error);
    throw error;
  }
};

// Remove a quote from favorites
export const removeFavoriteQuote = async (quoteId: string): Promise<void> => {
  try {
    const favorites = await getFavoriteQuotes();
    const filtered = favorites.filter(fav => fav.id !== quoteId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing favorite quote:', error);
    throw error;
  }
};

// Check if a quote is favorited
export const isQuoteFavorited = async (quoteId: string): Promise<boolean> => {
  try {
    const favorites = await getFavoriteQuotes();
    return favorites.some(fav => fav.id === quoteId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Toggle favorite status
export const toggleFavoriteQuote = async (quote: QuoteReel): Promise<boolean> => {
  try {
    const isFavorited = await isQuoteFavorited(quote.id);
    
    if (isFavorited) {
      await removeFavoriteQuote(quote.id);
      return false;
    } else {
      await addFavoriteQuote(quote);
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

// Clear all favorites
export const clearFavorites = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
    throw error;
  }
};
