import "reflect-metadata";
import { buildGlobs } from "./globs/build";
import { getSchema } from "./utils/getSchema";

console.log("SS");

getSchema().then(() => process.exit());
