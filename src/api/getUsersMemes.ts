
import { API_CONFIG } from "./config";

export const getUsersMemes = async (userId: string) => {
  try {
    const response = await fetch(`${API_CONFIG}/memes?userId=${userId}`, {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;  
  } catch (error) {
    console.error('error', error);
    throw error; 
  }
};
