import type { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { User } from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Replace the following line with the actual authentication logic
    const user = await getRepository(User).findOne({ email });

    if (user) {
      // Verify the password and generate an authentication token
      // Send the token to the client
      res.status(200).json({ token: "your_authentication_token" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
