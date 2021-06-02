import { baseURL } from '../lib/constants';

export const redirect = (url: string) => {
  return (window.location.href = `${baseURL}/${url}`);
};
