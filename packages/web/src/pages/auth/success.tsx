import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthSuccess: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    router.push(window.localStorage.getItem('redirectPath') ?? `/`);
  }, []);
  return <div></div>;
};

export default AuthSuccess;
