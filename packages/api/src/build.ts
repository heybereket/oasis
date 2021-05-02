import "reflect-metadata";
import { getSchema } from "./utils/getSchema";

console.log("SS");

getSchema().then(() => process.exit());
