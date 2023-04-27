// services/auth.ts
import axios from "axios";
import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { hash } from "bcrypt";

// export const register = async (email: string, password: string) => {
//   try {
//     const response = await axios.post("/api/auth/register", {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.error);
//   }
// };

export const register = async (email: any, password: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne(email);

    // if (existingUser) {
    //   return res.status(409).json({ message: "Email already in use" });
    // }

    // const hashedPassword = await hash(password, 10);

    const user = new User();
    user.email = email;
    // user.password = hashedPassword;
    user.password = password;

    const res = await userRepository.save(user);

    // return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // console.error("Error registering user:", error);
    // return res.status(500).json({ message: "Internal server error" });
  }
};
