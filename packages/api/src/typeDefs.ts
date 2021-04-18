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
import { writeFileSync, readFileSync } from "fs";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { DocumentNode, print } from "graphql";
import { gql } from "apollo-server-core";

let typeDefs: DocumentNode;

const dirname = process.env.PROJECT_ROOT;

console.log({ dirname });

if (process.env.NODE_ENV === "development") {
  const typesArray = loadFilesSync(
    join(dirname, "/packages/api/src/modules/**/*.gql")
  );

  typeDefs = mergeTypeDefs(typesArray);

  console.log({
    projectRoot: dirname,
    dirname: __dirname,
    typesArray,
    typeDefs,
  });

  // Save Type Defs for the "client-gql" package

  const printedTypeDefs = print(typeDefs);

  writeFileSync(join(dirname, "/packages/api/schema.gql"), printedTypeDefs);
} else {
  const str = readFileSync(
    join(dirname, "/packages/api/schema.gql")
  ).toString();

  typeDefs = gql(str);
}

export default typeDefs;
