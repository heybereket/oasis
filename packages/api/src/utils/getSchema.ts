import { buildSchema } from 'type-graphql';
import { join } from 'path';
import { joinRoot } from './rootPath';
import { customAuthChecker } from './auth/authChecker';

export const getSchema = () => {
  return buildSchema({
    resolvers: [joinRoot('./modules/**/*.resolver.js')],
    emitSchemaFile:
      process.env.NODE_ENV === 'development'
        ? join(process.env.OASIS_API_SRC_PATH ?? '', '../schema.gql')
        : false,
    authChecker: customAuthChecker,
  });
};
