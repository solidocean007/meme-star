// getLikedQuotesByMemeId.ts
import { API_CONFIG } from "./config";
import { QuoteType } from "../Utils/types";

export const getLikedQuotesByMemeId = async (memeId: string): Promise<QuoteType[]> => {
  try {
    const response = await fetch(`${API_CONFIG}/likedQuotes?memeId=${memeId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const likedQuotes: QuoteType[] = await response.json();
    return likedQuotes;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};
