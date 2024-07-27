// deleteLikedQuotesByMemeId.ts

import { deleteLikedQuote } from "../api/deleteLikedQuote";
import { getLikedQuotesByMemeId } from "../api/getLikedQuotesByMemeId";

export const deleteLikedQuotesByMemeId = async (memeId: string) => {
  try {
    const likedQuotes = await getLikedQuotesByMemeId(memeId);
    for (const likedQuote of likedQuotes) {
      await deleteLikedQuote(likedQuote.id);
    }
    return likedQuotes.map(likedQuote => likedQuote.id); // Return array of deleted liked quote ids
  } catch (error) {
    console.error("Error deleting liked quotes by memeId:", error);
    throw error;
  }
};

