const fetch = require('node-fetch');
export const http = async (request: string): Promise<any> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}
