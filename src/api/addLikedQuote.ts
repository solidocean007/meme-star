// addLikedQuote.ts
import { NewLikedQuoteType } from "../components/MemeCard";
import { API_CONFIG } from "./config";

export const addLikedQuote = async (
  newLikedQuote: NewLikedQuoteType,
) => {
  try {
    const response = await fetch(API_CONFIG + "/likedquotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLikedQuote),
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

// export const addLikedQuote = async (
//   quote: QuoteType,
//   userId: string,
// ) => {
//   const newLikedQuoteItem = {
//     userId: userId,
//     quoteId: quote.id,
//     memeId: quote.memeId,
//   };
//   try {
//     const response = await fetch(API_CONFIG + "/likedquotes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newLikedQuoteItem),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("error", error);
//     throw error;
//   }
// };
