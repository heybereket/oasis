export const baseURL =
  Boolean(process.env.STAGING_API) === true ? 'https://dev.oasis.sh' : '';
export const gqlBaseURL = `${baseURL}/graphql`;
export const apiBaseURL = `${baseURL}/api`;
export const isProduction = process.env.NODE_ENV === 'production';
