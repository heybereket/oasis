import { ContextType } from '@root/server';
import { ApolloError } from 'apollo-server-errors';
import { createMethodDecorator } from 'type-graphql';

export function SelfOnly() {
  return createMethodDecorator(async ({ root, context }, next) => {
    if (root.id !== (await (context as ContextType).getUser()).id) {
      throw new ApolloError(
        'You can only get this property on your user',
        'SELF_ONLY'
      );
    }
    return next();
  }) as PropertyDecorator;
}
