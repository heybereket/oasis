import "reflect-metadata";
import { buildGlobs } from "./globs/build";
import { getSchema } from "./utils/getSchema";

(async () => {
  await buildGlobs();
  await getSchema();
})();
