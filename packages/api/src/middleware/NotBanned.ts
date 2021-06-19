import { MiddlewareFn } from 'type-graphql';
import { ContextType } from '@root/server';
import User from '@entities/User';
import { ApolloError } from 'apollo-server-errors';

export function NotBanned(force: boolean): MiddlewareFn {
  return async ({ context, info }, next) => {
    const user: User = await (context as ContextType).getUser();

    const operationDescription =
      info.parentType.getFields()[info.fieldName].description;

    if (
      (info.operation.operation === 'mutation' &&
        !(operationDescription ?? '').includes('[NO-BAN]')) ||
      force
    ) {
      if (Number.parseInt(user.banExiration ?? '0') > Date.now()) {
        throw new ApolloError('Sorry, you are banned', 'BANNED_USER');
      }
    }

    return next();
  };
}
