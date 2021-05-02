import "reflect-metadata";
import { getSchema } from "./utils/getSchema";

getSchema().then(() => process.exit());
