import "reflect-metadata";
import { join, dirname } from "path";
import { config } from "dotenv";
import { getSchema } from "./utils/getSchema";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

// The emitSchemaFile option inside that file will generate the schema for us
getSchema().then(() => process.exit());
