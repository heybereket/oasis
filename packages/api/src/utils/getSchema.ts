import { buildSchema } from 'type-graphql';
import { joinRoot } from './common/rootPath';
import { customAuthChecker } from '@utils/auth/authChecker';

console.log(joinRoot('./RelationalPaginationQueries.js'));

export const getSchema = () => {
  return buildSchema({
    resolvers: [
      joinRoot('./modules/**/*.resolver.js'),
      // Very important that this is loaded last
      joinRoot('./RelationalPaginationQueries/*.js'),
    ],
    emitSchemaFile: joinRoot('../schema.gql'),
    authChecker: customAuthChecker,
  });
};
