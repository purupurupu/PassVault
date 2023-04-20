import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { User } from "../../models/User";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne(email);

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
