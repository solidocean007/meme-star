// api/processMemes.js
import { LikedQuotesType, MemeType, QuoteType, UsersType, ProcessedMemeType, ProcessedQuoteType } from "../Utils/types";

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

    const allQuotes = quotes.reduce((accumulator: ProcessedQuoteType[], quoteFromDB: QuoteType) => {
      if (quoteFromDB.memeId === meme.id) {
        const userForThisQuote = users.find((userFromDB: UsersType) => userFromDB.id === quoteFromDB.userId);

        if (!userForThisQuote) {
          throw new Error(`User with id ${quoteFromDB.userId} not found`);
        }

        const quoteWithUserDetails: ProcessedQuoteType = {
          ...quoteFromDB,
          userNameQuote: `${userForThisQuote.firstName} ${userForThisQuote.lastName}`,
          quoteLikes: likedQuotes.filter((likedQuoteFromDB: LikedQuotesType) => likedQuoteFromDB.quoteId === quoteFromDB.id),
        };

        accumulator.push(quoteWithUserDetails);
      }

      return accumulator;
    }, []);

    return {
      ...meme,
      createdBy: createdBy,
      allQuotes: allQuotes,
    };
  });
};



