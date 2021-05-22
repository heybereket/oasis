import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { localBaseURL } from '@lib/constants';

export const AuthSuccess: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    router.push(
      window.localStorage.getItem('redirectPath') ?? `${localBaseURL}/`
    );
  }, []);
  return <div></div>;
};

export default AuthSuccess;
