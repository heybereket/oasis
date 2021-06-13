import { ContextType } from '@root/server';
import { ApolloError } from 'apollo-server-errors';
import { createMethodDecorator } from 'type-graphql';

export const NoBot = () =>
  createMethodDecorator<ContextType>(async ({ context }, next) => {
    const user = await context.getUser();

    if (user !== undefined) {
      if (user.isBot) {
        throw new ApolloError('This operation cannot be performed by a bot');
      }
    }

    return next();
  });
