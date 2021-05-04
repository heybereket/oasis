import { ConnectionOptions } from "typeorm";
import { join } from "path";

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, "./entities/*.*")],
};

export default ormconfig;

// import { ConnectionOptions } from "typeorm";
// import { join } from "path";

// export const ormconfig: ConnectionOptions = {
//   type: "sqlite",
//   database: "./db.sqlite",
//   synchronize: true,
//   entities: [join(__dirname, "./entities/*.*")],
// };
