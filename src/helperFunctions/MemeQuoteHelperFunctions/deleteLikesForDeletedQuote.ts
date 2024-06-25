// deleteLikesForDeletedQuote.ts
import { LikedQuotesType } from "../../Utils/types";
import { getWholeItem } from "../../api/getWholeItem";

export const deleteLikesForDeletedQuote = async (quoteId: string): Promise<string[]> => {
  try {
    const allQuoteLikes: LikedQuotesType[] = await getWholeItem(`quoteLikes?quoteId=${quoteId}`);
    // Filter out any undefined IDs and map to string array
    return allQuoteLikes
      .filter(like => like.id !== undefined)  // Ensure only likes with defined IDs are processed
      .map(like => like.id as string);  // Cast to string since we filtered out undefined
  } catch (error) {
    console.error("Error fetching likes for quote:", error);
    return []; // Return an empty array in case of error to handle gracefully
  }
};
