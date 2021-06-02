export const baseURL = process.env.API_MODE === 'remote' ? 'https://dev.oasis.sh' : '';
export const gqlBaseURL = `${baseURL}/graphql`;
export const apiBaseURL = `${baseURL}/api`;
export const isProduction = process.env.NODE_ENV === 'production';
