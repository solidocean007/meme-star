// signUpService.ts
import { NewUserType } from "../../Utils/types";
import { API_CONFIG } from "../config";

const signUpService = async ( userData: NewUserType ) => {
  try {
    const response = await fetch(`${API_CONFIG}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Sign up failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export default signUpService;