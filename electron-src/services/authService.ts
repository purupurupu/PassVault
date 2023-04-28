import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { hash, compare } from "bcrypt";

export const userLogin = async (email: any, password: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: email },
    });

    if (user === null) {
      return false;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return false;
    }

    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { message: "Internal server error", error };
  }
};

export const userRegister = async (email: any, password: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: { email: email },
    });

    if (existingUser !== null) {
      return false;
    }

    const hashedPassword = await hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    const response = await userRepository.save(user);

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Internal server error", error };
  }
};
