import { buildSchema } from 'type-graphql';
import { importAll } from '../globs/importAll';

let schema: ReturnType<typeof buildSchema>;

export const getSchema = async () => {
  if (!schema)
    schema = buildSchema({
      resolvers: (await importAll('resolvers')) as any,
      authChecker: ({ context }) => context.hasAuth,
      emitSchemaFile:
        process.env.NODE_ENV === 'development' ? '../api/schema.gql' : false,
    });

  return schema;
};
