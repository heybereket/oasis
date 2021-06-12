// General
export const nodeMajor = Number(process.versions.node.split('.')[0]);
export const PORT = Number(process.env.PORT) || 3000;

// Limits
export const complexityLimit = 50;
export const rateLimitTime = 60 * 60;

// Environment Variables
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV !== 'production';
export const sessionSecret = process.env.OASIS_API_SESSION_SECRET || 'oasis_session';

// Regex Patterns
export const usernameRegex = /^(?=.{2,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
