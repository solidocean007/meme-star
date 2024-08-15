// deleteLikesForDeletedQuote.ts
import { LikedQuotesType } from "../Utils/types";
import { getWholeItem } from "../api/getWholeItem";

export const deleteLikesForDeletedQuote = async (quoteId: string): Promise<string[]> => {
  try {
    const allQuoteLikes: LikedQuotesType[] = await getWholeItem(`/likedQuotes?id=${quoteId}`);
    return allQuoteLikes
      .filter(like => like.id !== undefined)
      .map(like => like.id as string);
  } catch (error) {
    console.error("Error fetching likes for quote:", error);
    return [];
  }
};
