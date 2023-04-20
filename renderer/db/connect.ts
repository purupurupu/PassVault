import { createConnection } from "typeorm";
import { User } from "../models/User";
import { Password } from "../models/Password";

export const connectToDatabase = async () => {
  return await createConnection({
    type: "sqlite",
    database: "password-app.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Password],
  });
};
