// deleteMeme.ts
import { API_CONFIG } from "./config";

export const deleteMeme = async (memeId : string) => {
  try {
    const response = await fetch(`${API_CONFIG}/memes/${memeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return { message: "Meme deleted successfully" };
  } catch (error) {
    console.error("Error deleting meme:", error);
    throw error;
  }
};