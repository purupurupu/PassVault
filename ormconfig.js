const path = require("path");

module.exports = {
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "renderer/models/*{.ts,.js}")],
  migrations: [path.join(__dirname, "renderer/migrations/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "renderer/subscribers/*{.ts,.js}")],
  cli: {
    entitiesDir: "renderer/models",
    migrationsDir: "renderer/migrations",
    subscribersDir: "renderer/subscribers",
  },
};
