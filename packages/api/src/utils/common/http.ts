import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const http = (url: RequestInfo, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());
