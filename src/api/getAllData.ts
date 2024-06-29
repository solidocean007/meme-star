// api/getAllData.js
import { getWholeItem } from "./getWholeItem";

export const getAllData = async () => {
  try {
    const [users, memes, quotes, likedQuotes ] = await Promise.all([
      getWholeItem('/users'),
      getWholeItem('/memes'),
      getWholeItem('/quotes'),
      getWholeItem('/likedQuotes'),
    ]);

    return {
      users,
      memes,
      quotes,
      likedQuotes,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
