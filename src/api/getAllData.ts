// api/getAllData.js
import { LikedMemesType, LikedQuotesType, MemeType, QuoteType, UsersType } from "../Utils/types";
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
      user: users.find((user: UsersType) => user.id === meme.userId),  // User who posted the meme
      allQuotes: quotes.filter((quote: QuoteType) => quote.memeId === meme.id).map((quote : QuoteType) => {
        return {
          ...quote,
          user: users.find((user: UsersType) => user.id === quote.userId),  // User who wrote the quote
          likedBy: likedQuotes.filter((lq: LikedQuotesType) => lq.quoteId === quote.id).map((lq: LikedQuotesType) => lq.userId)  // Array of user IDs who liked the quote
        };
      }),
      likesCount: likedMemes.filter((lm: LikedMemesType) => lm.memeId === meme.id).length  // Total likes for the meme
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
