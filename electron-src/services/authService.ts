import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { hash } from "bcrypt";

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
