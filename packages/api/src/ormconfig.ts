import { ConnectionOptions } from "typeorm";
import { importAll } from "./globs/importAll";
import { rootPath } from "./utils/rootPath";

export const isProd = process.env.NODE_ENV === "production";

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !isProd,
  entities: importAll("entities"),
};
