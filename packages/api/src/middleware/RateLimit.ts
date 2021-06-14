import { ContextType } from '@root/server';
import { redisClient } from '@config/redis';
import { promisify } from 'util';
import { MiddlewareFn } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { rateLimitTime } from '@lib/constants';

export const RateLimit: () => MiddlewareFn<ContextType> =
  (limitForAnonUser = 500, limitForUser = 500) =>
  async ({ context: { req, hasAuth, uid }, info }, next) => {
    const key = `rate-limit:${!hasAuth ? req.ip : uid}`;

    const old = Number.parseInt(
      await promisify(redisClient.get).bind(redisClient)(key)
    );

    const complexity =
      info.parentType.getFields()[info.fieldName].extensions.complexity ?? 1;

    const current = (!Number.isNaN(old) ? old : 0) + complexity;
    await promisify(redisClient.set).bind(redisClient)(key, current.toString());
    if (
      (!hasAuth && current > limitForAnonUser) ||
      (hasAuth && current > limitForUser)
    ) {
      throw new ApolloError(
        "You've made too many requests, try again in an hour",
        'RATE_LIMIT'
      );
    } else if (Number.isNaN(old)) {
      // Redis doesnt use promise based calls
      await promisify(redisClient.expire).bind(redisClient)(key, rateLimitTime);
    }

    return next();
  };
