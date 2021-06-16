import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import Redis from 'ioredis';

export const redisStore = connectRedis(expressSession);
export const redisClient = new Redis(process.env.OASIS_API_REDIS_URL);
