// createQuote.ts
import { LikedQuotesType, QuoteType } from "../Utils/types";
import { API_CONFIG } from "./config";

export const createQuote = async (
  newQuote: QuoteType | LikedQuotesType,
) => {
  try {
    const response = await fetch(API_CONFIG + "/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuote),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};