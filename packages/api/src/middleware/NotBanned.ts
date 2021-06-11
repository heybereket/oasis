import { MiddlewareFn } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import User from '@entities/User';

export function NotBanned(force: boolean): MiddlewareFn {
  return async ({ context, info }, next) => {
    const user: User = await (context as ContextType).getUser();
    if (info.operation.operation === 'mutation' || force) {
      if (Number.parseInt(user.banExiration ?? '0') > Date.now()) {
        throw new Error('Sorry, you are banned');
      }
    }

    return next();
  };
}
