import { buildSchema } from "type-graphql";
import { join } from "path";

export const getSchema = () =>
  buildSchema({
    resolvers: [join(__dirname, "../modules/**/*.resolver.js")],
    emitSchemaFile: join(__dirname, "../../schema.gql"),
    authChecker: ({ context }) => context.hasAuth,
  });
