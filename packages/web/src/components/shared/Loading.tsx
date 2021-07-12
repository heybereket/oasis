import React from 'react';

interface LoadingProps {
  message: string;
}

export const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <>
      <h1>{message}</h1>
    </>
  );
};
