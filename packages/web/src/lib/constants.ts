export const gqlBaseURL = `/graphql`;
export const apiBaseURL = `/api`;
export const isProduction = process.env.NODE_ENV === 'production';
export const mentionRegex = /^(?!.*\bRT\b)(?:.+\s)?#?@\w+/i;
