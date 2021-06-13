export const nodeMajor = Number(process.versions.node.split('.')[0]);
export const sessionSecret = process.env.OASIS_API_SESSION_SECRET || 'oasis_session';
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV !== 'production';
export const PORT = Number(process.env.PORT) || 3000;
export const complexityLimit = 50;
export const usernameRegex = /^(?=.{2,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
