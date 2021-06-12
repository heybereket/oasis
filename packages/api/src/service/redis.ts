import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import { createClient } from 'redis';

export const redisStore = connectRedis(expressSession);
export const redisClient = createClient(process.env.OASIS_API_REDIS_URL);
