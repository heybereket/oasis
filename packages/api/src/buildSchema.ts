import "reflect-metadata";
import { join, dirname } from "path";
import { config } from "dotenv";
import { getSchema } from "./utils/getSchema";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

export const buildSchema = () => getSchema();

if (require.main === module) {
  buildSchema();
}
