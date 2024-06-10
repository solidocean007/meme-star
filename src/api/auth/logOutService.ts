// logOutService.ts
import { API_CONFIG } from "../config";

const logOutService = async ( userId) => {
  try {
    const response = await fetch(`${API_CONFIG}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) { // unexpexted any
    throw new Error(error.message);
  }
};

export default logOutService;