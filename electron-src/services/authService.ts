// services/auth.ts
// import axios from "axios";
// import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
// import { getRepository } from "typeorm";
import { User } from "../models/User";
// import { hash } from "bcrypt";

export const userRegister = async (email: any, password: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // const existingUser = await userRepository.findOne(email);

    // if (existingUser) {
    //   return { message: "Email already in use" };
    // }

    // const hashedPassword = await hash(password, 10);

    const user = new User();
    user.email = email;
    // user.password = hashedPassword;
    user.password = password;

    const response = await userRepository.save(user);

    return response;

    // return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Internal server error", error };
  }
};
