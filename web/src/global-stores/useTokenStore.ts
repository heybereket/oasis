import create from 'zustand';
import { combine } from 'zustand/middleware';

const tokenKey = '@user/token';

const getDefaultValues = () => {
  try {
    const v = localStorage.getItem(tokenKey);
    return {
      token: v || '',
    };
  } catch {
    return {
      token: '',
    };
  }
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setData: (x: { token: string }) => {
      try {
        localStorage.setItem(tokenKey, x.token);
      } catch {}

      set(x);
    },
  }))
);

// to see a example of how to use this check ../test/store.example.ts
