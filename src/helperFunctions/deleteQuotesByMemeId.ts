// deleteQuotesByMemeId.ts

import { deleteQuoteFromDB } from "../api/deleteQuoteFromDB";
import { getQuotesByMemeId } from "../api/getQuotesByMemeId";

export const deleteQuotesByMemeId = async (memeId: string) => {
  try {
    const quotes = await getQuotesByMemeId(memeId);
    for (const quote of quotes) {
      await deleteQuoteFromDB(quote.id);
    }
    return quotes.map(quote => quote.id);
  } catch (error) {
    console.error("Error deleting quotes by memeId:", error);
    throw error;
  }
};

