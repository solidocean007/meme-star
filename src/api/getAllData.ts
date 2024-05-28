// api/getAllData.js
// import { LikedMemesType, LikedQuotesType, MemeType, QuoteType, UsersType } from '../Utils/types';

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


    // // Process data as necessary here
    // const processedMemes = memes.map((meme: MemeType) => ({
    //   ...meme,
    //   quotes: quotes.filter((quote: QuoteType) => quote.memeId === meme.id),
    //   user: users.find((user: UsersType)=> user.id === meme.userId),
    //   likedBy: likedMemes.filter((like: LikedMemesType) => like.memeId === meme.id).map((like: LikedMemesType) => users.find((user: UsersType) => user.id === like.userId)) // List of users who liked the meme
    // }));

    // // Optional: Process quotes to include user details
    // const processedQuotes = quotes.map((quote: QuoteType) => ({
    //   ...quote,
    //   user: users.find((user: UsersType) => user.id === quote.userId), // Associate user with quote
    //   likes: likedQuotes.filter((like: LikedQuotesType) => like.quoteId === quote.id).length // Count of likes for this quote
    // }));

    // return { memes: processedMemes, quotes: processedQuotes };
    console.log(processedMemes);
    return processedMemes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
