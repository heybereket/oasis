import { buildSchema } from 'type-graphql';
import { joinRoot } from './common/rootPath';
import { customAuthChecker } from '@utils/auth/authChecker';

export const getSchema = () => {
  return buildSchema({
    resolvers: [joinRoot('./modules/**/*.resolver.js')],
    emitSchemaFile:
      process.env.NODE_ENV === 'development' && joinRoot('../schema.gql'),
    authChecker: customAuthChecker,
  });
};
