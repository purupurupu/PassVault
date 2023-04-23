import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Password } from "../../models/Password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, title, encryptedPassword } = req.body;

  if (!id || !title || !encryptedPassword) {
    return res
      .status(400)
      .json({ message: "ID, title, and encrypted password are required" });
  }

  try {
    const passwordRepository = getRepository(Password);

    const password = await passwordRepository.findOne(id);

    if (!password) {
      return res.status(404).json({ message: "Password not found" });
    }

    password.title = title;
    password.encrypted_password = encryptedPassword;

    await passwordRepository.save(password);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
