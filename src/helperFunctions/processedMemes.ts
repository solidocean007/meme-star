// api/processMemes.js
import { LikedQuotesType, MemeType, QuoteType, UsersType, ProcessedMemeType } from "../Utils/types";

interface ProcessedMemesProps {
  memes: MemeType[];
  users: UsersType[];
  quotes: QuoteType[];
  likedQuotes: LikedQuotesType[];
}

export const processMemes = ({ memes, users, quotes, likedQuotes }: ProcessedMemesProps): ProcessedMemeType[] => {
  return memes.map((meme: MemeType) => {
    const createdBy = users.find((userFromDB: UsersType) => userFromDB.id === meme.userId);

    if (!createdBy) {
      throw new Error(`User with id ${meme.userId} not found`);
    }

    const allQuotes = quotes
      .filter((quoteFromDB: QuoteType) => quoteFromDB.memeId === meme.id)
      .map((quoteForThisMeme: QuoteType) => {
        const userForThisQuote = users.find((userFromDB: UsersType) => userFromDB.id === quoteForThisMeme.userId);

        if (!userForThisQuote) {
          throw new Error(`User with id ${quoteForThisMeme.userId} not found`);
        }

        return {
          ...quoteForThisMeme,
          userId: userForThisQuote.id, // Using non-null assertion operator to assert that userForThisQuote is not undefined
          userNameQuote: `${userForThisQuote.firstName} ${userForThisQuote.lastName}`,
          quoteLikes: likedQuotes.filter((likedQuoteFromDB: LikedQuotesType) => likedQuoteFromDB.quoteId === quoteForThisMeme.id),
        };
      });

    return {
      ...meme,
      createdBy: createdBy,
      allQuotes: allQuotes,
    };
  });
};

