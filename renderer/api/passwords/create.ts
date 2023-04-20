// api/passwords/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { User } from "../../models/User";
import { Password } from "../../models/Password";
import { encrypt } from "../../lib/encryption";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, title, password } = req.body;

    // Validate input
    if (!userId || !title || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userRepository = getRepository(User);
    const passwordRepository = getRepository(Password);

    const user = await userRepository.findOne({ id: userId });

    if (user) {
      const encryptedPassword = encrypt(password);
      const newPassword = new Password();
      newPassword.title = title;
      newPassword.encryptedPassword = encryptedPassword;
      newPassword.user = user;

      const savedPassword = await passwordRepository.save(newPassword);
      res.status(201).json(savedPassword);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
