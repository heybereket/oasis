import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const request = async (
  url: RequestInfo,
  options?: RequestInit
): Promise<any> => await fetch(url, options);
