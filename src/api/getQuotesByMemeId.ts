// getQuotesByMemeId.ts
import { API_CONFIG } from "./config";
import { QuoteType } from "../Utils/types";

export const getQuotesByMemeId = async (memeId: string): Promise<QuoteType[]> => {
  try {
    const response = await fetch(`${API_CONFIG}/quotes?memeId=${memeId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const quotes: QuoteType[] = await response.json();
    return quotes;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};
