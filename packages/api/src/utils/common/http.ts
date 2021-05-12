import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const http = async (url: RequestInfo, options?: RequestInit) => {
  return await fetch(url, options).then((res) => res.json());
}
