const path = require("path");

module.exports = {
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["renderer/models/*{.ts,.js}"],
  migrations: ["renderer/migrations/*{.ts,.js}"],
  subscribers: ["renderer/subscribers/*{.ts,.js}"],
  cli: {
    entitiesDir: "renderer/models",
    migrationsDir: "renderer/migrations",
    subscribersDir: "renderer/subscribers",
  },
};
