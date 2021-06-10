import { createClient } from 'redis';

export const redisClient = createClient(process.env.OASIS_API_REDIS_URL);
