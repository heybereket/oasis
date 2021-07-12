import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const request = (url: RequestInfo, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());
