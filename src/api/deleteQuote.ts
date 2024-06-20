// deleteQuote
import { API_CONFIG } from "./config";

export const deleteQuote = async (quoteId: string) => {
  try {
    const response = await fetch(`${API_CONFIG}/quotes/${quoteId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return { message: "Quote deleted successfully" };
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
};