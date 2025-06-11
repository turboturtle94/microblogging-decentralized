// data-source.ts
import "reflect-metadata";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import ENTITIES from "./entities";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ENTITIES,
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});
