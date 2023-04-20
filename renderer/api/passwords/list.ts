import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Password } from "../../models/Password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const passwordRepository = getRepository(Password);

    const passwords = await passwordRepository.find();

    return res.status(200).json(passwords);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
