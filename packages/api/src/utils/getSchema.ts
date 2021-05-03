import { buildSchema } from "type-graphql";
import { join } from "path";
import { importAll } from "../globs/importAll";
import { rootPath } from "./rootPath";

export const getSchema = () => {
  return buildSchema({
    resolvers: importAll("resolvers") as any,
    emitSchemaFile: join(rootPath, "./schema.gql"),
    authChecker: ({ context }) => context.hasAuth,
  });
};
