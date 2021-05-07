import { graphql, GraphQLSchema, GraphQLArgs } from 'graphql';
import { getSchema } from '../utils/getSchema';

let schema: GraphQLSchema;

export const graphqlCall = async (options: Omit<GraphQLArgs, 'schema'>) =>
  graphql({
    schema: schema || (schema = await getSchema()),
    ...options,
  });
