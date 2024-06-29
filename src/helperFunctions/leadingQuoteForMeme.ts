import { MemeType } from "../Utils/types";

export const leadingQuoteForMeme = (meme: MemeType) => {
    if (!meme.allQuotes?.length) return null;
  
    return meme.allQuotes.reduce((max, quote) => {
      if (quote.quoteLikes.length > max.quoteLikes.length) {
        return quote;
      } else if (quote.quoteLikes.length === max.quoteLikes.length) {
        return max;
      }
      return max;
    }, meme.allQuotes[0]);
};
