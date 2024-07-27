import { API_CONFIG } from "./config";

export const deleteProfileQuotes = async (quoteIds: string[]) => {
  try {
    const deletePromises = quoteIds.map(quoteId => 
      fetch(`${API_CONFIG}/quotes/${quoteId}`, {
        method: "DELETE",
      })
    );

    const responses = await Promise.all(deletePromises);
    
    responses.forEach(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    });
  } catch (error) {
    console.error("Error deleting quotes:", error);
    throw error;
  }
};
