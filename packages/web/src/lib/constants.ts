export const baseURL =
  process.env.DEV_MODE === 'local'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'https://dev.oasis.sh';
export const apiBaseURL = `${baseURL}/graphql`;
export const undefinedWindow = typeof window === 'undefined';
