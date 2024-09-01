import { API_CONFIG } from "./config";

export const getOneUser = async (userId: string) => {
  try {
    const response = await fetch(API_CONFIG + "/users/" + userId, {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null;  // User not found, return null
      }
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
};
