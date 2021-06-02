import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const http = (url: RequestInfo, options?: RequestInit): any =>
  fetch(url, options);
