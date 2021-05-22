export const baseURL =
  process.env.DEV_MODE === 'local'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'https://dev.oasis.sh';

export const localBaseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const gqlBaseURL = `${baseURL}/graphql`;
export const apiBaseURL = `${baseURL}/api`;

export const linkRegex =
  /(^|\s)(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;
export const mentionRegex = /^(?!.*\bRT\b)(?:.+\s)?#?@\w+/i;

export const undefinedWindow = typeof window === 'undefined';
