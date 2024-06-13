import { API_CONFIG } from "./config";

export const toggleLikeQuote = async (quoteId: string) => {
  try {
    const response = await fetch(`${API_CONFIG}/quotes/${quoteId}`, {
      method: "",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (error) {
    console.error("Error Liking quote:", error);
    throw error;
  }
};