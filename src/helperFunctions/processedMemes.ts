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

    // const allQuotes = quotes
    //   .filter((quoteFromDB: QuoteType) => quoteFromDB.memeId === meme.id) // this returns quotes from quotes that match the memeId for this iteration
    //   .map((quoteForThisMeme: QuoteType) => { 
    //     const userForThisQuote = users.find((userFromDB: UsersType) => userFromDB.id === quoteForThisMeme.userId); // this takes all of those quotes and returns a user for one of the quotes

    //     if (!userForThisQuote) {
    //       throw new Error(`User with id ${quoteForThisMeme.userId} not found`);
    //     }

    //     return {
    //       ...quoteForThisMeme,
    //       userId: userForThisQuote.id, // Using non-null assertion operator to assert that userForThisQuote is not undefined
    //       userNameQuote: `${userForThisQuote.firstName} ${userForThisQuote.lastName}`,
    //       quoteLikes: likedQuotes.filter((likedQuoteFromDB: LikedQuotesType) => likedQuoteFromDB.quoteId === quoteForThisMeme.id),
    //     };
    //   });



