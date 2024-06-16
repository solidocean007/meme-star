// api/processMemes.js
import { LikedMemesType, LikedQuotesType, MemeType, QuoteType, UsersType } from "../Utils/types";

interface processedMemesProps {
  memes: MemeType[];
  users: UsersType[];
  quotes: QuoteType[];
  likedQuotes: LikedQuotesType[];
  likedMemes: LikedMemesType[];
}

export const processMemes =({memes, users, quotes, likedQuotes, likedMemes}: processedMemesProps) => {
  return memes.map((thisMeme: MemeType) => ({
    ...thisMeme,
    CreatedBy: users.find((userFromDB: UsersType) => userFromDB.id === thisMeme.id),  // User who posted the meme
    allQuotes: quotes.filter((quoteFromDB: QuoteType) => quoteFromDB.memeId === thisMeme.id).map((quoteForThisMeme : QuoteType) => {
      const userForThisQuote = users.find((userFromDB: UsersType) => userFromDB.id === quoteForThisMeme.userId);
      return {
        ...quoteForThisMeme,
        // userNameQuote: users.find((userFromDB: UsersType) => userFromDB.id === quoteForThisMeme.userId)?.firstName || '',   
        userNameQuote: `${userForThisQuote?.firstName} ${userForThisQuote?.lastName}`,   
        quoteLikes: likedQuotes.filter((likedQuoteFromDB: LikedQuotesType) => likedQuoteFromDB.quoteId === quoteForThisMeme.id) // Array of user IDs who liked the quote
      };
    }),
    likesCount: likedMemes.filter((likedMemesFromDB: LikedMemesType) => likedMemesFromDB.memeId === thisMeme.id).length  // Total likes for the meme
  }));
};
