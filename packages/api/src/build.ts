import { buildSchema } from "./buildSchema";
import { buildGlobs } from "./globs/build";

(async () => {
  await buildGlobs();
  await buildSchema();
})();
