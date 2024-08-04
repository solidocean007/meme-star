// getWholeItems.ts
import { API_CONFIG } from "./config";

export const getWholeItem = async (item:string) => {
  try {
    const response = await fetch(API_CONFIG + `${item}`, {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('error', error);
    throw error; 
  }
};