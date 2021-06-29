import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import Redis from 'ioredis';
import { redisURL } from '@lib/constants';

export const redisStore = connectRedis(expressSession);
export const redisClient = new Redis(redisURL);
