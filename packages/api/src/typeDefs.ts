import { mergeTypeDefs } from "@graphql-tools/merge";
import { writeFileSync } from "fs";
import { print } from "graphql";

import repo from "./modules/repo/typeDefs";
import user from "./modules/user/typeDefs";
import posts from "./modules/posts/typeDefs";
import comments from "./modules/comments/typeDefs";

const typeDefsArray = [repo, user, posts, comments];

const typeDefs = mergeTypeDefs(typeDefsArray);
export default typeDefs;

if (process.env.NODE_ENV === "development") {
  writeFileSync("../schema.gql", print(typeDefs));
}
