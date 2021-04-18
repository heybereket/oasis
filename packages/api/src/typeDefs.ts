import { mergeTypeDefs } from "@graphql-tools/merge";
import { writeFileSync } from "fs";
import { print } from "graphql";

import repo from "./modules/repo/typeDefs";
import user from "./modules/user/typeDefs";

const typeDefsArray = [repo, user];

const typeDefs = mergeTypeDefs(typeDefsArray);
export default typeDefs;

if (process.env.NODE_ENV === "development") {
  writeFileSync("../schema.gql", print(typeDefs));
}
