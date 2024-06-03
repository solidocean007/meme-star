// api/getAllData.js
import { LikedMemesType, LikedQuotesType, MemeType, QuoteType, UsersType } from "../Utils/types";
import { getWholeItem } from "./getWholeItem";
import { getAllQuotes } from "./getallQuotes";

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
    const processedMemes = memes.map((thisMeme: MemeType) => ({
      ...thisMeme,
      CreatedBy: users.find((userFromDB: UsersType) => userFromDB.id === thisMeme.id),  // User who posted the meme
      allQuotes: quotes.filter((quoteFromDB: QuoteType) => quoteFromDB.memeId === thisMeme.id).map((quoteForThisMeme : QuoteType) => {
        return {
          ...quoteForThisMeme,
          userNameQuote: users.find((userFromDB: UsersType) => userFromDB.id === quoteForThisMeme.userId)?.name,  // User who wrote the quote
          quoteLikedBy: likedQuotes.filter((likedQuoteFromDB: LikedQuotesType) => likedQuoteFromDB.quoteId === quoteForThisMeme.id).map((lq: LikedQuotesType) => lq.userId)  // Array of user IDs who liked the quote
        };
      }),
      likesCount: likedMemes.filter((likedMemesFromDB: LikedMemesType) => likedMemesFromDB.memeId === thisMeme.id).length  // Total likes for the meme
    }));
    console.log(processedMemes)
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
