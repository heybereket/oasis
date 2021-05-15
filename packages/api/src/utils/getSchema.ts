import { buildSchema } from 'type-graphql';
import { joinRoot } from './common/rootPath';
import { customAuthChecker } from '@utils/auth/authChecker';

export const getSchema = () => {
  return buildSchema({
    resolvers: [joinRoot('./modules/**/*.resolver.js')],
    emitSchemaFile: joinRoot('../schema.gql'),
    authChecker: customAuthChecker,
  });
};
