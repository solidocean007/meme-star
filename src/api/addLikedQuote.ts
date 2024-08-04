// addLikedQuote.ts
import { LikedQuotesType } from "../Utils/types";
import { API_CONFIG } from "./config";

export const addLikedQuote = async (
  newLikedQuote: LikedQuotesType
) => {
  try {
    const response = await fetch(API_CONFIG + "/likedQuotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLikedQuote),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
