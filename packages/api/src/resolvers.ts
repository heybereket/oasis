import { join } from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const dirname = process.env.PROJECT_ROOT;
const resolversArray = loadFilesSync(
  join(dirname, "/packages/api/dist/modules"),
  {
    extensions: ["js"],
  }
);

export default mergeResolvers(resolversArray);
