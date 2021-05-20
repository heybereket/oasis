export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const apiBaseURL = `${baseURL}/graphql`
export const undefinedWindow = typeof window === 'undefined';

export const linkRegex = /(^|\s)(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;
export const mentionRegex = /^(?!.*\bRT\b)(?:.+\s)?#?@\w+/i;
