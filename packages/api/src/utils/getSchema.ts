import { buildSchema } from "type-graphql";
import { join } from "path";

export const getSchema = () => {
  return buildSchema({
    resolvers: [
      join(process.env.NEXT_SRC_PATH ?? "", "../dist/modules/**/*.resolver.js"),
    ],
    emitSchemaFile:
      process.env.NODE_ENV === "development"
        ? join(process.env.NEXT_SRC_PATH ?? "", "../schema.gql")
        : false,
    authChecker: ({ context }) => context.hasAuth,
  });
};
