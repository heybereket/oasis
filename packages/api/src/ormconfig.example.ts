// Copy this file into "ormconfig.ts" in this same directory
// You can change the TypeORM connection options here
// Below is an example with sqlite (postgres is used in production)
import { ConnectionOptions } from "typeorm";
import { joinRoot } from "./utils/rootPath";

export const ormconfig: ConnectionOptions = {
  type: "sqlite",
  database: "<path-to-sqlite-file>",
  synchronize: true,
  entities: [joinRoot("./entities/*.*")],
};

export default ormconfig;
