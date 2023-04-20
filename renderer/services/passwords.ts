// services/passwords.ts
import axios from "axios";

export const createPassword = async (
  userId: number,
  title: string,
  password: string
) => {
  try {
    const response = await axios.post("/api/passwords/create", {
      userId,
      title,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
