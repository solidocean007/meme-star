import { API_CONFIG } from "./config";

export const getQuotes = async (optional: string) => {
  try {
    const response = await fetch(API_CONFIG + `/quotes/${optional}`, {
      method: "GET ",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
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
