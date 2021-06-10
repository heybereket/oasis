export const sessionSecret = process.env.OASIS_API_SESSION_SECRET || 'oasis_session_secret';
export const isProduction = process.env.NODE_ENV === 'production';
export const PORT = Number(process.env.PORT) || 3000;
