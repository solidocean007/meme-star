// addMeme.ts
import { MemeType } from "../Utils/types";
import { API_CONFIG } from "./config";

export const addMeme = async (
  newMeme: MemeType
) => {
  try {
    const response = await fetch(API_CONFIG + "/memes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMeme),
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