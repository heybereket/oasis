import { join } from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { writeFileSync } from "fs";
import { print } from "graphql";

const dirname = process.env.PROJECT_ROOT;
const typeDefsArray = loadFilesSync(
  join(dirname, "/packages/api/dist/modules/**/typeDefs.js")
);

const typeDefs = mergeTypeDefs(typeDefsArray);
export default typeDefs;

if (process.env.NODE_ENV === "development") {
  writeFileSync("../schema.gql", print(typeDefs));
}
