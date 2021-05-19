export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://oasis.sh'
    : process.env.STAGING_MODE === 'true'
    ? 'http://dev.oasis.sh'
    : 'http://localhost:3000';
