// deleteQuote
import { API_CONFIG } from "./config";

export const deleteQuoteFromDB = async (quoteId: string) => {
  try {
    const response = await fetch(`${API_CONFIG}/quotes/${quoteId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
};