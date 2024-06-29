// api/processMemes.js
import { LikedQuotesType, MemeType, QuoteType, UsersType } from "../Utils/types";

interface processedMemesProps {
  memes: MemeType[];
  users: UsersType[];
  quotes: QuoteType[];
  likedQuotes: LikedQuotesType[];
}

export const processMemes =({memes, users, quotes, likedQuotes}: processedMemesProps) => {
  return memes.map((thisMeme: MemeType) => ({
    ...thisMeme,
    CreatedBy: users.find((userFromDB: UsersType) => userFromDB.id === thisMeme.id),  // User who posted the meme
    allQuotes: quotes.filter((quoteFromDB: QuoteType) => quoteFromDB.memeId === thisMeme.id).map((quoteForThisMeme : QuoteType) => {
      const userForThisQuote = users.find((userFromDB: UsersType) => userFromDB.id === quoteForThisMeme.userId);
      return {
        ...quoteForThisMeme,
        userNameQuote: `${userForThisQuote?.firstName} ${userForThisQuote?.lastName}`,   
        quoteLikes: likedQuotes.filter((likedQuoteFromDB: LikedQuotesType) => likedQuoteFromDB.quoteId === quoteForThisMeme.id) 
      };
    }),
  }));
};
