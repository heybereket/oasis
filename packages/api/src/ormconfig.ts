import { ConnectionOptions } from "typeorm";
import { join } from "path";

export const isProd = process.env.NODE_ENV === "production";

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !isProd,
  entities: [join(__dirname, "./entities/*.*")],
};
