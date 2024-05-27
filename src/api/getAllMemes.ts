import { API_CONFIG } from "./config";

export const getAllMemes = async () => {
  try {
    const response = await fetch(API_CONFIG + "/memes", {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log(result);
    return result;  
  } catch (error) {
    console.error('error', error);
    throw error; 
  }
};

  