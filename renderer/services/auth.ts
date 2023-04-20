// services/auth.ts
import axios from "axios";

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
