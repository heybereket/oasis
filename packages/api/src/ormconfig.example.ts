// Copy this file into "ormconfig.ts" in this same directory
// You can change the TypeORM connection options here
// Below is an example with sqlite (postgres is used in production)
import { ConnectionOptions } from "typeorm";
import { join } from "path";

export const ormconfig: ConnectionOptions = {
  type: "sqlite",
  database: "<path-to-sqlite-file>",
  synchronize: true,
  entities: [join(__dirname, "./entities/*.*")],
};

export default ormconfig;
