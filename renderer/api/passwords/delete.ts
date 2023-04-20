import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Password } from "../../models/Password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const id = req.query;

  try {
    const passwordRepository = getRepository(Password);

    const password = await passwordRepository.findOneOrFail(id);

    if (!password) {
      return res.status(404).json({ message: "Password not found" });
    }

    await passwordRepository.remove(password);

    return res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    console.error("Error deleting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
