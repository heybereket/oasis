import React, { useEffect } from 'react';

export const AuthSuccess: React.FC = () => {
  useEffect(() => {
    window.location.pathname =
      window.localStorage.getItem('redirectPath') ?? '/';
  }, []);
  return <div></div>;
};

export default AuthSuccess;
