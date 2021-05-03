import { ConnectionOptions } from "typeorm";
import { join } from "path";

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  url: "postgres://postgres:postgres@localhost:5432/oasis",
  synchronize: true,
  entities: [join(__dirname, "./entities/*.*")],
};
