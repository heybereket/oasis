import { buildSchema } from "type-graphql";
import { getResolvers } from "../resolvers";

let schema: ReturnType<typeof buildSchema>;

export const getSchema = async () => {
  if (!schema)
    schema = buildSchema({
      resolvers: (await getResolvers()) as any,
      emitSchemaFile:
        process.env.NODE_ENV === "development" ? "../api/schema.gql" : false,
    });

  return schema;
};
