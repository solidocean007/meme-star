// deleteLikedQuote.ts
import { API_CONFIG } from "./config";

export const deleteLikedQuote = async (likedQuoteId: string | undefined) => {
  try {
    const response = await fetch(`${API_CONFIG}/likedQuotes/${likedQuoteId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error unliking quote:", error);
    throw error;
  }
};