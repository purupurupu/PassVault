import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Password } from "./models/Password";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  // entities: ["models/*{.ts,.js}"],
  entities: [User, Password],
  migrations: ["migrations/*{.ts,.js}"],
  subscribers: ["subscribers/*{.ts,.js}"],
});
