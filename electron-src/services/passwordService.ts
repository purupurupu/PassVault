import { AppDataSource } from "../data-source";
import { Password } from "../models/Password";

import { hash } from "bcrypt";

export const getPasswordList = async (userId: number) => {
  try {
    const passwordRepository = AppDataSource.getRepository(Password);
    const passwordList: Password[] = await passwordRepository.find({
      where: { user_id: userId },
    });

    if (passwordList.length == 0) {
      return false;
    }

    return passwordList;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { message: "Internal server error", error };
  }
};

export const createPassword = async (
  userId: number,
  title: string,
  password: string
) => {
  try {
    const passwordRepository = AppDataSource.getRepository(Password);
    const hashedPassword = await hash(password, 10);

    const newPassword = new Password();
    newPassword.title = title;
    newPassword.encrypted_password = hashedPassword;
    newPassword.user_id = userId;

    if (newPassword == null) {
      console.log("newPassword is null");
      return false;
    }

    const response = await passwordRepository.save(newPassword);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Internal server error", error };
  }
};

export const deletePassword = async (passwordId: number) => {
  try {
    const passwordRepository = AppDataSource.getRepository(Password);
    await passwordRepository.delete(passwordId);
    return true;
  } catch (error) {
    console.error("Error deleting password:", error);
    return false;
  }
};

// export const updatePassword = async (
//   passwordId: number,
//   newPassword: string
// ) => {
//   try {
//     const passwordRepository = AppDataSource.getRepository(Password);
//     await passwordRepository.update(
//       Password,
//       { id: passwordId },
//       {
//         encrypted_password: newPassword,
//       }
//     );
//     return true;
//   } catch (error) {
//     console.error("Error updating password:", error);
//     return false;
//   }
// };

export const updatePassword = async (
  passwordId: number,
  newPassword: string
) => {
  try {
    const passwordRepository = AppDataSource.getRepository(Password);
    const passwordToUpdate: any = await passwordRepository.findOneBy({
      id: passwordId,
    });
    passwordToUpdate.encrypted_password = newPassword;
    await passwordRepository.save(passwordToUpdate);

    return true;
  } catch (error) {
    console.error("Error updating password:", error);
    return false;
  }
};
