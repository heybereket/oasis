import { buildSchema } from 'type-graphql';
import { joinRoot } from './common/rootPath';
import { customAuthChecker } from '@utils/auth/authChecker';
import { isProduction } from '@lib/constants'

export const getSchema = () => {
  return buildSchema({
    resolvers: [joinRoot('./modules/**/*.resolver.js')],
    emitSchemaFile: isProduction && joinRoot('../schema.gql'),
    authChecker: customAuthChecker,
  });
};
