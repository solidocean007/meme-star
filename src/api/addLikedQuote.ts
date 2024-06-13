import { LikedQuotesType } from "../Utils/types";
import { API_CONFIG } from "./config";

export const addLikedQuote = async (likedQuote: LikedQuotesType) => {
  try {
    const response = await fetch(API_CONFIG + "/likedquotes", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(likedQuote)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;  
  } catch (error) {
    console.error('error', error);
    throw error; 
};
