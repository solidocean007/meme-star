// api/getAllData.js
import { LikedMemesType, MemeType, QuoteType, UsersType } from "../Utils/types";
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

    // Process data as necessary here
    const processedMemes = memes.map((meme: MemeType) => ({
      ...meme,
      aLLQuotes: quotes.filter((quote: QuoteType) => quote.memeId === meme.id),
      user: users.find((user: UsersType ) => user.id === meme.userId), // Associate user with meme
      likedBy: likedMemes.filter((like: LikedMemesType) => like.memeId === meme.id)
        .map((like: LikedMemesType) => users.find((user: UsersType) => user.id === like.userId)) // List of users who liked the meme
    }));

    // Optional: Process quotes to include user details

    return {
      users,
      processedMemes,
      quotes,
      likedQuotes,
      likedMemes
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
