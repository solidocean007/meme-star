// api/getAllData.js
import { getWholeItem } from "./getWholeItem";

export const getAllData = async () => {
  try {
    const [users, memes, quotes, likedQuotes, likedMemes] = await Promise.all([
      getWholeItem('/users'),
      getWholeItem('/memes'),
      getWholeItem('/quotes'),
      getWholeItem('/likedQuotes'),
      getWholeItem('/likedMemes')
    ]);

    return {
      users,
      memes,
      quotes,
      likedQuotes,
      likedMemes
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
