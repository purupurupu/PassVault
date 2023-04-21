import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["models/*{.ts,.js}"],
  migrations: ["migrations/*{.ts,.js}"],
  subscribers: ["subscribers/*{.ts,.js}"],
});
