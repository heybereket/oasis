// @todo Handle these types, make a directory for them and add resolvers

// type ActivityEvent {
//   id: ID!
//   type: String!
//   eventString: String!
//   user: User
//   repo: Repo
// }

// type Comment {
//   id: ID!
//   author: User!
//   content: String!
//   likes: Int!
//   dislikes: Int!
// }

// type Post {
//   id: ID!
//   title: String!
//   content: String!
//   media: [String]
//   tags: [String]
//   comments: [Comment]
// }

import { join } from "path";
import { writeFileSync } from "fs";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";

const dirname = process.env.PROJECT_ROOT;

console.log(dirname);
const typesArray = loadFilesSync(
  join(dirname, "/packages/api/src/modules/**/*.gql")
);

const typeDefs = mergeTypeDefs(typesArray);
export default typeDefs;

// Save Type Defs for the "client-gql" package

if (process.env.NODE_ENV === "development") {
  const printedTypeDefs = print(typeDefs);

  writeFileSync(
    join(dirname, "/packages/client-gql/schema.gql"),
    printedTypeDefs
  );
}
