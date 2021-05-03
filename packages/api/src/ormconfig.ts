import { ConnectionOptions } from "typeorm";
import { join } from "path";

export const isProd = process.env.NODE_ENV === "production";

export const ormconfig: ConnectionOptions = {
  type: (process.env.DATABASE_TYPE as any) || "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !isProd,
  entities: [join(__dirname, "./entities/*.*")],
};

for (const key in process.env) {
  if (key.startsWith("DB_OPTION_")) {
    ormconfig[key.slice("DB_OPTION_".length).toLowerCase()] = process.env[key];
  }
}
