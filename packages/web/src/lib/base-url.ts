export default function getAPIBaseURL(): string {
  let baseUrl = '';

  process.env.SECURE_MODE ? (baseUrl += `https://`) : (baseUrl += `http://`);
  baseUrl += process.env.NEXT_PUBLIC_BASE_API_URL;
  baseUrl += '/api/graphql';

  return baseUrl;
}
