import { MemeType } from "../Utils/types";

export const leadingQuoteForMeme = (meme: MemeType) => {
    if (!meme.allQuotes?.length) return null; // No quotes available
  
    return meme.allQuotes.reduce((max, quote) => {
      if (quote.quoteLikes.length > max.quoteLikes.length) {
        return quote; // This quote has more likes, so it becomes the new max
      } else if (quote.quoteLikes.length === max.quoteLikes.length) {
        // If they have the same number of likes, return the first one encountered
        return max;
      }
      return max; // Otherwise, keep the current max
    }, meme.allQuotes[0]); // Initialize with the first quote
};
