// General
export const nodeMajor = Number(process.versions.node.split('.')[0]);
export const PORT = Number(process.env.PORT) || 3000;

// Limits
export const complexityLimit = 50;
export const rateLimitTime = 60 * 60;

// Environment Variables
export const isProduction = process.env.NODE_ENV === 'production';
export const sessionSecret = process.env.SESSION_SECRET || 'oasis_session';
export const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

// Regex Patterns
export const usernameRegex = /^[a-zA-Z0-9_.-]{3,15}$/;
